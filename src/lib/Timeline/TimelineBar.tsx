import type { ProcessedTimelineData } from '../index.d';

interface ITimelineBar {
  item: ProcessedTimelineData;
  index: number;
  isActive: boolean;
  onBarUpdate: (index?: number) => void;
  accentColor: string | undefined;
}

export const TimelineBar = ({ item, index, isActive, onBarUpdate, accentColor }: ITimelineBar) => {
  const backgroundColor = isActive ? accentColor : undefined;

  return (
    <div
      className="timeline-periods__bar"
      style={{
        gridArea: `${item.startRowGrid} / ${item.column} / ${item.endRowGrid}`,
        backgroundColor,
      }}
      onMouseEnter={(_) => onBarUpdate(index)}
      onMouseLeave={(_) => onBarUpdate()}
      onClick={(_) => onBarUpdate(index)} // for mobile use
    />
  );
};
