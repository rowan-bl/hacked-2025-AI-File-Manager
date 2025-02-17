import { Box } from "@mui/material";
import { Container } from "@mui/material";

export default function UserBubble({ content }) {
  return (
    <Container
      sx={{
        overflowY: "auto",
        alignContent: "center",
        display: "flex",
        justifyContent: "flex-end",
        mb: 2,
      }}>
      <Box
        sx={{
          overflowY: "auto",
          maxHeight: "50%",
          maxWidth: "80%",
          py: 2,
          px: 3,
          borderRadius: 7,
          bgcolor: "#413F5D",
          textAlign: "left",
        }}>
        <p>{content}</p>
      </Box>
    </Container>
  );
}
