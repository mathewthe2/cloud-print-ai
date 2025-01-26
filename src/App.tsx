import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import Index from "./pages";

function App() {
  return (
    <MantineProvider theme={{}}>
      <Index></Index>
    </MantineProvider>
  );
}

export default App;
