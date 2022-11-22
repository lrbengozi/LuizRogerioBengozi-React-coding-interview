import { Box, Typography, Avatar } from '@mui/material';
import { SystemStyleObject, Theme } from '@mui/system';

import { Card } from '@components/atoms';
import { IPerson } from '@lib/models/person';

export interface IContactCardProps {
  person: IPerson;
  onEdit(id: string): void;
  sx?: SystemStyleObject<Theme>;
}

export const ContactCard: React.FC<IContactCardProps> = ({
  person: { id, firstName, lastName, email },
  onEdit,
  sx
}) => {
  return (
    <Card sx={sx}>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Avatar sx={{ mr: 1.5 }} />
        <Box textAlign="center" mt={2}>
          <Typography variant="subtitle1" lineHeight="1rem">
            {firstName} {lastName}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {email}
          </Typography>
        </Box>
      </Box>
    </Card>
  );
};
