import type { HexToHslReturn, TimelineData } from './timeline.types';

export const notNullOrUndefined = <T>(value: T | null | undefined): value is T => value !== null && value !== undefined;

export const setCSSVariable = (key: string, value?: string) => {
  if (!value) return;
  document.documentElement.style.setProperty(key, value);
};

export const isYearNumber = (str: string) => /\d{4}/.test(str);

export const getTimelineBorders = (data: TimelineData[]) => {
  const getYear = (dateString: string): number | null => {
    const str = dateString.substring(0, 4);
    if (isYearNumber(str)) {
      return Number(str);
    }
    return null;
  };

  const periodStartingYears = data.map((item) => getYear(item.startPeriod)).filter(notNullOrUndefined);
  const periodEndingYears = data.map((item) => getYear(item.endPeriod)).filter(notNullOrUndefined);

  return { minYear: Math.min(...periodStartingYears), maxYear: Math.max(...periodEndingYears) };
};

export const generateArray = <T>(length: number, cb: (value: unknown, index: number) => T) =>
  Array.from({ length }, cb);

export const getSortedData = (data: TimelineData[]) => data.sort((a, b) => a.startPeriod.localeCompare(b.startPeriod));

export const hexToHsl = (hex: string): HexToHslReturn => {
  // Convert hex to RGB
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;

  // Find min and max values of RGB
  const cmin = Math.min(r, g, b);
  const cmax = Math.max(r, g, b);
  const delta = cmax - cmin;

  // Calculate HSL values
  let h = 0;
  let s = 0;
  let l = 0;

  if (delta === 0) {
    h = 0;
  } else if (cmax === r) {
    h = ((g - b) / delta) % 6;
  } else if (cmax === g) {
    h = (b - r) / delta + 2;
  } else {
    h = (r - g) / delta + 4;
  }

  h = Math.round(h * 60);

  if (h < 0) {
    h += 360;
  }

  l = (cmax + cmin) / 2;
  s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  // Return HSL string
  return {
    hsl: `hsl(${h}, ${s}%, ${l}%)`,
    hue: `${h}`,
    saturation: `${s}%`,
    lightness: `${l}%`
  };
};
