import { instance } from '@/services/instance';

import { loginSchema } from './schema';


export const LoginServices = {
  fetchOne: async (userName?: string, password?: string, code?:string) => {
    try {
    const requestData = userName && password 
    ? { userName, password }
    : { code };
    const url = userName && password 
    ? 'Users/user-login/'
    : 'Users/code-login/'
  
  // You may need to use a type assertion if you're certain about the structure.
  const response = await instance.post(url, { json:requestData} )?.json();
  return loginSchema.parse(response);
} catch {
  throw new Error('Login failed');
}
  },
  
};
