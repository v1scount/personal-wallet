import React, {useState} from 'react';
import { Typography, Container, Grid, Link, TextField, CssBaseline, Button, Avatar } from '@material-ui/core/';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from './signup.css';
import { connect } from "react-redux";
import { Link as RouterLink, useHistory } from 'react-router-dom';
import createUser from '../../redux/actions/user-actions'


function SignUp(props) {
  const history = useHistory();
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  })
  
  
  const classes = useStyles();

  // const preventDefault = (event) => event.preventDefault();

  const handleSubmit = (event) => {
    event.preventDefault();
    props.createUser(userData);
    setUserData({firstName: '',
    lastName: '',
    email: '',
    password: ''});
    history.push('/signin');
  }

  const handleChange = (event) => {
    setUserData({ ...userData, [event.target.name]: event.target.value });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                value={userData.firtsName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                value={userData.lastName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={userData.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={userData.password}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to='/signin' variant="body2" component={RouterLink}>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    createUser: (userData) => dispatch(createUser(userData)) 
  }
}

export default connect(null, mapDispatchToProps)(SignUp)