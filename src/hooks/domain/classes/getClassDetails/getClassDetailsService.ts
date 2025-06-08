// getClassesService.ts
import { authorizedInstance } from '@/services/instance';
import {  classDetailSchema } from './schema';

export const GetClassesDetailsServices = {
  fetchOne: async (classId:string) => {
    try {
      console.log('GetClassesDetailsServices called');
      const url = 'Classes/get-details/';
      
      const response = await authorizedInstance.get(url, { searchParams:classId })?.json();
      console.log(response, 'GetClassesDetailsServices');
      return classDetailSchema.parse(response);
    } catch (error) {
      console.log(error, 'GetClassesDetailsServicesssss');
      throw new Error('GetClasses failed');
    }
  },
};