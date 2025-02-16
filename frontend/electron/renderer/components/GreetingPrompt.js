import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Textarea from "@mui/joy/Textarea";
import IconButton from "@mui/joy/IconButton";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import { useState } from "react"; // Add this import

export default function GreetingPrompt() {
  const [formInput, setformInput] = useState("");
  return (
    <FormControl>
      <FormLabel>Hello World</FormLabel>
      <Textarea
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
            <IconButton
              variant="plain"
              color="neutral"
              onClick={(event) => setformInput(event.currentTarget)}>
              <KeyboardArrowDown fontSize="md" />
            </IconButton>
            <Button sx={{ ml: "auto" }}>Send</Button>
          </Box>
        }
        sx={[
          {
            minWidth: 300,
            fontWeight: 400,
          },
        ]}
      />
    </FormControl>
  );
}
