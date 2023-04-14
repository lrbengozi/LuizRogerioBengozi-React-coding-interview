import { useCallback, useEffect, useRef, useState } from 'react';

import { IContactListResult, contactsClient } from '@lib/clients/contacts';

export interface IUseContactListOptions {
  initial?: { size: number; currentPage: number };
}

const fetchContacts = (pageSize: number, pageNumber: number) =>
  contactsClient.contactList({
    pageSize,
    pageNumber
  });

export function useContactList(
  opts: IUseContactListOptions = {
    initial: { size: 20, currentPage: 0 }
  }
) {
  const initialized = useRef(false);

  const [result, setResult] = useState<IContactListResult>({
    data: [],
    totalCount: null
  });

  const [loading, setLoading] = useState(true);
  const [paging, setPaging] = useState(opts.initial);

  const goNextPage = useCallback(async () => {
    if (!initialized.current || result.totalCount > result.data.length) {
      initialized.current = true;
      setLoading(true);

      setPaging({ 
        size: paging.size, 
        currentPage: paging.currentPage + 1 
      });
    }
  }, [paging, result]);

  const fetchCurrentPage = useCallback(async () => {
    const res = await fetchContacts(paging.size, paging.currentPage);

    setResult(({ data }) => {
      return { 
        data: [...data, ...res.data],
        totalCount: res.totalCount
      };
    });

    setLoading(false);
  }, [paging]);

  const { currentPage } = paging;

  useEffect(() => {
    if (currentPage === 0) {
      goNextPage();
    } else {
      fetchCurrentPage();
    }
  }, []);

  return {
    paging,
    contacts: result,
    loading,
    goNextPage
  };
}
