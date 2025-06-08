import { z } from 'zod';


export const classItemSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  studentCount: z.number(),
  levelsCount: z.number(),
  creationDate: z.string(), // ISO date string
  sessions: z.null(), // Based on your data, this is always null
});

// Main collection response schema
export const classesCollectionSchema = z.object({
  collection: z.array(classItemSchema),
  pagination: z.null(), // Based on your data, this is null
});

// Type inference
export type ClassItem = z.infer<typeof classItemSchema>;
export type ClassesCollection = z.infer<typeof classesCollectionSchema>;

// If you want to handle cases where sessions might have actual data later:
// export const flexibleClassItemSchema = z.object({
//   id: z.number(),
//   name: z.string(),
//   description: z.string(),
//   studentCount: z.number(),
//   levelsCount: z.number(),
//   creationDate: z.string(),
//   sessions: z.unknown().nullable(), // More flexible for future changes
// });

// If pagination might have actual structure later:
// export const flexibleClassesCollectionSchema = z.object({
//   collection: z.array(flexibleClassItemSchema),
//   pagination: z.unknown().nullable(), // More flexible for future changes
// });

// export type ClassItem = z.infer<typeof flexibleClassItemSchema>;
// export type ClassesCollection = z.infer<typeof flexibleClassesCollectionSchema>;