import React from 'react'
import CreatePost from '../../components/createPost'
import Feed from '../../components/feed/Feed.view'
import Floatingbtn from '../../components/floatingbtn/Floatingbtn'
import Navbar from '../../components/navbar'

import SigninBtn from '../../components/signin-btn'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  
} from "react-router-dom";
import Profile from '../profile/Profile'

const HomeView = () => {
  return (
    <div>
        <Router>
      <Switch>
          <Route path="/" exact>
          <Navbar />
      <CreatePost />
      <Feed />
      <Floatingbtn />
          </Route>
          <Route path="/profile" exact>
            <Profile />
          </Route>
          
        </Switch>

    </Router>

      </div>
  )
}

export default HomeView
