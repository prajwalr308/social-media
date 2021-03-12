import React,{useContext} from 'react';
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
  console.log("usex",user)
  
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
         
          </IconButton>
          <p>hello</p>
          <Typography variant="h6" className={classes.title} >
           
          </Typography>
          {user ? (<img className={styles.profileImg} src={user.photoURL} />): (<SigninBtn />)}
        </Toolbar>
      </AppBar>
    </div>
  );
}