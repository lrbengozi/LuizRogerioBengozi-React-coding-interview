import { Box, LinearProgress, Typography } from '@mui/material';
import { useCallback, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { ContactCard } from '@components/molecules';
import { InfiniteScrollList } from '@components/organisms';
import { useContactList } from '@hooks/contacts/useContactList';
import { useUIContext } from '@hooks/useUIContext';
import { IPerson } from '@lib/models/person';

const ListContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Box
    sx={{
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 2
    }}>
    {children}
  </Box>
);

const PAGE_SIZE = 20;

export const ContactListPage: React.FC = () => {
  const navigate = useNavigate();
  const [qs, setQs] = useSearchParams();

  const {
    loading,
    contacts: { data: contacts, totalCount: totalPersonCount },
    goNextPage,
    paging
  } = useContactList({
    initial: {
      size: qs.has('s') ? Number(qs.get('s')) : PAGE_SIZE,
      currentPage: qs.has('p') ? Number(qs.get('p')) : 0
    }
  });

  const { navbarInteractivePortal, mainScrollElementRef } = useUIContext();

  useEffect(() => {
    if (paging?.currentPage > 0) {
      setQs(
        new URLSearchParams({
          p: paging.currentPage.toString(),
          s: paging.size.toString()
        })
      );
    }
  }, [paging]);

  const onPersonEdit = useCallback((personId: string) => {
    navigate(`/contacts/edit/${personId}`);
  }, []);

  return (
    <Box p={4} overflow="auto">
      <InfiniteScrollList<IPerson>
        items={contacts}
        hasMore={contacts.length < (totalPersonCount as number)}
        loadMore={goNextPage}
        loading={loading}
        ListContainer={ListContainer}
        renderItem={p => <ContactCard key={p.id} person={p} onEdit={onPersonEdit} />}
        scrollProps={{ getScrollParent: () => mainScrollElementRef.current }}
      />

      {navbarInteractivePortal(
        <Box height="100%" display="flex" alignItems="center" justifyContent="end" pl={8}>
          {loading && <LinearProgress sx={{ width: '100%' }} />}
          {!loading && (
            <Typography variant="caption">
              Displaying {contacts.length} out of {totalPersonCount} total persons
            </Typography>
          )}
        </Box>
      )}
    </Box>
  );
};
