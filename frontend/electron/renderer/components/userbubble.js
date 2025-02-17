import { Box } from '@mui/material';
import { Container } from '@mui/material';

export default function UserBubble({ content }) {
  return (
    <Container
        sx={{
        overflowY: 'auto',
        alignContent: 'center', 
        display: 'flex',
        justifyContent: 'flex-end'

      }}>
      <Box
        sx={{        
        overflowY: 'auto',
        maxHeight: '50%',
        maxWidth: '80%',
        p: 3,
        borderRadius: 15,
        bgcolor: '#413F5D'   
      }}>
      <p class>
        {content}
      </p>
      </Box>
    </Container>  
  )
}
