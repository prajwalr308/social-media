import React,{useContext, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SigninBtn from '../signin-btn';
import { UserContext } from '../../contexts/user';
import styles from './navbar.module.css'
import firebase from 'firebase'
import SignoutBtn from '../signout-btn/SignoutBtn';
import logo from './logo.png'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Navbar() {
  const classes = useStyles();

  const [user,setUser] = useContext(UserContext).user;
  useEffect(() => {
    firebase.auth().onAuthStateChanged(user=>{
      if (user) {
          // store the user on local storage
          setUser(user)
          
      } 
  })
  }, [])

  console.log("usex",user)
  const userLocal = JSON.parse(localStorage.getItem('user'));
  console.log(userLocal)
  return (
    <div className={classes.root} >
      <AppBar position="static" style={{backgroundColor: "#4aa4ff"}} >
        <Toolbar>
          <a herf="createpost"><img src={logo} style={{marginTop: "2px", width: "100px"}}></img></a>
          <Typography variant="h6" className={classes.title} >
           
          </Typography>
          {user ? (<div style={{display:"flex"}}><a href="profile"><img className={styles.profileImg} src={user.photoURL} /></a> </div>): (<SigninBtn />)}
        </Toolbar>
        
      </AppBar>
    </div>
  );
}