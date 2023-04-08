import { useState } from 'react';
import { TimelineBar } from './TimelineBar';
import { TimelinePeriodBox } from './TimelinePeriodBox';
import type { Groups, ProcessedTimelineData } from '../index.d';

interface ITimelineContent {
  timeline: { year: number; month: string }[];
  transformedData: ProcessedTimelineData[];
  getFormattedDateString: (value: string) => string;
  colorMap: Map<Groups, string>;
}

export const TimelineContent = ({ timeline, transformedData, getFormattedDateString, colorMap }: ITimelineContent) => {
  const [activeBarIndex, setActiveBarIndex] = useState<number>(-1);

  const handleBarUpdate = (index?: number) => setActiveBarIndex(index ?? -1);

  return (
    <>
      <div className='timeline-periods' style={{ gridTemplateRows: `repeat(${timeline.length}, 1fr)` }}>
        {transformedData.map((item, index) => (
          <TimelineBar
            key={item.title}
            item={item}
            index={index}
            isActive={activeBarIndex === index}
            onBarUpdate={handleBarUpdate}
            accentColor={colorMap.get(item.group)}
          />
        ))}
      </div>
      <div className='timeline-periods-content' style={{ gridTemplateRows: `repeat(${timeline.length}, 1fr)` }}>
        {transformedData.map((item, index) => (
          <TimelinePeriodBox
            key={item.title}
            item={item}
            isActive={activeBarIndex === index}
            getFormattedDateString={getFormattedDateString}
            accentColor={colorMap.get(item.group)}
          />
        ))}
      </div>
    </>
  );
};
