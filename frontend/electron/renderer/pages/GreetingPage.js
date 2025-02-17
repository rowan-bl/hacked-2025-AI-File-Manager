import GreetingPrompt from "../components/GreetingPrompt";
import Box from "@mui/joy/Box";
import Container from "@mui/joy/Container";
import SortIcon from "@mui/icons-material/Sort";

export default function NextPage() {
  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          mb: 4,
          color: "primary.main",
        }}>
        <SortIcon />
        <h1>Next.js</h1>
      </Box>
      <Box>
        <p>
          This is another page in the Next.js app. It is rendered on the client
          side.
        </p>
      </Box>
      <GreetingPrompt />
    </Container>
  );
}
