import "./App.scss";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/User/Profile";
import Discussions from './components/Discussions/Discussions'
import DiscussionForm from './components/Discussions/DiscussionForm'


// Style
import { Container } from "react-bootstrap";

// Auth
import Signup from "./components/AuthForms/Signup";
import Login from "./components/AuthForms/Login";
import ForgotPassword from "./components/AuthForms/ForgotPassword";
import UpdateProfile from "./components/User/UpdateProfile";
import { AuthProvider } from "./Context/AuthContext";

// React Router
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./components/User/PrivateRoute";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <Container style={{ minHeight: "100vh" }}>
          <Switch>
            <PrivateRoute exact path="/profile" component={Profile} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route path="/forgot-password" component={ForgotPassword} />
            <PrivateRoute path="/update-profile" component={UpdateProfile} />
            <PrivateRoute path="/discuss" component={Discussions} />
            <PrivateRoute path="/add-discussion" component={DiscussionForm} />
          </Switch>
        </Container>
      </AuthProvider>
    </Router>
  );
}

export default App;
