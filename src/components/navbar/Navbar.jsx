import React,{useContext, useEffect,useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {Button,Menu,MenuItem,Popper,Grow,Paper,MenuList,ClickAwayListener} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SigninBtn from '../signin-btn';
import { UserContext } from '../../contexts/user';
import styles from './navbar.module.css'
import firebase from 'firebase'
import SignoutBtn from '../signout-btn/SignoutBtn';
import logo from './logo.png'
import {BrowserRouter as Router,Link} from "react-router-dom";
import { logout } from '../../services/auth';
import { useHistory } from "react-router-dom";
import twit from "../../assets/twitt.png"
import NotificationsIcon from '@material-ui/icons/Notifications';

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
  let history = useHistory();
  const classes = useStyles();

  const [user,setUser] = useContext(UserContext).user;
  const [open, setOpen] = React.useState(false);
  const [currentUser, setcurrentUser] = useState('');
  
  const anchorRef = React.useRef(null);


  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const signout=()=>{
    logout();
    setUser(null);
    history.push("/");
  }
  const handleClose = (event) => {
   

    setOpen(false);
    
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    // if (prevOpen.current === true && open === false) {
    //   anchorRef.current.focus();
    // }

    prevOpen.current = open;
  }, [open]);


  useEffect(() => {
   
    firebase.auth().onAuthStateChanged(user=>{
      if (user) {
          // store the user on local storage
          setUser(user)
          let currentUser = user.email.replace("@gmail.com", "");
          setcurrentUser(currentUser)
          
      } 
  })
  }, [user])

  console.log("usex",user)
  const userLocal = JSON.parse(localStorage.getItem('user'));
  console.log(userLocal)
  return (
    <Router>
    <div className={classes.root} >
      <AppBar position="static" style={{backgroundColor: "#4aa4ff"}} >
        <Toolbar>
          <a href="/"><img src={twit} style={{marginTop: "2px", width: "35px",color:"white"}}/></a>
          <Typography variant="h6" className={classes.title} >
           
          </Typography>
          {user ? (<div style={{display:"flex"}}>
      
     
      <div>
      <NotificationsIcon  style={{fontSize: 30,marginRight:"15px",marginBottom:"4px"}}/>
        <img   ref={anchorRef} className={styles.profileImg} src={user.photoURL}    onClick={handleToggle} />
        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                    <MenuItem ><a href={`/profile/${currentUser}`} style={{textDecoration:"none",}}>Profile</a></MenuItem>
         
                    <MenuItem onClick={()=>{
                      handleClose()
                      signout()
                    }}>Logout</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div> </div>):<Button variant="outlined" style={{background:"white",color:"#4aa4ff"}} ><a href="/signin">Sign in</a></Button> }
        </Toolbar>
        
      </AppBar>
    </div>
    </Router>
  );
}