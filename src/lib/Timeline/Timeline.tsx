import { memo, useEffect } from 'react';
import { useColorMap } from '../hooks/useColorMap';
import { useTimeline } from '../hooks/useTimeline';
import { TimelineContent } from './TimelineContent';
import { TimelineLayout } from './TimelineLayout';
import { hexToHsl, setCSSVariable } from './timeline.utils';
import type { Order, LocalesArgument, Theme, TimelineData } from '../index.d';
import './styles.css';

interface ITimeline {
  timelineData: TimelineData[];
  language: LocalesArgument;
  order: Order;
  theme: Theme;
  stickyMarginTopDesktop?: number;
  stickyMarginTopMobile?: number;
}

const TimelinePure = ({
  timelineData,
  language,
  order,
  theme: {
    colorAccentPrimary,
    colorAccentSecondary,
    colorAccentTertiary,
    colorText,
    colorBackground,
    colorBarHex,
    colorGradation = 4
  },
  stickyMarginTopDesktop = 60,
  stickyMarginTopMobile = 15
}: ITimeline) => {
  const { timeline, processedData, years, getFormattedDateString } = useTimeline(timelineData, language, order);
  const colorMap = useColorMap(processedData, [colorAccentPrimary, colorAccentSecondary, colorAccentTertiary]);

  useEffect(() => {
    setCSSVariable('--timeline-color-accent-primary', colorAccentPrimary);
    setCSSVariable('--timeline-color-text', colorText);
    setCSSVariable('--timeline-color-bg-items', colorBackground);
    setCSSVariable('--timeline-color-bar-increment', `${colorGradation}%`);
    setCSSVariable('--timeline-sticky-marging-top', `${stickyMarginTopDesktop}px`);
    setCSSVariable('--timeline-sticky-marging-top--mobile', `${stickyMarginTopMobile}px`);
  }, [colorAccentPrimary, colorText, colorBackground, colorGradation, stickyMarginTopDesktop, stickyMarginTopMobile]);

  useEffect(() => {
    const { hue, saturation, lightness } = hexToHsl(colorBarHex);
    setCSSVariable('--timeline-color-bar-hue', hue);
    setCSSVariable('--timeline-color-bar-saturation', saturation);
    setCSSVariable('--timeline-color-bar-lightness', lightness);
  }, [colorBarHex]);

  return (
    <TimelineLayout timeline={timeline} years={years}>
      <TimelineContent
        timeline={timeline}
        transformedData={processedData}
        getFormattedDateString={getFormattedDateString}
        colorMap={colorMap}
      />
    </TimelineLayout>
  );
};

export const Timeline = memo(TimelinePure);
