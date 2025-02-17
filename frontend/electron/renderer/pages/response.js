import UserBubble from '../components/userbubble';
import { Container } from '@mui/material';
import { List } from '@mui/material';
import { ListItem } from '@mui/material';

export default function NextPage() {

  

  return (
    <main>
   
      const chatInterface = () => {
        const[messages, setMessages] = useState([])
        const[input, setInput] = useState("")         
      }

      

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
