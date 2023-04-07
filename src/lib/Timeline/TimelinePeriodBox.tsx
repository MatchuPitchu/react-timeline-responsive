import classes from './Timeline.module.css';
import type { TimelineData } from '../index.d';

interface ITimelinePeriodBox {
  item: Required<TimelineData>;
  isActive: boolean;
  getFormattedDateString: (value: string) => string;
  accentColor: string | undefined;
}

export const TimelinePeriodBox = ({ item, isActive, getFormattedDateString, accentColor }: ITimelinePeriodBox) => {
  const boxShadow = isActive
    ? `var(--timeline-box-shadow), inset 1px 2px 0 0 ${accentColor}, inset -1px -2px 0 0 ${accentColor}`
    : `var(--timeline-box-shadow), inset 0 2px 0 0 ${accentColor}, inset 0 -2px 0 0 ${accentColor}`;

  return (
    <div
      key={item.title}
      className={`${classes['periods-content__period']} ${isActive ? `${classes.active}` : ''}`}
      style={{
        gridArea: `${item.startRowGrid} / ${item.column} / ${item.endRowGrid}`,
        boxShadow,
      }}
    >
      <div className={classes['sticky-content']}>
        <div className={classes['sticky-content__date']}>
          {getFormattedDateString(item.startPeriod)} – {getFormattedDateString(item.endPeriod)}
        </div>
        {item.title && <div className={classes['sticky-content__title']}>{item.title}</div>}
        {item.organization && <div className={classes['sticky-content__organization']}>{item.organization}</div>}
        <p className={classes['sticky-content__text']}>
          {item.content.map((contentItem, index) => (
            <span key={index} className={classes['sticky-content__text-item']}>
              {contentItem}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
};
