
import './App.css';
import { UserContextProvider } from './contexts/user';
import Home from './pages/home';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  
} from "react-router-dom";
import Profile from './components/profile/Profile';

function App() {
  return (
    <UserContextProvider>
        
    <div className="App">
     <Home />
    </div>
    </UserContextProvider>
   
  );
}

export default App;
