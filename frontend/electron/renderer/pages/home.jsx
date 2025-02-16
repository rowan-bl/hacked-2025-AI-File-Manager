import { useState } from 'react';
import { Button, Container, Typography, TextField, Box, CircularProgress } from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';

const Home = () => {
  const [selectedDirectory, setSelectedDirectory] = useState(null);
  const [prompt, setPrompt] = useState('');
  const [aiResponse, setAiResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]); // Store { prompt, response } pairs

  const handleChooseDirectory = async () => {
    if (window.electron && window.electron.openDirectory) {
      const directory = await window.electron.openDirectory();
      if (directory) {
        setSelectedDirectory(directory);
      }
    }
  };



  const handleSubmitPrompt = () => {
    if (!prompt.trim()) return; // Ignore empty prompts
    setLoading(true);
    setAiResponse(null);

    // Fake AI response delay
    setTimeout(() => {
      const fakeResponses = [
        "This is a sample AI-generated response.",
        "AI has analyzed your input and here's the result.",
        "Your request has been processed, and this is the output.",
      ];

      const response = fakeResponses[Math.floor(Math.random() * fakeResponses.length)];
      setAiResponse(response);


      // Append the new prompt-response pair
      setHistory((prevHistory) => [...prevHistory, { prompt, response }]);

      setLoading(false);
      console.log("History:", history);
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
      {/* Folder icon and directory name */}
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

      {/* Choose Directory Button */}
      {!selectedDirectory && (
        <Button variant="contained" color="primary" onClick={handleChooseDirectory}>
          Choose Directory
        </Button>
      )}

      {/* AI Response Box */}
      {selectedDirectory && (
        <Box
          sx={{
            position: 'absolute',
            bottom: '120px',
            right: '20px',
            backgroundColor: '#f5f5f5',
            padding: '10px',
            borderRadius: '8px',
            minWidth: '250px',
            textAlign: 'left',
            boxShadow: 3,
            margin: '1.5rem',
            maxHeight: '200px',
            overflowY: 'auto',
          }}
        >
          {loading ? (
            <CircularProgress size={20} />
          ) : (
            <>
              <Typography variant="body1" sx={{ fontSize: '1rem', color: '#333' }}>
                {aiResponse || "Waiting for input..."}
              </Typography>
              <hr />
              {/* Display previous responses */}
              {history.map((entry, index) => (
                <Box key={index} sx={{ marginTop: 1 }}>
                  <Typography variant="caption" sx={{ fontWeight: 'bold' }}>
                    {entry.prompt}:
                  </Typography>
                  <Typography variant="caption">{entry.response}</Typography>
                </Box>
              ))}
            </>
          )}
        </Box>
      )}

      {/* Prompt Input Bar */}
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
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Enter your prompt..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            sx={{ backgroundColor: 'white', borderRadius: '4px' }}
          />
          <Button variant="contained" color="primary" onClick={handleSubmitPrompt}>
            Submit
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default Home;
