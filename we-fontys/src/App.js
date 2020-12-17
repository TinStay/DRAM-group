import "./App.scss";
import Navbar from "./components/Navbar/Navbar";
// Style
import { Container } from "react-bootstrap"; 

// Auth
import Signup from "./components/Auth/Signup";
import { AuthProvider } from "./Context/AuthContext";


function App() {
  return (
    <AuthProvider>
        <Navbar />
        <Container style={{ minHeight: "100vh" }}>
          <Signup />
        </Container>
    </AuthProvider>
  );
}

export default App;
