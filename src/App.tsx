import { Timeline } from './lib';
import type { Theme, TimelineData } from './lib/index.d';
import './styles.css';

const timelineData: TimelineData[] = [
  {
    startPeriod: '2021-02',
    endPeriod: '2022-09',
    title: 'Emoji Integration Specialist',
    organization: 'Emojify Inc.',
    content: ['Created custom emoji sets for high-profile clients including celebrities and politicians'],
    group: 1
  },
  {
    startPeriod: '2013-06',
    endPeriod: '2019-12',
    title: 'Data Wizard',
    organization: 'Infinite Insights LLC',
    content: [
      'Developed complex algorithms to analyze and interpret large datasets',
      'Implemented data visualization techniques to communicate insights to stakeholders',
      'Led a team of data scientists and analysts to achieve project objectives'
    ],
    group: 1
  },
  {
    startPeriod: '2010-05',
    endPeriod: '2014-08',
    title: 'Ninja Developer',
    organization: 'Stealthy Software Solutions',
    content: [
      'Developed web applications with stealth and precision',
      'Performed code refactoring and optimization with lightning-fast speed',
      'Navigated complex software architecture with the agility of a ninja'
    ],
    group: 1
  },
  {
    startPeriod: '2016-08',
    endPeriod: '2019-03',
    title: 'Stand-Up Comedian',
    organization: 'The Chuckle Hut',
    content: ['Writing and performing original comedy material'],
    group: 2
  },
  {
    startPeriod: '2010-01',
    endPeriod: '2012-05',
    title: 'Comedy Writer',
    organization: 'Late Night with Conan',
    content: ['Writing monologue jokes, sketches, and other comedy segments'],
    group: 2
  },
  {
    startPeriod: '2017-10',
    endPeriod: '',
    title: 'Space Explorer',
    organization: 'Interstellar Adventures Inc.',
    content: [
      'Piloted a spacecraft to explore deep space and conduct scientific research',
      'Developed protocols and procedures to ensure the safety of the crew and equipment',
      'Collaborated with international space agencies to achieve shared goals'
    ],
    group: 2
  },
  {
    startPeriod: '2020-02',
    endPeriod: '2020-11',
    title: 'Cybersecurity Guru',
    organization: 'Secure Systems Inc.',
    content: [
      'Developed and implemented security protocols to protect against cyber attacks',
      'Conducted security assessments and risk analyses to identify vulnerabilities',
      'Collaborated with clients to develop customized security solutions'
    ],
    group: 2
  }
];

const theme: Theme = {
  colorAccentPrimary: '#d3a418',
  colorAccentSecondary: '#ff4f04',
  colorText: '#e1e1e1',
  colorBackground: '#242528',
  colorBarHex: '#f7cc4b',
  colorGradation: 4
};

export const App = () => {
  return <Timeline timelineData={timelineData} language="de-DE" direction="asc" theme={theme} />;
};
