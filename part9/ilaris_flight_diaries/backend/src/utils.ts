//import { NewDiaryEntry, Weather, Visibility } from "./types";
import { Weather, Visibility } from "./types";
import { z } from "zod";

// const isString = (text: unknown): text is string => {
//   return typeof text === 'string' || text instanceof String;
// }

// const parseComment = (comment: unknown): string => {
//   if (!isString(comment)) {
//     throw new Error('Incorrect or missing comment');
//   }
//   return comment;

//   // return z.string().parse(comment);
// }

// const isDate = (date: string): boolean => Boolean(Date.parse(date))

// const parseDate = (date: unknown): string => {
//   if (!isString(date) || !isDate(date))
//     throw new Error('Incorrect or missing date');

//   return date;
// }

// const isWeather = (param: string): param is Weather => {
//   //return ['sunny', 'rainy', 'cloudy', 'stormy'].includes(str);
//   return Object.values(Weather).map(v => v.toString()).includes(param);
// }

// const parseWeather = (weather: unknown): Weather => {
//   if (!isString(weather) || !isWeather(weather))
//     throw new Error('Incorrect or missing weather: '+ weather);

//   return weather;
// }

// const isVisibility = (param: string): param is Visibility => {
//   return Object.values(Visibility).map(v => v.toString()).includes(param);
// }

// const parseVisibility = (visibility: unknown): Visibility => {
//   if (!isString(visibility) || !isVisibility(visibility))
//     throw new Error('Incorrect or missing visibility: ' + visibility);

//   return visibility;
// }

export const NewEntrySchema = z.object({
  weather: z.enum(Weather),
  visibility: z.enum(Visibility),
  date: z.string().date(),
  comment: z.string().optional()
})

// export const toNewDiaryEntry = (object: unknown): NewDiaryEntry => {
//   // if (!object || typeof object !== 'object') 
//   //   throw new Error ('Incorrect or missing data');

//   // if ('comment' in object && 'date' in object && 'weather' in object && 'visibility' in object){
//   //   const newEntry: NewDiaryEntry = {
//   //     comment: z.string().optional().parse(object.comment),
//   //     date: z.string().date().parse(object.date),
//   //     weather: z.enum(Weather).parse(object.weather),
//   //     visibility: z.enum(Visibility).parse(object.visibility)

//   //     // comment: parseComment(object.comment),
//   //     // date: parseDate(object.date),
//   //     // weather: parseWeather(object.weather),
//   //     // visibility: parseVisibility(object.visibility)
//   //   };

//   //   return newEntry;
//   // }

//   // throw new Error('Incorrect data: some fields are missing');

//   return NewEntrySchema.parse(object);
// }