import React from 'react';
// import PropTypes from 'prop-types';
import { useHistory, Link } from 'react-router-dom';
import { Divider, Drawer, Hidden, List, ListItem, ListItemText, ListItemAvatar, Avatar} from '@material-ui/core'
// import MailIcon from '@material-ui/icons/Mail';
// import InboxIcon from '@material-ui/icons/MoveToInbox';
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import CategoryIcon from '@material-ui/icons/Category';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { connect, useSelector, useDispatch } from "react-redux";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {signOut} from '../../redux/actions/user-actions'


const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.grey[800],
  }
}));

export default function AppDrawer ({window,handleDrawerToggle, mobileOpen, ...props }) {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isAuthenticated = useSelector((state) =>  state.users.isAuthenticated );
  // const isAuthenticated = false;

  // Functions
  
  function handleSignOut(event) {
    event.preventDefault();
    dispatch(signOut());
    history.push('/signin');
  }
  
  const drawerUnauthenticated = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        <Link to='/signin' className={classes.link} >
          <ListItem button>
              <ListItemAvatar>
                <Avatar>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary='Sign in' />
          </ListItem>    
        </Link>
        <Link to='signup' className={classes.link} >
          <ListItem button>
              <ListItemAvatar>
                <Avatar>
                  <PersonAddIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary='Sign up' />
          </ListItem>    
        </Link>
      </List>
      <Divider />
    </div>
  );
  const drawerAuthenticated = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        <Link to='/home' className={classes.link} >
          <ListItem id="home">
              <ListItemAvatar>
                <Avatar>
                  <HomeIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary='Home' />
          </ListItem>  
        </Link>
        <Link to='/profile' className={classes.link} >
          <ListItem button id="profile">
            <ListItemAvatar>
              <Avatar>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary='My profile' />
          </ListItem>
        </Link>
        <Link to='/categories' className={classes.link} >
          <ListItem button id="categories">
              <ListItemAvatar>
                <Avatar>
                  <CategoryIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary='Categories' />
          </ListItem>
        </Link>
        <Link to='/signin' className={classes.link} >
          <ListItem button id="sign-out" onClick={handleSignOut}>
              <ListItemAvatar>
                <Avatar>
                  <ExitToAppIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary='Sign out' />
          </ListItem>    
        </Link>
      </List>
    </div>
  );
  const container = window !== undefined ? () => window().document.body : undefined;

  if(isAuthenticated) {
    return(
      <nav className={classes.drawer} aria-label="mailbox folders">
          <Hidden smUp implementation="css">
            <Drawer
              container={container}
              variant="temporary"
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              {drawerAuthenticated}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              {drawerAuthenticated}
            </Drawer>
          </Hidden>
        </nav>
  )
  } else {
    return(
      <nav className={classes.drawer} aria-label="mailbox folders">
          <Hidden smUp implementation="css">
            <Drawer
              container={container}
              variant="temporary"
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              {drawerUnauthenticated}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              {drawerUnauthenticated}
            </Drawer>
          </Hidden>
        </nav>
  )
  }
}

// function mapStateToProps (state) {
//   return {
//     isAuthenticated: state.users.isAuthenticated
//   }
// }

// export default connect(mapStateToProps, null)(AppDrawer);