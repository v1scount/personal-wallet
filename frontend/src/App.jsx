import React, { useEffect } from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import AppNavBar from './components/AppNavBar/AppNavBar'
import AppDrawer from './components/AppDrawer/Drawer';
import Home from './components/Home/Home';
import SimpleCard from './components/Card';
import Income from './components/income/income'
import SignUp from './components/signup/signup';
import Login from './components/login/login';
import Outcome from './components/outcome/outcome'
import Profile from './components/profile/Profile';
import { useSelector, useDispatch } from 'react-redux';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { PublicRoute, PrivateRoute } from './helperRoutes';

const drawerWidth = 240;


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    paddingTop: '6rem',
    backgroundColor: '#EDEDED',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center'
  }
}));

function App(props) {
  const { window } = props;
  const classes = useStyles();
  const auth = useSelector((state) =>  state.users.isAuthenticated );
  const [mobileOpen, setMobileOpen] = React.useState(false);
  // const auth = localStorage.getItem('token')
  
  // useEffect(() => {
    
  // }, [])

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
      <BrowserRouter>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <div className={classes.root}>
            <CssBaseline />
            <AppNavBar  handleDrawerToggle={handleDrawerToggle}/>
            <AppDrawer  handleDrawerToggle={handleDrawerToggle} mobileOpen={mobileOpen} window={window}/>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Switch>  
                  <PrivateRoute exact path='/income' component={Income} auth={auth} />
                  <PrivateRoute path='/home' component={Home} auth={auth} />
                  <PrivateRoute exact path='/outcome' component={Outcome} auth={auth} />
                  <PrivateRoute exact path='/profile' component={Profile} auth={auth} />
                  <PublicRoute path='/signin' component={Login} />
                  <PublicRoute path='/signup' component={SignUp} />
                  <PublicRoute exact path='/' component={SimpleCard} />
                </Switch>
            </main>
          </div>
        </MuiPickersUtilsProvider>
      </BrowserRouter>
  );
}

export default App;
