import { z } from 'zod';

const baseAuditSchema = z.object({
  creationDate: z.string(),
  firstModificationDate: z.string().nullable(),
  lastModificationDate: z.string().nullable(),
  createdByUserId: z.number().nullable(),
  firstModifiedByUserId: z.number().nullable(),
  lastModifiedByUserId: z.number().nullable(),
  isDeleted: z.boolean(),
  deletionDate: z.string().nullable(),
  deletedByUserId: z.number().nullable(),
  mustDeletedPhysical: z.boolean().nullable(),
});

const materialSchema = baseAuditSchema.extend({
  id: z.number(),
  filePath: z.string(),
  fileSize: z.number(),
  type: z.number(), // Could be enum if type mapping is known
});

const levelSchema = baseAuditSchema.extend({
  id: z.number(),
  classId: z.number(),
  title: z.string(),
  materials: z.array(materialSchema),
});

const userSchema = z.object({
  id: z.number(),
  creationDate: z.string(),
  name: z.string(),
  username: z.string().nullable(),
  isActive: z.boolean().nullable(),
  profileImage: z.string().nullable(),
  phoneNumber: z.string().nullable(),
  email: z.string().nullable(),
  organizationName: z.string().nullable(),
  roleName: z.string().nullable(),
  code: z.string().nullable(),
});

export const classDetailSchema = baseAuditSchema.extend({
  id: z.number(),
  nameEn: z.string(),
  nameAr: z.string(),
  descriptionEn: z.string(),
  descriptionAr: z.string(),
  levels: z.array(levelSchema),
  studentsList: z.array(userSchema),
  servantsList: z.array(userSchema),
});

// Type inference
export type ClassDetail = z.infer<typeof classDetailSchema>;
