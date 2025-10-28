//import diaryData from '../../data/entries.json';
//const diaries: DiaryEntry[] = diaryData as DiaryEntry[];

import diaries from '../../data/entries';
import { DiaryEntry, NonSensitiveDiaryEntry, NewDiaryEntry} from '../types';

const getEntries = (): DiaryEntry[] => {
  return diaries;
}

const addDiary = (entry: NewDiaryEntry) => {
  const newDiaryEntry = {
    id: Math.max(...diaries.map(d=> d.id + 1)),
    ...entry
  };

  diaries.push(newDiaryEntry);
  return newDiaryEntry;
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

const findById = (id: number): DiaryEntry | undefined => {
  const entry = diaries.find(d => d.id === id);
  return entry;
} 

export default {
  getEntries,
  addDiary,
  getNonSensitiveEntries,
  findById
}