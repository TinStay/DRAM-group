import "./App.scss";
import Navbar from "./components/Navbar/Navbar";
import Homepage from './components/Home/Homepage';
import Profile from "./components/User/Profile";
import Discussions from './components/Discussions/Discussions'
import DiscussionForm from './components/Discussions/DiscussionForm'
import DiscussionDetail from './components/Discussions/DiscussionDetail/DiscussionDetail'
import Footer from './components/Footer/Footer'

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
        <Container style={{ minHeight: "100vh", minWidth: "80vw"}}>
          <Switch>
            <Route path="/" exact component={Homepage} />
            <PrivateRoute exact path="/profile/:id" component={Profile} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route path="/forgot-password" component={ForgotPassword} />
            <PrivateRoute path="/profile/:id/update-profile" component={UpdateProfile} />
            <PrivateRoute path="/discuss" component={Discussions} />
            <PrivateRoute path="/add-discussion" component={DiscussionForm} />
            <PrivateRoute path="/discussion/:id" component={DiscussionDetail} />
          </Switch>
        </Container>
        <Footer />
      </AuthProvider>
    </Router>
  );
}

export default App;
