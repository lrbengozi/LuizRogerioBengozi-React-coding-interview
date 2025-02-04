import { Box, Typography, Avatar } from '@mui/material';
import { SystemStyleObject, Theme } from '@mui/system';

import { Card } from '@components/atoms';
import { IContact } from 'react-coding-interview-shared/models';
import { InlineInput } from '@components/InlineInput';
import { useState } from 'react';

export interface IContactCardProps {
  person: IContact;
  sx?: SystemStyleObject<Theme>;
}

export const ContactCard: React.FC<IContactCardProps> = ({
  person: { name, email },
  sx,
}) => {
  const [localName, setLocalName] = useState(name);
  const [localEmail, setLocalEmail] = useState(email);

  return (
    <Card sx={sx}>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Avatar />
        <Box textAlign="center" mt={2}>
          <InlineInput
            initialValue={name}
            variant="subtitle1"
            onSubmit={(value) => {
              setLocalName(value);
            }}
          />
          <InlineInput
            initialValue={email}
            variant="email"
            onSubmit={(value) => {
              setLocalEmail(value);
            }}
          />
          {/* <Typography variant="subtitle1" lineHeight="1rem">
            {name}
          </Typography> */}

          {/* <Typography variant="caption" color="text.secondary">
            {email}
          </Typography> */}
        </Box>
      </Box>
    </Card>
  );
};
