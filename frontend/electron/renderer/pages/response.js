import UserBubble from '../components/userbubble';
import { Container } from '@mui/material';


export default function NextPage() {

  

  return (
    <main>
   
     <Container
          sx={{
          overflowY: 'auto',
          maxHeight: '80%',
          position: 'fixed',
          right: 1,
          display: 'flex',
          justifyContent: 'flex-end'
        }}>

          <UserBubble content="Hello World"/>

      </Container> 
    </main>
   );
}
