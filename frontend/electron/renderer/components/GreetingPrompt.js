import Box from "@mui/material/Box";
// import Button from "@material-ui/Button";
// import Typography from "@material-ui/Typography";
//import TextareaAutosize from "@mui/material/TextareaAutosize";
//import exp from "constants";

export default function GreetingPrompt({ text }) {
  return (
    <Box
      sx={{
        borderRadius: 1,
        bgcolor: "#413F5D",
      }}>
      <h1>{text}</h1>
    </Box>
  );
}
