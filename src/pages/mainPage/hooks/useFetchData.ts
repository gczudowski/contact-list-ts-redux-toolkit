import { useEffect, useCallback } from 'react';
import { useAppDispatch } from '@src/app/hooks';
import { fetchContacts } from '@src/features/contacts/contacts.slice';

const useFetchData = (): { fetchData: () => void } => {
  const dispatch = useAppDispatch();
  const fetchData = useCallback(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { fetchData };
};

export default useFetchData;
