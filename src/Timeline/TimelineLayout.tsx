import classes from './Timeline.module.css';
import type { ReactNode } from 'react';

interface ITimelineLayout {
  timeline: { year: number; month: string }[];
  years: number[];
  children: ReactNode;
}

export const TimelineLayout = ({ timeline, years, children }: ITimelineLayout) => {
  const { length: numberOfYears } = years;

  return (
    <div className={classes.timeline}>
      <div className={classes.years} style={{ gridTemplateRows: `repeat(${numberOfYears}, 1fr)` }}>
        {years.map((year) => (
          <div key={year} className={classes.years__year}>
            {year}
          </div>
        ))}
      </div>
      <div className={classes.months} style={{ gridTemplateRows: `repeat(${timeline.length}, 1fr)` }}>
        {timeline.map(({ year, month }) => (
          <div key={`${year}-${month}`} className={classes.months__month}>
            {month}
          </div>
        ))}
      </div>
      {children}
    </div>
  );
};
