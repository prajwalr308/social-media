import React,{ createContext,useState } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    
  } from "react-router-dom";
import Profile from "../components/profile/Profile";
import Signin from "../pages/signin/Signin";

export const UserContext =createContext();
export const UserContextProvider = ({children})=>{
    const [user, setUser] = useState(null)
    return(
        <Router>
        <UserContext.Provider value={{user:[user,setUser]}}>
           
           
       <Switch>
          <Route path="/" exact>
          {children}
          
    
          </Route>
          <Route path="/profile" exact>
            <Profile user={user} />
          </Route>
          <Route path="/signin" exact>
            <Signin user={user} />
          </Route>
          
        </Switch>
     
   
        </UserContext.Provider>
        </Router>
    )
}