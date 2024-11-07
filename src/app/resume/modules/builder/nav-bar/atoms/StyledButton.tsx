
import { Button, styled, alpha } from '@mui/material';

export const StyledButton = styled(Button)(({ theme }) => ({
  color: '#8f0505',
  borderColor: alpha('#8f0505', 0.8),
  ':hover': {
    borderColor: '#8f0505',
    backgroundColor: alpha('#8f0505', 0.04),
  },
}));
