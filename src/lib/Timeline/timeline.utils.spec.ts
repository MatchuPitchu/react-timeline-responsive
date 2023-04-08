import { setCSSVariable, hexToHsl } from './timeline.utils';

describe('setCSSVariable function', () => {
  const initialColor = 'red';
  const newColor = 'blue';

  beforeEach(() => {
    document.documentElement.style.setProperty('--primary-color', initialColor);
  });

  it('should update the CSS variable with the new value', () => {
    setCSSVariable('--primary-color', newColor);
    expect(document.documentElement.style.getPropertyValue('--primary-color')).toEqual(newColor);
  });

  it('should not update the CSS variable if the value is undefined', () => {
    setCSSVariable('--primary-color', undefined);
    expect(document.documentElement.style.getPropertyValue('--primary-color')).toEqual(initialColor);
  });
});

describe('hexToHsl function', () => {
  it('should convert hex color code to HSL object', () => {
    const hexColor = '#d3a418';
    const hslObject = hexToHsl(hexColor);

    expect(hslObject.hsl).toEqual('hsl(45, 79.6%, 46.1%)');
  });

  it('should handle 3-digit hex color codes', () => {
    const hexColor = '#f00';
    const hslObject = hexToHsl(hexColor);

    expect(hslObject.hsl).toEqual('hsl(0, 100%, 47.1%)');
  });

  it('should handle uppercase hex color codes', () => {
    const hexColor = '#EEEEEE';
    const hslObject = hexToHsl(hexColor);

    expect(hslObject.hsl).toEqual('hsl(0, 0%, 93.3%)');
  });
});
