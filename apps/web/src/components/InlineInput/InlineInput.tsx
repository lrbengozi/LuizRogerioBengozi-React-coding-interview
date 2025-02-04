import { InlineInputProps } from '@components/InlineInput/InlineInput.type';
import { Box, TextField, Button, Typography } from '@mui/material';
import React, { useState } from 'react';

export const InlineInput: React.FC<InlineInputProps> = ({
  initialValue,

  onSubmit,
  variant,
}) => {
  const [value, setValue] = useState(initialValue);
  const [isActive, setIsActive] = useState(false);
  return (
    <Box>
      {isActive ? (
        <>
          <TextField value={value} onChange={(e) => setValue(e.target.value)} />
          <Button
            variant="text"
            onClick={() => {
              onSubmit(value);
              setIsActive(false);
            }}
          >
            S
          </Button>
          <Button
            variant="text"
            onClick={() => {
              setIsActive(false);
              setValue(initialValue);
            }}
          >
            C
          </Button>
        </>
      ) : (
        <>
          <Typography
            variant="subtitle1"
            lineHeight="1rem"
            onClick={() => {
              setIsActive(true);
            }}
          >
            {value}
          </Typography>
        </>
      )}
    </Box>
  );
};
