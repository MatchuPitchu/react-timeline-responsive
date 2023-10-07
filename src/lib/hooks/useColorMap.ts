import { hexToHsl, notNullOrUndefined } from '../Timeline/timeline.utils';
import type { AccentColors, Groups, ProcessedTimelineData } from '../index.d';

const generateColorVariants = (hex: `#${string}`, number: number): `hsl(${string}` | undefined => {
  const baseHSLColor = hexToHsl(hex);

  const hueRange = 0;
  const saturationRange = 10;
  const lightnessRange = 10;

  // determine the variant hue, saturation, and lightness
  // for group 1: no variant, take original
  const variantHue = (parseInt(baseHSLColor.hue) + (number - 1) * hueRange) % 360;
  const variantSat = Math.max(0, Math.min(100, parseInt(baseHSLColor.saturation) + (number - 1) * saturationRange));
  const variantLight = Math.max(0, Math.min(100, parseInt(baseHSLColor.lightness) + (number - 1) * lightnessRange));

  return `hsl(${variantHue}, ${variantSat}%, ${variantLight}%)`;
};

export const useColorMap = (data: ProcessedTimelineData[], colors: AccentColors) => {
  const cleanedColors = colors.filter(notNullOrUndefined);

  const groups: Groups[] = data.map(({ group }) => group);
  const groupsSet = [...new Set(groups)];

  const colorMap = groupsSet.reduce((accumulator, currentGroup) => {
    const remainder = currentGroup % 3; // group 1: 2, group 2: 1, group 3: 0 ...
    const cleanedColorsIndex = remainder === 0 ? 2 : remainder - 1;

    // if no provided accent color, then take first color
    const baseHexColor = cleanedColors[cleanedColorsIndex] ?? cleanedColors[0];

    const hslColor = generateColorVariants(baseHexColor, currentGroup);

    if (!hslColor) return accumulator;

    accumulator.set(currentGroup, hslColor);
    return accumulator;
  }, new Map<Groups, string>());

  return colorMap;
};
