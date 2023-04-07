import { hexToHsl, notNullOrUndefined } from '../Timeline/timeline.utils';
import type { TimelineData, Groups } from '../Timeline/timeline.types';

const generateColorVariants = (hex: string, number: number): `hsl(${string}` | undefined => {
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

export const useColorMap = (data: Required<TimelineData>[], colors: (string | undefined)[]) => {
  // reverse() for right color order (primary, secondary -> look at remainder below)
  const cleanedColors = colors.filter(notNullOrUndefined).reverse();

  const groups: Groups[] = data.map(({ group }) => group);
  const groupsSet = [...new Set(groups)];

  const colorMap = groupsSet.reduce((accumulator, currentGroup) => {
    const remainder = currentGroup % 2; // group 1: 1, group 2: 0, group 3: 1 ...

    // if no secondary accent color, then take first color
    const baseHexColor = cleanedColors[remainder] ?? cleanedColors[0];

    const hslColor = generateColorVariants(baseHexColor, currentGroup);

    if (!hslColor) {
      return accumulator;
    }

    accumulator.set(currentGroup, hslColor);
    return accumulator;
  }, new Map<Groups, string>());

  return colorMap;
};
