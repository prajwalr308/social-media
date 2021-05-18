import React from 'react'
import CreatePost from '../../components/createPost'
import Feed from '../../components/feed/Feed.view'
import Floatingbtn from '../../components/floatingbtn/Floatingbtn'
import Navbar from '../../components/navbar'
import SigninBtn from '../../components/signin-btn'

const HomeView = () => {
  return (
    <div>
      <Navbar />
      <CreatePost />
      <Feed />
      <Floatingbtn />
      </div>
  )
}

export default HomeView
