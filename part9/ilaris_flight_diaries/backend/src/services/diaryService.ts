//import diaryData from '../../data/entries.json';
//const diaries: DiaryEntry[] = diaryData as DiaryEntry[];

import diaries from '../../data/entries';
import { DiaryEntry, NonSensitiveDiaryEntry } from '../types';

const getEntries = (): DiaryEntry[] => {
  return diaries;
}

const addDiary = () => {
  return null;
}

// const getNonSensitiveEntries = (): Pick<DiaryEntry, 'id' | 'date' | 'weather' | 'visibility'>[] => {
//     return getEntries();
// }

// const NonSensitiveDiaryEntry = (): Omit<DiaryEntry, 'comment'>[] => {
//   return getEntries();
// } 

const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] => {
  return getEntries().map(({ id, date, weather, visibility}) => ({
    id,
    date,
    weather,
    visibility
  }));
}

export default {
  getEntries,
  addDiary,
  getNonSensitiveEntries
}