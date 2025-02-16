import { z } from 'zod';

export enum UserRole {
  Servant = 'Servant',
  Student = 'Student',
}

export const loginSchema = z.object({
  access_token: z.string(),
  token_type: z.string(),
  expires_in: z.number(),
  id: z.number(),
  userName: z.string(),
  nameAr: z.string(),
  nameEn: z.string(),
  name: z.string(),
  email: z.string(),
  phoneNumber: z.string().nullable(),
  profileImage: z.string().nullable(),
  organizationId: z.number().nullable(),
  organizationName: z.string().nullable(),
  organizationNameAr: z.string().nullable(),
  organizationNameEn: z.string().nullable(),
  organizationImage: z.string().nullable(),
  roleName: z.nativeEnum(UserRole),
  issued: z.string(),
  expires: z.string().nullable(),
  isFirstTimeLogin: z.boolean(),
});

export type login = z.infer<typeof loginSchema>;
