# React Timeline Component

<p style="text-align: center">
  <a href="https://www.npmjs.com/package/react-timeline-responsive" target="_blank" >
    <img src="https://img.shields.io/npm/v/react-timeline-responsive?color=d3a418&label=version&style=flat-square" alt="npm version" />
  </a>
  <img src="https://img.shields.io/codecov/c/gh/MatchuPitchu/react-timeline-responsive?color=006A50&style=flat-square"/>
  <img src="https://img.shields.io/badge/language-typescript-blue.svg?style=flat-square"/>
  <a href="https://github.com/MatchuPitchu/react-timeline-responsive/blob/main/LICENSE" target="_blank">
    <img src="https://img.shields.io/github/license/MatchuPitchu/react-timeline-responsive?color=%23cacaca&style=flat-square"/>
  </a>
  <img src="https://img.shields.io/bundlephobia/minzip/react-timeline-responsive?color=f7cc4b&style=flat-square"/>
  <img src="https://img.shields.io/github/last-commit/MatchuPitchu/react-timeline-responsive?color=%23073763&style=flat-square"/>
  <img src="https://img.shields.io/npm/dw/react-timeline-responsive?color=7b69ce&label=npm%20downloads&style=flat-square"/>
</p>

React Timeline Component is a customizable timeline component for React applications. You can use it to display a timeline of events or any other chronological data.

Just provide your timeline data and your desired theme, and the `Timeline` component will take care of everything for you: the `positioning`, a `fancy sticky grid layout` that is `responsive`.

The Timeline component is type safe and was designed in `TypeScript`.

## Demo View

- `desktop`

![React Timeline Component Desktop View](https://github.com/MatchuPitchu/react-timeline-responsive/blob/main/npm-assets/react-timeline-responsive-desktop.gif?raw=true)

- `mobile`

![React Timeline Component Mobile View](https://github.com/MatchuPitchu/react-timeline-responsive/blob/main/npm-assets/react-timeline-responsive-mobile.gif?raw=true)

## Installation

- install this component via npm: `npm i react-timeline-responsive`

## Usage

To use the component, import it into your project and render it with the necessary props.

```tsx
import { Timeline } from 'react-timeline-responsive';

const timelineData: TimelineData[] = [
  {
    startPeriod: '2010-05',
    endPeriod: '2018-10',
    title: 'Title of event/period 1',
    subtitle: 'Subtitle 1', // optional
    content: ['Content 1 line 1', 'Content 1 line 2'], // optional
    group: 1,
  },
  {
    startPeriod: '2015-01',
    endPeriod: '',
    title: 'Title of event/period 2',
    subtitle: 'Subtitle 2',
    content: ['Content 2 line 1'],
    group: 2,
  },
  // Add more events/periods here...
];

const language = 'en-US'; // date language format
const order = 'asc'; // in which order timeline goes ('asc' | 'desc')
const stickyMarginTopDesktop = 50; // e.g. if sticky navbar is present; default: 60 -> results in 60px
const stickyMarginTopMobile = 10; // default: 15 -> results in 15px

const theme: Theme = {
  colorAccentPrimary: '#d3a418',
  colorAccentSecondary: '#ff4f04', // optional: nice if more than 1 group
  colorAccentTertiary: '#3b7022', // optional: nice if more than 2 groups
  colorText: '#e1e1e1',
  colorBackground: '#242528',
  colorBarHex: '#f7cc4b',
  colorGradation: 4, // optional: default is 4
};

const MyTimeline = () => {
  return (
    <Timeline
      timelineData={timelineData}
      language={language}
      order={order}
      theme={theme}
      stickyMarginTopDesktop={stickyMarginTopDesktop}
      stickyMarginTopMobile={stickyMarginTopMobile}
    />
  );
};
```

### Notices

- The timeline starts automatically in the year of the earliest period and ends in the year of the latest period.
- If a period is still active and doesn't have an end date, use an empty string for the `endDate` property in the timeline data.
- The `language` prop is used to define the format of the date strings displayed in the period text box. For example, you can set it to `de-DE` for German language formatting.
- The `order` prop defines in which order the timeline should go. You can set it to either `asc` for ascending (i.e., from past to present) or `desc` for descending (i.e., from present to past).
- The component provides several color theming props to allow for customization of the visual appearance. Make sure to provide the required colors in the proper format (e.g., as hexadecimal values if needed in the type definition). You can use the `theme` object e.g. to switch between dark and light mode.

### Usage Advices

- To improve performance and avoid unnecessary re-renders, consider memoizing the `timelineData` and `theme` objects when passing them to the component as props. You can use the React `useMemo` hook for this purpose. The component is wrapped in `React.memo()` so the component function is not re-rendered if the object references remain stable..
- If you generate your `timelineData` object dynamically (e.g. you could dynamically merge multiple data arrays containing different `group` numbers for filtering purposes), also consider memoizing it to prevent needless computations and renders.
- When designing your timeline, be mindful of the number of overlapping periods to ensure that the layout remains clear and readable (take care to limit them to at most 3 or 4)

## Props

| Name                   | Type            | Required | Default   | Description                                                                      |
| :--------------------- | :-------------- | :------- | :-------- | :------------------------------------------------------------------------------- |
| timelineData           | TimelineData[]  | Yes      | N/A       | An array of timeline data to display. See below for the details of TimelineData. |
| language               | LocalesArgument | Yes      | N/A       | The locale for the date format of the timeline (e.g. `en-US`, `de-DE`).          |
| order                  | 'asc' or 'desc' | Yes      | N/A       | The order in which the timeline should be displayed.                             |
| theme                  | Theme           | Yes      | See below | The color theme for the timeline. See below for the details of Theme.            |
| stickyMarginTopDesktop | number          | No       | 60        | The margin top value in pixels for the sticky effect on desktop devices.         |
| stickyMarginTopMobile  | number          | No       | 15        | The margin top value in pixels for the sticky effect on mobile devices.          |

## TimelineData

`TimelineData` is an object type that represents a single item on the timeline.

| Name        | Type     | Required | Default | Description                                                                                       |
| :---------- | :------- | :------- | :------ | :------------------------------------------------------------------------------------------------ |
| startPeriod | string   | Yes      | N/A     | The start date of the timeline item in YYYY-MM format.                                            |
| endPeriod   | string   | Yes      | N/A     | The end date of the timeline item in YYYY-MM format. Use an empty string ('') for active periods. |
| title       | string   | Yes      | N/A     | The title of the timeline item.                                                                   |
| subtitle    | string   | No       | N/A     | The subtitle (e.g. an organization) associated with the timeline item.                            |
| content     | string[] | No       | N/A     | An array of strings representing the text content of the timeline item.                           |

## Theme

`Theme` is an object type that lets you customize the Timeline component

| Prop                 | Type   | Required | Default            | Description                                                                             |
| :------------------- | :----- | :------- | :----------------- | :-------------------------------------------------------------------------------------- |
| colorAccentPrimary   | string | Yes      | N/A                | The primary color accent of the timeline. Must be in hex format, starting with a `#`.   |
| colorAccentSecondary | string | No       | colorAccentPrimary | The secondary color accent of the timeline. Must be in hex format, starting with a `#`. |
| colorAccentTertiary  | string | No       | colorAccentPrimary | The tertiary color accent of the timeline. Must be in hex format, starting with a `#`.  |
| colorText            | string | Yes      | N/A                | The text color of the timeline. Must be in hex format, starting with a `#`.             |
| colorBackground      | string | Yes      | N/A                | The background color of some timeline elements.                                         |
| colorBarHex          | string | Yes      | N/A                | The color of the timeline bar. Must be in hex format, starting with a `#`.              |
| colorGradation       | number | No       | 4                  | The gradation between the automatically generated color variants for the period bars.   |

## Website of Package Author

> <https://www.michaelflohr.de/webentwicklung#npm-packages>
