import { styled } from '@mui/system';
import Paper from '@mui/material/Paper';

const ClickedCell = styled(Paper)({
  width: '100%',
  height: '0',
  paddingBottom: '100%',
  border: '1px solid black',
  boxSizing: 'border-box',
  display: 'grid',
//   alignItems: 'center',
//   justifyContent: 'center',
  placeItems: 'center',
  backgroundColor: 'white',
  color: 'black',
  fontSize: '20px', 
  '& > *': { 
    transform: 'translateY(10%)', 
  },
});

export default ClickedCell;
