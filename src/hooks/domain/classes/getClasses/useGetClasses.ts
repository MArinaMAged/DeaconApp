

import { useQuery, useQueryClient } from '@tanstack/react-query';

import { GetClassesServices } from './getClassesService';

const enum GetClassesQueryKey {
  fetchOne = 'fetchGetClasses',
}

const useGetClassesQuery = () =>
  useQuery({
    queryFn: async() => await GetClassesServices.fetchOne(),
    queryKey: [GetClassesQueryKey.fetchOne],
    enabled: true ,
  });

  export const useGetClasses = () => {
    const client = useQueryClient();
  
    const invalidateQuery = (queryKeys: GetClassesQueryKey[]) =>
      client.invalidateQueries({
        queryKey: queryKeys,
      });
  
    return {
      useGetClassesQuery,
      invalidateQuery,
    };
  };