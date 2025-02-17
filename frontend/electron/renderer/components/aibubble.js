import { Box } from '@mui/material';
import { Container } from '@mui/material';

export default function AiBubble({ content }) {
  return (
    <Container 
          sx={{
          overflowY: 'auto',
          justifyContent: 'center', 
          display: 'flex',
        }}>
      <Box
        sx={{        
        maxWidth: '80%',
        p: 3,
        borderRadius: 15,
        color: 'ffffff'   
      }}>
      <p class>
        {content}
      </p>
      </Box>
    </Container>
  )
}
