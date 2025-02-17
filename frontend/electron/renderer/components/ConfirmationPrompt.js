import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";

export default function ConfirmationPrompt({ socket }) {

  const handleConfirmYes = () => {
    const message = {
      type: "confirmation",
      confirm: true,
    };
    socket.send(JSON.stringify(message));
  };
  
  const handleConfirmNo = () => {
    const message = {
      type: "confirmation",
      confirm: false,
    };
    socket.send(JSON.stringify(message));
  };


  return (
    <div>
      <FormControl>
        <FormLabel>Make the changes to your file system</FormLabel>
        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            color="success"
            onClick={handleConfirmYes}
          >
            ✅
          </Button>

          <Button
            variant="contained"
            color="error"
            onClick={handleConfirmNo}
          >
            ❌
          </Button>
        </Stack>
      </FormControl>
    </div>
  );
}