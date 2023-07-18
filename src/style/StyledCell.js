import { styled } from '@mui/system';
import Paper from '@mui/material/Paper';

const Cell = styled(Paper)({
  width: '100%',
  height: '0',
  paddingBottom: '100%',
  border: '1px solid black',
  boxSizing: 'border-box',
  display: 'flex', // Added this line
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#8ba9b5',
  color: '#8ba9b5'
});

export default Cell;
