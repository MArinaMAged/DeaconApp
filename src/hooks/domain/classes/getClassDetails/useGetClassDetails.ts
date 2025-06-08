

import { useQuery, useQueryClient } from '@tanstack/react-query';

import { GetClassesDetailsServices } from './getClassDetailsService';

const enum GetClassDetailsQueryKey {
  fetchOne = 'fetchGetClassesDetails',
}

const useGetClassDetailsQuery = ({classId}: {classId:string}) =>
  useQuery({
    queryFn: async() => await GetClassesDetailsServices.fetchOne(classId),
    queryKey: [GetClassDetailsQueryKey.fetchOne, { classId }],
    enabled: true ,
  });

  export const useGetClasses = () => {
    const client = useQueryClient();
  
    const invalidateQuery = (queryKeys: GetClassDetailsQueryKey[]) =>
      client.invalidateQueries({
        queryKey: queryKeys,
      });
  
    return {
      useGetClassDetailsQuery,
      invalidateQuery,
    };
  };