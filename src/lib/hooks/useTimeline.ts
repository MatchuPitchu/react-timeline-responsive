import { useCallback, useMemo } from 'react';
import { generateArray, getSortedData, getTimelineBorders } from '../Timeline/timeline.utils';
import type { Order, LocalesArgument, ProcessedTimelineData, TimelineData } from '../index.d';

export const useTimeline = (timelineData: TimelineData[], language: LocalesArgument, order: Order) => {
  const sortedData = getSortedData(timelineData);

  const { minYear, maxYear } = getTimelineBorders(timelineData);
  const startDateTimeline = useMemo(() => new Date(minYear, 0), [minYear]);
  const endDateTimeline = useMemo(() => new Date(maxYear, 0), [maxYear]);

  const numberYearsInTimeline = endDateTimeline.getFullYear() - startDateTimeline.getFullYear() + 1;

  const months = useMemo(
    () =>
      generateArray(12, (_, index) => {
        const monthIndex = order === 'desc' ? 11 - index : index;
        return new Date(2000, monthIndex).toLocaleString('default', {
          month: '2-digit'
        });
      }),
    [order]
  );

  const years = useMemo(
    () =>
      generateArray(numberYearsInTimeline, (_, index) => {
        if (order === 'desc') {
          return startDateTimeline.getFullYear() + numberYearsInTimeline - 1 - index;
        }
        return startDateTimeline.getFullYear() + index;
      }),
    [order, numberYearsInTimeline, startDateTimeline]
  );

  const timeline = useMemo(() => years.flatMap((year) => months.map((month) => ({ year, month }))), [months, years]);

  const getNumberMonthsFromStart = useCallback(
    (dateString: string) => {
      const date = dateString ? new Date(dateString) : new Date();

      const monthDiff = date.getMonth() - startDateTimeline.getMonth();
      const yearDiff = date.getFullYear() - startDateTimeline.getFullYear();

      return monthDiff + yearDiff * 12;
    },
    [startDateTimeline]
  );

  const occupiedColumns = generateArray<number[]>(timeline.length, () => []);

  const processedData = useMemo(
    () =>
      sortedData.reduce((accumulator: ProcessedTimelineData[], currentItem: TimelineData) => {
        const { startPeriod, endPeriod } = currentItem;

        const startMonthIndex = getNumberMonthsFromStart(startPeriod);
        const endMonthIndex = getNumberMonthsFromStart(endPeriod);
        const duration = endMonthIndex - startMonthIndex + 1;

        let column = 1;
        let isColumnOccupied: boolean;

        do {
          isColumnOccupied = occupiedColumns
            .slice(startMonthIndex, endMonthIndex + 1)
            .some((currentRow) => currentRow.includes(column));

          if (isColumnOccupied) column++;
        } while (isColumnOccupied);

        const updatedOccupiedColumns = occupiedColumns
          .slice(startMonthIndex, endMonthIndex + 1)
          .map((value) => [...value, column]);

        occupiedColumns.splice(startMonthIndex, duration, ...updatedOccupiedColumns);

        const startRowGrid = order === 'desc' ? timeline.length - startMonthIndex + 1 : startMonthIndex + 1;
        const endRowGrid = order === 'desc' ? timeline.length - endMonthIndex : endMonthIndex + 2;

        const item: ProcessedTimelineData = {
          ...currentItem,
          column,
          duration,
          startRowGrid,
          endRowGrid,
          group: currentItem.group ?? 1
        };

        return [...accumulator, item];
      }, []),
    [sortedData, order, occupiedColumns, getNumberMonthsFromStart, timeline.length]
  );

  const getFormattedDateString = useCallback(
    (value: string) => {
      const text = new Date(value).toLocaleString(language, { month: 'short', year: 'numeric' });
      if (text === 'Invalid Date') {
        return 'heute';
      }
      return text;
    },
    [language]
  );

  return {
    timeline,
    processedData,
    years,
    getFormattedDateString
  };
};
