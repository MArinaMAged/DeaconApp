import type { login } from './schema';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { LoginServices } from './loginService';

const enum LoginQueryKey {
  fetchOne = 'fetchLogin',
}

const useLoginQuery = ({ userName, password, code }: { code?: string, password?: string; userName?: string; }) =>
  useQuery({
    queryFn: async() => await LoginServices.fetchOne(userName, password, code),
    queryKey: [LoginQueryKey.fetchOne, { userName, password, code }],
    enabled: userName&&password || code?true: false ,
  });

//chatgpt 
  // const useLoginQuery = () =>
  //   useMutation({
  //     mutationFn: async ({ userName, password, code }: { code?: string, password?: string; userName?: string; }) => {
  //       return await LoginServices.fetchOne(userName, password, code);
  //     },
  //     onMutate: () => {
  //       console.log('onMutate: Mutation started');
  //     },
  //     onSuccess: (data) => {
  //       console.log('onSuccess: Mutation succeeded', data);
  //     },
  //     onError: (error) => {
  //       console.error('onError: Mutation failed', error);
  //     },
  //     onSettled: () => {
  //       console.log('onSettled: Mutation completed');
  //     },
  //   });
  export const useLogin = () => {
    const client = useQueryClient();
  
    const invalidateQuery = (queryKeys: LoginQueryKey[]) =>
      client.invalidateQueries({
        queryKey: queryKeys,
      });
  
    return {
      useLoginQuery,
      invalidateQuery,
    };
  };