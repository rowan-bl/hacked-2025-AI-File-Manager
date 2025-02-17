import { Container } from "@mui/material";
import { List } from "@mui/material";
import { ListItem } from "@mui/material";

import UserBubble from "../components/UserBubble";
import AIBubble from "../components/AIBubble";

export default function NextPage() {
  return (
    <main>
      <div className="flex content-center">
        <Container
          sx={{
            overflowY: "auto",
            maxHeight: "80%",
            width: "80%",
          }}>
          <UserBubble content="Hello World" />

          <AIBubble content="Nuh Uh" />
        </Container>
      </div>
    </main>
  );
}
