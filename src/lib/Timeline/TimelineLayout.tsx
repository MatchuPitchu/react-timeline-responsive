import type { ReactNode } from 'react';

interface ITimelineLayout {
  timeline: { year: number; month: string }[];
  years: number[];
  children: ReactNode;
}

export const TimelineLayout = ({ timeline, years, children }: ITimelineLayout) => {
  const { length: numberOfYears } = years;

  return (
    <div className='timeline'>
      <div className='timeline-years' style={{ gridTemplateRows: `repeat(${numberOfYears}, 1fr)` }}>
        {years.map((year) => (
          <div key={year} className='timeline-years__year'>
            {year}
          </div>
        ))}
      </div>
      <div className='timeline-months' style={{ gridTemplateRows: `repeat(${timeline.length}, 1fr)` }}>
        {timeline.map(({ year, month }) => (
          <div key={`${year}-${month}`} className='timeline-months__month'>
            {month}
          </div>
        ))}
      </div>
      {children}
    </div>
  );
};
