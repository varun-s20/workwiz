import { Divider, styled, alpha } from '@mui/material';
import React from 'react';
import Link from '@mui/material/Link';
import { TemplateSlider } from './TemplatesSlider';

// export const StyledLink = styled(Link)(({ theme }) => ({
//   color: 'blue',
//   borderColor: theme.palette.resume[100],
//   ':hover': {
//     borderColor: theme.palette.resume[800],
//     backgroundColor: alpha(theme.palette.resume[800], 0.04),
//   },
// }));

export const TemplateSelect = () => {
  return (
    <div className={`h-full w-full bg-white flex flex-col py-4 shadow-2xl`}>
      <TemplateSlider />
    </div>
  );
};
