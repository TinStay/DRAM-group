import "./App.scss";
import Navbar from "./components/Navbar/Navbar";

// Style
import { Container } from "react-bootstrap";

// Auth
import Signup from "./components/Auth/Signup";

function App() {
  return (
    <div class="">
      <Navbar />
      <Container style={{minHeight: "100vh"}}> 
        <Signup />
      </Container>
    </div>
  );
}

export default App;
