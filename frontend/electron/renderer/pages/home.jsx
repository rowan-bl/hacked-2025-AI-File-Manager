import { useState } from 'react';
import { Button, Container, Typography, TextField, Box, CircularProgress } from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import GreetingPrompt from '../components/GreetingPrompt';

const Home = () => {
  const [selectedDirectory, setSelectedDirectory] = useState(null);
  const [prompt, setPrompt] = useState('');
  const [aiResponse, setAiResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]); // Static messages

  const handleChooseDirectory = async () => {
    if (window.electron && window.electron.openDirectory) {
      const directory = await window.electron.openDirectory();
      if (directory) {
        setSelectedDirectory(directory);
      }
    }
  };

  const handleSubmitPrompt = () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setAiResponse(null);
    
    // Simulate AI response
    setTimeout(() => {
      const fakeResponses = [
        "This is a sample AI-generated response.",
        "AI has analyzed your input and here's the result.",
        "Your request has been processed, and this is the output.",
      ];
  
      const response = fakeResponses[Math.floor(Math.random() * fakeResponses.length)];
      
      // Only update history AFTER response is generated
      setHistory((prevHistory) => [...prevHistory, { prompt, response }]);
  
      setAiResponse(response);
      setLoading(false);
    }, 1500);
  };
  

  return (
    <Container
      sx={{
        textAlign: 'center',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* Folder Selection */}
      {selectedDirectory && (
        <Box
          sx={{
            position: 'absolute',
            top: 20,
            left: 20,
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <FolderIcon color="primary" onClick={handleChooseDirectory} />
          <Typography variant="h6" sx={{ maxWidth: 300, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {selectedDirectory}
          </Typography>
        </Box>
      )}

      {!selectedDirectory && (
        <Button variant="contained" color="primary" onClick={handleChooseDirectory}>
          Choose Directory
        </Button>
      )}

      {/* AI Response Section */}
      {selectedDirectory && (
        <Box
          sx={{width:'100%', marginTop: '1rem'}}
      >
        {/* Static History */}
        {history.map((entry, index) => (
          <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0',display: 'block' }}>
             <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#fff', flex: 1, textAlign: 'right', marginRight:'0' }}>
              {entry.prompt}
            </Typography>
            <Typography variant="body2" sx={{ flex: 1, textAlign: 'left', color: '#dddddd', display: 'block', marginLeft:'0'}}>
              {entry.response}
            </Typography>
          </Box>
        ))}
      </Box>
      )}
      {selectedDirectory && (
        <Box
          sx={{
            position: 'absolute',
            bottom: 20,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '60%',
            display: 'flex',
            gap: 1,
          }}
        >
          <GreetingPrompt prompt={prompt} setPrompt={setPrompt} handleSubmit={handleSubmitPrompt} />
        </Box>
      )}
    </Container>
  );
};

export default Home;
