import React, { useEffect } from 'react';
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
// import { makeStyles } from '@material-ui/core/styles';
import {Box, Grid, Paper, Typography, Button} from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import useStyles from './Home.css';
import Recents from '../recents/recents';
import { getTotal, getRecentOperations } from '../../redux/actions/operations-actions';

export default function Home() {
  const history = useHistory();
  const dispatch = useDispatch();
  const total = useSelector((state) => state.operations.total)
  const classes = useStyles();

  useEffect(() => {
    let user_id = localStorage.getItem('user_id');
    dispatch(getTotal(user_id))
    dispatch(getRecentOperations(user_id));
    console.log('Get total')
  }, [dispatch])

  return (
      <Box className={classes.gridContainer}>
          <Grid container 
            spacing={5} 
          >
            <Grid item xs={12} sm={12} md={5} >
              <Paper className={classes.paper}>
                  <Box className={classes.avbMoney}>
                    <Typography variant='body1' gutterBottom>Available money</Typography>
                    <Box component='span'>
                      <Typography variant='h3' > $ {total ? total : '0'} </Typography>
                      <ArrowForwardIosIcon />
                    </Box>
                    <Box>
                        <Button component={Link} to={'/income'} variant='contained' color='primary' className={classes.btnOperations}>
                          Deposit
                        </Button>
                        <Button component={Link} to={'/outcome'} variant='contained' color='primary' className={classes.btnOperations}>
                        Extract
                        </Button>
                    </Box>
                  </Box>            
              </Paper>
            </Grid>
            <Grid item xs={12} sm={12} md={7}>
              <Paper className={classes.paper}>
                <Recents key='recent' ></Recents>
              </Paper>
            </Grid>
          </Grid>
        </Box>
  );
}
