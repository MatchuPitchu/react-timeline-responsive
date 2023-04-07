import { Timeline } from './Timeline';
import type { Theme, TimelineData } from './Timeline/timeline.types';
import './styles.css';

const timelineData: TimelineData[] = [
  {
    startPeriod: '2021-02',
    endPeriod: '2022-09',
    title: 'Emoji Integration Specialist',
    organization: 'Emojify Inc.',
    content: ['Created custom emoji sets for high-profile clients including celebrities and politicians'],
    group: 1,
  },
  {
    startPeriod: '2015-01',
    endPeriod: '2023-03',
    title: 'Chief Unicorn Officer',
    organization: 'Magical Enterprises Inc.',
    content: [
      'Led a team of unicorns in the development of a revolutionary new mobile game',
      'Conducted user testing with unicorns to ensure optimal gameplay experience',
    ],
    group: 1,
  },
  {
    startPeriod: '2010-05',
    endPeriod: '2014-08',
    title: 'Ninja Developer',
    organization: 'Stealthy Software Solutions',
    content: [
      'Developed web applications with stealth and precision',
      'Performed code refactoring and optimization with lightning-fast speed',
      'Navigated complex software architecture with the agility of a ninja',
    ],
    group: 1,
  },
  {
    startPeriod: '2016-08',
    endPeriod: '2019-03',
    title: 'Stand-Up Comedian',
    organization: 'The Chuckle Hut',
    content: ['Writing and performing original comedy material'],
    group: 2,
  },

  {
    startPeriod: '2010-01',
    endPeriod: '2012-05',
    title: 'Comedy Writer',
    organization: 'Late Night with Conan',
    content: [
      'Writing monologue jokes, sketches, and other comedy segments',
      'Collaborating with producers and other writers to develop show content',
    ],
    group: 2,
  },
];

const theme: Theme = {
  colorAccentPrimary: '#d3a418',
  colorAccentSecondary: '#ff4f04',
  colorText: '#e1e1e1',
  colorBackground: '#242528',
  colorBarHex: '#f7cc4b',
  colorGradation: 4,
};

export const App = () => {
  return <Timeline timelineData={timelineData} language='de-DE' direction='asc' theme={theme} />;
};
