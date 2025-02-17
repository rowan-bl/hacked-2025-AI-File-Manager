import { useState } from "react";
import {
  Button,
  Container,
  Typography,
  TextField,
  Box,
  CircularProgress,
} from "@mui/material";
import FolderIcon from "@mui/icons-material/Folder";
import GreetingPrompt from "../components/GreetingPrompt";
import AIBubble from "../components/AIBubble";
import UserBubble from "../components/UserBubble";

const Home = () => {
  const [ws, setWs] = useState(null);
  const [selectedDirectory, setSelectedDirectory] = useState(null);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8001"); // Replace with your WebSocket server URL

    socket.onopen = () => {
      console.log("WebSocket Connected");
      setWs(socket);
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        if (!data.answer || !data.description) {
          throw new Error("Invalid response format");
        }

        setHistory((prevHistory) => [
          ...prevHistory,
          { prompt, response: data.description, changed_dir: data.answer },
        ]);
        setError(null);
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
        setError("Invalid response from server.");
      } finally {
        setLoading(false);
      }
    };

    socket.onerror = (error) => {
      console.error("WebSocket Error:", error);
      setError("WebSocket encountered an error.");
    };

    socket.onclose = () => {
      console.log("WebSocket Disconnected");
    };

    return () => {
      socket.close();
    };
  }, []);

  const handleChooseDirectory = async () => {
    if (window.electron && window.electron.openDirectory) {
      const directory = await window.electron.openDirectory();
      if (directory) {
        setSelectedDirectory(directory);
      }
    }
  };

  const handleSubmitPrompt = () => {
    if (!prompt.trim() || !ws || ws.readyState !== WebSocket.OPEN) {
      setError("WebSocket is not connected.");
      return;
    }

    setLoading(true);
    setError(null);

    const message = JSON.stringify({
      prompt: prompt,
      root_dir: selectedDirectory,
    });
    ws.send(message);

    // Fallback timeout if no response arrives
    setTimeout(() => {
      if (loading) {
        setLoading(false);
        setError("Server did not respond in time.");
      }
    }, 5000); // Timeout after 5 seconds
  };

  return (
    <Container
      sx={{
        textAlign: "center",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}>
      {/* Folder Selection */}
      {selectedDirectory && (
        <Box
          sx={{
            position: "absolute",
            top: 20,
            left: 20,
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}>
          <FolderIcon color="primary" onClick={handleChooseDirectory} />
          <Typography
            variant="h6"
            sx={{
              maxWidth: 300,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}>
            {selectedDirectory}
          </Typography>
        </Box>
      )}

      {!selectedDirectory && (
        <Button
          variant="contained"
          color="primary"
          onClick={handleChooseDirectory}>
          Choose Directory
        </Button>
      )}

      {/* Chat History */}
      {selectedDirectory && (
        <Box sx={{ width: "100%", marginTop: "1rem" }}>
          {history.map((entry, index) => (
            <Box key={index} sx={{ display: "block", padding: "5px 0" }}>
              <UserBubble content={entry.prompt} />
              <AIBubble content={entry.response} />
            </Box>
          ))}
        </Box>
      )}

      {/* Error Message */}
      {error && (
        <Typography variant="body2" sx={{ color: "red", marginTop: "10px" }}>
          {error}
        </Typography>
      )}
      {selectedDirectory && (
        <Box
          sx={{
            position: "absolute",
            bottom: 20,
            left: "50%",
            transform: "translateX(-50%)",
            width: "60%",
            display: "flex",
            gap: 1,
          }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Enter your prompt..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            sx={{ backgroundColor: "white", borderRadius: "4px" }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmitPrompt}>
            Submit
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default Home;
