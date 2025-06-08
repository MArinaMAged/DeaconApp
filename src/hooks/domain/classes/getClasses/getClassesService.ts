// getClassesService.ts
import { authorizedInstance } from '@/services/instance';
import { classesCollectionSchema } from './schema';

export const GetClassesServices = {
  fetchOne: async () => {
    try {
      console.log('GetClassesServices called');
      const url = 'Classes/get-classes/';
      
      const response = await authorizedInstance.post(url, { json: {} })?.json();
      console.log(response, 'GetClassesServices');
      return classesCollectionSchema.parse(response);
    } catch (error) {
      console.log(error, 'GetClassesServicesssss');
      throw new Error('GetClasses failed');
    }
  },
};