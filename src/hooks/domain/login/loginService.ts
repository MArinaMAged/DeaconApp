import { instance } from '@/services/instance';

import { loginSchema } from './schema';
import { storage } from '@/App';
import { AuthContext } from '@/hooks/AuthContext/AuthContext';
import { useContext } from 'react';

export const LoginServices = {
  fetchOne: async (userName?: string, password?: string, code?:string) => {
    try {
      // console.log('aloooo', userName,password, code)
    const requestData = userName && password 
    ? { userName, password }
    : { code };
    const url = userName && password 
    ? 'Users/user-login/'
    : 'Users/code-login/'
  //640268
  
  const response = await instance.post(url, { json:requestData} )?.json();
  return loginSchema.parse(response);
} catch(error){
  console.log(error, 'LoginServicesssss')
   throw new Error('Login failed');
}
  },
  
};
