import { renderHook } from '@testing-library/react';

import { useTimeline } from './useTimeline';

describe('useTimeline', () => {
  const language = 'en-US';

  it('should return timeline in ascending order when "asc" is set', () => {
    const timelineData = [
      {
        startPeriod: '2023-01',
        endPeriod: '2023-03',
        title: 'Project A',
      },
      {
        startPeriod: '2023-02',
        endPeriod: '2023-04',
        title: 'Project B',
      },
    ];

    const { result } = renderHook(() => useTimeline(timelineData, language, 'asc'));

    const expectedTimeline = [
      { year: 2023, month: '01' },
      { year: 2023, month: '02' },
      { year: 2023, month: '03' },
      { year: 2023, month: '04' },
      { year: 2023, month: '05' },
      { year: 2023, month: '06' },
      { year: 2023, month: '07' },
      { year: 2023, month: '08' },
      { year: 2023, month: '09' },
      { year: 2023, month: '10' },
      { year: 2023, month: '11' },
      { year: 2023, month: '12' },
    ];

    expect(result.current.timeline).toEqual(expectedTimeline);
  });

  it('should return timeline in descending order when "desc" is set', () => {
    const timelineData = [
      {
        startPeriod: '2023-01',
        endPeriod: '2023-03',
        title: 'Item 1',
      },
    ];

    const { result } = renderHook(() => useTimeline(timelineData, 'en-US', 'desc'));

    const expectedTimeline = [
      { year: 2023, month: '12' },
      { year: 2023, month: '11' },
      { year: 2023, month: '10' },
      { year: 2023, month: '09' },
      { year: 2023, month: '08' },
      { year: 2023, month: '07' },
      { year: 2023, month: '06' },
      { year: 2023, month: '05' },
      { year: 2023, month: '04' },
      { year: 2023, month: '03' },
      { year: 2023, month: '02' },
      { year: 2023, month: '01' },
    ];

    expect(result.current.timeline).toEqual(expectedTimeline);
  });

  it('returns correctly processed data', () => {
    const timelineData = [
      {
        startPeriod: '2022-01',
        endPeriod: '2022-03',
        title: 'Test Timeline Item',
      },
    ];

    const { result } = renderHook(() => useTimeline(timelineData, language, 'asc'));
    const { processedData } = result.current;

    expect(processedData).toEqual([
      {
        startPeriod: '2022-01',
        endPeriod: '2022-03',
        title: 'Test Timeline Item',
        column: 1,
        duration: 3,
        startRowGrid: 1,
        endRowGrid: 4,
        group: 1,
      },
    ]);
  });

  it('should return a function helper to format correctly the date string of the period text box', () => {
    const timelineData = [
      {
        startPeriod: '2022-01',
        endPeriod: '2022-03',
        title: 'Test Timeline Item',
      },
    ];

    const { result } = renderHook(() => useTimeline(timelineData, language, 'asc'));
    const { getFormattedDateString } = result.current;

    expect(getFormattedDateString(timelineData[0].startPeriod)).toEqual('Jan 2022');
  });

  it('should return a function helper that returns "heute" if an empty date string is passed in', () => {
    const timelineData = [
      {
        startPeriod: '2022-01',
        endPeriod: '',
        title: 'Test Timeline Item',
      },
    ];

    const { result } = renderHook(() => useTimeline(timelineData, language, 'asc'));
    const { getFormattedDateString } = result.current;

    expect(getFormattedDateString(timelineData[0].endPeriod)).toEqual('heute');
  });

  it('should calculate 2 different columns if timeline data has items with an overlapping startPeriod and endPeriod', () => {
    const timelineData = [
      {
        startPeriod: '2021-02',
        endPeriod: '2022-06',
        title: 'Timeline Item 1',
      },
      {
        startPeriod: '2022-03',
        endPeriod: '2023-02',
        title: 'Timeline Item 2',
      },
    ];

    const { result } = renderHook(() => useTimeline(timelineData, language, 'asc'));

    const expectedProcessedData = [
      {
        ...timelineData[0],
        duration: 17,
        column: 1,
        startRowGrid: 2,
        endRowGrid: 19,
        group: 1,
      },
      {
        ...timelineData[1],
        duration: 12,
        column: 2,
        startRowGrid: 15,
        endRowGrid: 27,
        group: 1,
      },
    ];

    expect(result.current.processedData).toEqual(expectedProcessedData);
  });

  it('should calculate 3 different columns if timeline data has items with an overlapping startPeriod and endPeriod', () => {
    const timelineData = [
      {
        startPeriod: '2022-02',
        endPeriod: '2022-06',
        title: 'Timeline Item 1',
      },
      {
        startPeriod: '2022-03',
        endPeriod: '2022-07',
        title: 'Timeline Item 2',
      },
      {
        startPeriod: '2022-04',
        endPeriod: '2022-08',
        title: 'Timeline Item 3',
      },
    ];

    const { result } = renderHook(() => useTimeline(timelineData, language, 'asc'));

    const expectedProcessedData = [
      {
        ...timelineData[0],
        duration: 5,
        column: 1,
        startRowGrid: 2,
        endRowGrid: 7,
        group: 1,
      },
      {
        ...timelineData[1],
        duration: 5,
        column: 2,
        startRowGrid: 3,
        endRowGrid: 8,
        group: 1,
      },
      {
        ...timelineData[2],
        duration: 5,
        column: 3,
        startRowGrid: 4,
        endRowGrid: 9,
        group: 1,
      },
    ];

    expect(result.current.processedData).toEqual(expectedProcessedData);
  });

  it('should return years based on the timeline data in ascending order when "asc" is set', () => {
    const timelineData = [
      {
        startPeriod: '2020-01',
        endPeriod: '2022-06',
        title: 'Project 1',
      },
      {
        startPeriod: '2021-04',
        endPeriod: '2023-09',
        title: 'Project 2',
      },
    ];

    const { result } = renderHook(() => useTimeline(timelineData, language, 'asc'));

    expect(result.current.years).toEqual([2020, 2021, 2022, 2023]);
  });

  it('should return years based on the timeline data in descending order when "desc" is set', () => {
    const timelineData = [
      {
        startPeriod: '2020-01',
        endPeriod: '2022-06',
        title: 'Project 1',
      },
      {
        startPeriod: '2021-04',
        endPeriod: '2022-09',
        title: 'Project 2',
      },
    ];

    const { result } = renderHook(() => useTimeline(timelineData, language, 'desc'));

    expect(result.current.years).toEqual([2022, 2021, 2020]);
  });
});
