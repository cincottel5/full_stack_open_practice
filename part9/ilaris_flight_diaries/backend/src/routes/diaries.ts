import express, { Response, Request } from 'express';
import diaryService from '../services/diaryService';
import { DiaryEntry, NewDiaryEntry, NonSensitiveDiaryEntry } from '../types';
//import { NewEntrySchema } from '../utils';
//import { z } from 'zod';
//import { toNewDiaryEntry } from '../utils';
import { newDiaryParser } from '../middleware';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitiveDiaryEntry[]>) => {
  res.send(diaryService.getNonSensitiveEntries());
});

router.post('/', newDiaryParser, (req: Request<unknown, unknown, NewDiaryEntry>, res: Response<DiaryEntry>) => {
  const addedEntry = diaryService.addDiary(req.body);
  res.json(addedEntry);
})

// router.post('/', (req, res) => {
//   // const newDiaryEntry = toNewDiaryEntry(req.body);
//   // const addedEntry = diaryService.addDiary(newDiaryEntry);
//   // res.json(addedEntry);

//   try {
//     const newDiaryEntry = NewEntrySchema.parse(req.body);
//     const addedEntry = diaryService.addDiary(newDiaryEntry);
//     res.json(addedEntry);
//   }
//   catch (error: unknown) {
//     if (error instanceof z.ZodError) {
//       res.status(400).send({ error: error.issues});
//     }
//     else {
//       res.status(400).send({ error: 'unknown error'});
//     }
//   }
// });

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