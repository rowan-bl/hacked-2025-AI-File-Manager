import { Box } from '@mui/material';
import { Container } from '@mui/material';

export default function AiBubble({ content }) {
  return (
    <Container 
          sx={{
          overflowY: 'auto',
          justifyContent: 'center', 
          display: 'flex',
          mb: 10
        }}>
      <Box
        sx={{        
        maxWidth: '80%',
        color: 'ffffff',
        fontWeight: '700'
      }}>
      <p>
        {content}
      </p>
       <div className="w-[50vw] h-0.5 bg-gray-300 mt-4 truncate">
      </div>
      </Box>    
     
    </Container>
  )
}
