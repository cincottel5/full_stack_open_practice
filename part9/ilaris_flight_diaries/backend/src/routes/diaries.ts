import express, { Response } from 'express';
import diaryService from '../services/diaryService';
import { NonSensitiveDiaryEntry } from '../types';
import { toNewDiaryEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitiveDiaryEntry[]>) => {
  res.send(diaryService.getNonSensitiveEntries());
});

router.post('/', (req, res) => {
  const newDiaryEntry = toNewDiaryEntry(req.body);
  const addedEntry = diaryService.addDiary(newDiaryEntry);
  res.json(addedEntry);
});

router.get('/:id', (req, res) => {
  const diary = diaryService.findById(Number(req.params.id));

  if (diary) {
    res.send(diary);
  }
  else {
    res.sendStatus(404);
  }
});




export default router;