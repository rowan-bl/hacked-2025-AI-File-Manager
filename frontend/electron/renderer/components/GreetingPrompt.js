import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Textarea from "@mui/joy/Textarea";
import { useState } from "react";

export default function GreetingPrompt() {
  const [formInput, setFormInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submitted:", formInput);
  };

  return (
    <FormControl component="form" onSubmit={handleSubmit}>
      <FormLabel>Hello World</FormLabel>
      <Textarea
        className="textarea"
        value={formInput}
        onChange={(e) => setFormInput(e.target.value)}
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
