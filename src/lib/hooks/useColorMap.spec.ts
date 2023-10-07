import { renderHook } from '@testing-library/react';
import { useColorMap } from './useColorMap';
import type { AccentColors, ProcessedTimelineData } from '../index.d';

describe('useColorMap', () => {
  it('should return a map with colors for each group in the data if 1 color is passed in', () => {
    const numberOfGroups = 2;
    const data: ProcessedTimelineData[] = [
      {
        startPeriod: '2022-01',
        endPeriod: '2022-12',
        title: 'Event 1',
        group: 1,
        column: 1,
        duration: 12,
        // row grid data is false dummy in this test
        startRowGrid: 1,
        endRowGrid: 2
      },
      {
        startPeriod: '2021-02',
        endPeriod: '2022-03',
        title: 'Event 2',
        group: 2,
        column: 2,
        duration: 14,
        startRowGrid: 2,
        endRowGrid: 3
      }
    ];

    const colors: AccentColors = ['#d3a418', undefined, undefined];

    const { result } = renderHook(() => useColorMap(data, colors));

    expect(result.current.size).toBe(numberOfGroups);
    expect(result.current.get(1)).toBe('hsl(45, 79%, 46%)');
    expect(result.current.get(2)).toBe('hsl(45, 89%, 56%)');
  });

  it('should return a map with colors for each group in the data if 2 colors are passed in', () => {
    const numberOfGroups = 3;
    const data: ProcessedTimelineData[] = [
      {
        startPeriod: '2022-01',
        endPeriod: '2022-12',
        title: 'Event 1',
        group: 1,
        column: 1,
        duration: 12,
        // row grid data is false dummy in this test
        startRowGrid: 1,
        endRowGrid: 2
      },
      {
        startPeriod: '2021-02',
        endPeriod: '2022-03',
        title: 'Event 2',
        group: 2,
        column: 2,
        duration: 14,
        startRowGrid: 2,
        endRowGrid: 3
      },
      {
        startPeriod: '2021-02',
        endPeriod: '2022-03',
        title: 'Event 2',
        group: 3,
        column: 2,
        duration: 14,
        startRowGrid: 2,
        endRowGrid: 3
      }
    ];

    const colors: AccentColors = ['#d3a418', '#ff4f04', undefined];

    const { result } = renderHook(() => useColorMap(data, colors));

    expect(result.current.size).toBe(numberOfGroups);
    expect(result.current.get(1)).toBe('hsl(45, 79%, 46%)');
    expect(result.current.get(2)).toBe('hsl(18, 100%, 60%)');
    expect(result.current.get(3)).toBe('hsl(45, 99%, 66%)');
  });

  it('should return a map with colors for each group in the data if 3 colors are passed in', () => {
    const numberOfGroups = 3;
    const data: ProcessedTimelineData[] = [
      {
        startPeriod: '2022-01',
        endPeriod: '2022-12',
        title: 'Event 1',
        group: 1,
        column: 1,
        duration: 12,
        // row grid data is false dummy in this test
        startRowGrid: 1,
        endRowGrid: 2
      },
      {
        startPeriod: '2021-02',
        endPeriod: '2022-03',
        title: 'Event 2',
        group: 2,
        column: 2,
        duration: 14,
        startRowGrid: 2,
        endRowGrid: 3
      },
      {
        startPeriod: '2021-02',
        endPeriod: '2022-03',
        title: 'Event 2',
        group: 3,
        column: 2,
        duration: 14,
        startRowGrid: 2,
        endRowGrid: 3
      }
    ];

    const colors: AccentColors = ['#d3a418', '#ff4f04', '#3b7022'];

    const { result } = renderHook(() => useColorMap(data, colors));

    expect(result.current.size).toBe(numberOfGroups);
    expect(result.current.get(1)).toBe('hsl(45, 79%, 46%)');
    expect(result.current.get(2)).toBe('hsl(18, 100%, 60%)');
    expect(result.current.get(3)).toBe('hsl(101, 73%, 48%)');
  });

  it('should return a map with colors for 4 groups in the data if 3 colors are passed in', () => {
    const numberOfGroups = 4;
    const data: ProcessedTimelineData[] = [
      {
        startPeriod: '2022-01',
        endPeriod: '2022-12',
        title: 'Event 1',
        group: 1,
        column: 1,
        duration: 12,
        // row grid data is false dummy in this test
        startRowGrid: 1,
        endRowGrid: 2
      },
      {
        startPeriod: '2021-02',
        endPeriod: '2022-03',
        title: 'Event 2',
        group: 2,
        column: 2,
        duration: 14,
        startRowGrid: 2,
        endRowGrid: 3
      },
      {
        startPeriod: '2021-02',
        endPeriod: '2022-03',
        title: 'Event 2',
        group: 3,
        column: 2,
        duration: 14,
        startRowGrid: 2,
        endRowGrid: 3
      },
      {
        startPeriod: '2021-02',
        endPeriod: '2022-03',
        title: 'Event 2',
        group: 4,
        column: 2,
        duration: 14,
        startRowGrid: 2,
        endRowGrid: 3
      }
    ];

    const colors: AccentColors = ['#d3a418', '#ff4f04', '#3b7022'];

    const { result } = renderHook(() => useColorMap(data, colors));

    expect(result.current.size).toBe(numberOfGroups);
    expect(result.current.get(1)).toBe('hsl(45, 79%, 46%)');
    expect(result.current.get(2)).toBe('hsl(18, 100%, 60%)');
    expect(result.current.get(3)).toBe('hsl(101, 73%, 48%)');
    expect(result.current.get(4)).toBe('hsl(45, 100%, 76%)');
  });
});
