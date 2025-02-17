import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Textarea from "@mui/joy/Textarea";

export default function GreetingPrompt({ prompt, setPrompt, handleSubmit }) {
  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(prompt);
  };

  return (
    <FormControl component="form" onSubmit={onSubmit}>
      <FormLabel>Enter Prompt</FormLabel>
      <Textarea
        className="textarea"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Type something here…"
        minRows={3}
        endDecorator={
          <Box
            sx={{
              display: "flex",
              gap: "var(--Textarea-paddingBlock)",
              pt: "var(--Textarea-paddingBlock)",
              borderTop: "1px solid",
              borderColor: "divider",
              flex: "auto",
            }}>
            <Button type="submit" sx={{ ml: "auto" }}>
              Send
            </Button>
          </Box>
        }
        sx={[
          {
            minWidth: 300,
            fontWeight: 400,
            backgroundColor: "#413F5D",
            color: "#FFFFFF",
          },
        ]}
      />
    </FormControl>
  );
}
