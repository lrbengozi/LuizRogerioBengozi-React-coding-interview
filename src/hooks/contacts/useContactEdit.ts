import { IPerson } from '@lib/models/person';
import { useCallback } from 'react';

export function useContactEdit(id: string) {
  console.log(`Getting contact by id ${id}`);
  return {
    contact: null as IPerson,
    update: useCallback((updated: IPerson) => {
      console.log(updated);
      throw new Error('Not implemented!');
    }, [])
  };
}
