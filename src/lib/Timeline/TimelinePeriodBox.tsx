import type { ProcessedTimelineData } from '../index.d';

interface ITimelinePeriodBox {
  item: ProcessedTimelineData;
  isActive: boolean;
  getFormattedDateString: (value: string) => string;
  accentColor: string | undefined;
}

export const TimelinePeriodBox = ({ item, isActive, getFormattedDateString, accentColor }: ITimelinePeriodBox) => {
  const { startPeriod, endPeriod, title, subtitle, content, startRowGrid, column, endRowGrid } = item;

  const boxShadow = isActive
    ? `var(--timeline-box-shadow), inset 1px 2px 0 0 ${accentColor}, inset -1px -2px 0 0 ${accentColor}`
    : `var(--timeline-box-shadow), inset 0 2px 0 0 ${accentColor}, inset 0 -2px 0 0 ${accentColor}`;

  return (
    <div
      className={`timeline-periods-content__period ${isActive ? 'active' : ''}`}
      style={{
        gridArea: `${startRowGrid} / ${column} / ${endRowGrid}`,
        boxShadow,
      }}
    >
      <div className="timeline-sticky-content">
        <div className="timeline-sticky-content__date">
          {getFormattedDateString(startPeriod)} – {getFormattedDateString(endPeriod)}
        </div>
        <div className="timeline-sticky-content__title">{title}</div>
        {subtitle && <div className="timeline-sticky-content__subtitle">{subtitle}</div>}
        <p className="timeline-sticky-content__text">
          {content &&
            content.map((text, index) => (
              <span key={index} className="timeline-sticky-content__text-item">
                {text}
              </span>
            ))}
        </p>
      </div>
    </div>
  );
};
