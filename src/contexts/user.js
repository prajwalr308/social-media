import React,{ createContext,useState } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    
  } from "react-router-dom";
import Profile from "../pages/profile/Profile";
import Signin from "../pages/signin/Signin";
import Tempsignin from "../pages/tempSignin/Tempsignin";

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
          <Route path="/profile/:id" exact>
            <Profile user={user} />
          </Route>
          <Route path="/signin" exact>
            {/* <Signin user={user} /> */}
            <Tempsignin signIn={{user}} />
          </Route>
          
        </Switch>
     
   
        </UserContext.Provider>
        </Router>
    )
}