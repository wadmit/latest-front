"use client"
import { useQuery, UseQueryOptions, UseQueryResult, QueryKey } from '@tanstack/react-query';
import React, { useEffect } from 'react';

type CustomQueryOptions<TData, TError> = Omit<UseQueryOptions<TData, TError>, 'queryKey' | 'queryFn'> & {
  queryKey: QueryKey;
  queryFn: () => Promise<TData>;
  onSuccess?: (data: TData) => void;
  onError?: (error: TError) => void;
};

// Custom hook that wraps useQuery and includes the onSuccess callback
export function useCustomQuery<TData, TError>({ 
  queryKey, 
  queryFn, 
  onSuccess, 
  onError, 
  ...options 
}: CustomQueryOptions<TData, TError>): UseQueryResult<TData, TError> {
  const queryResult = useQuery<TData, TError>({
    queryKey,
    queryFn,
    ...options,
  });

	useEffect(() => {
		if (queryResult.isSuccess && onSuccess) {
			onSuccess(queryResult.data);
		}
	}, [queryResult.isSuccess, queryResult.data, onSuccess]);

  useEffect(() => {
    if (queryResult.isError && onError) {
      onError(queryResult.error);
    }
  }, [queryResult.isError, queryResult.error, onError]);

  return queryResult;
}
