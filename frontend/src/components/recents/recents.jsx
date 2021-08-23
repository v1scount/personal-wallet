import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { List, ListItem, ListItemText, Typography, makeStyles, Divider } from '@material-ui/core'
import RestaurantIcon from '@material-ui/icons/Restaurant';
import PaymentIcon from '@material-ui/icons/Payment';
import LocalBarIcon from '@material-ui/icons/LocalBar';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles((theme) => ({
  list: {
    width: '100%'
  },
  subheader: {
    color: theme.palette.text.primary,
    marginBottom: '1rem'
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },  
}))

const Recents = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const recents = useSelector((state) => state.operations.recentOperations);
  
  useEffect(() => {
    let user_id = localStorage.getItem('user_id');
    // dispatch(getRecentOperations(user_id));
  }, [dispatch])
  
  return(
    <List className = {classes.list}>
      <Typography variant='h5' className={classes.subheader}>Actividad reciente</Typography>
      {
        recents.map((recent, i) => {
          switch (recent.type) {
            case 'income':{
              return (
                <ListItem  className={classes.item} key={recent.id} divider>
                  <PaymentIcon className={classes.icon} color='primary' />
                  <Typography color='textPrimary' className={classes.recentType} variant='h6'>{` ${recent.Category.name} `}</Typography>
                  <Typography color='textPrimary' className={classes.amount} variant='h6'>
                    {`$ ${recent.amount}`}
                  </Typography>
                  <EditIcon color='primary' />
                </ListItem>
              )
            }
            case 'outcome':{
              // console.log(recent.Category.name)
              switch(recent.Category.name) {
                case 'Delivery': {
                  return (
                    <ListItem  className={classes.item} key={recent.id} divider>
                      <FastfoodIcon className={classes.icon} color='primary' />
                      <Typography color='textPrimary' className={classes.recentType} variant='h6'>{` ${recent.Category.name} `}</Typography>
                      <Typography color='textPrimary' className={classes.amount} variant='h6'>
                        {` - $ ${recent.amount}`}
                      </Typography>
                      <EditIcon color='primary' />
                    </ListItem>
                  )
                }
                case 'Restaurant': {
                  return (
                    <ListItem  className={classes.item} key={recent.id} divider>
                      <RestaurantIcon className={classes.icon} color='primary' />
                      <Typography color='textPrimary' className={classes.recentType} variant='h6'>{` ${recent.Category.name} `}</Typography>
                      <Typography color='textPrimary' className={classes.amount} variant='h6'>
                        {` - $ ${recent.amount}`}
                      </Typography>
                      <EditIcon color='primary' />
                    </ListItem>
                  )
                }
                case 'Drinks': {
                  return (
                    <ListItem  className={classes.item} key={recent.id} divider>
                      <LocalBarIcon className={classes.icon} color='primary' />
                      <Typography color='textPrimary' className={classes.recentType} variant='h6'>{` ${recent.Category.name} `}</Typography>
                      <Typography color='textPrimary' className={classes.amount} variant='h6'>
                      {` - $ ${recent.amount}`}
                      </Typography>
                      <EditIcon color='primary' />
                    </ListItem>
                  )
                }
                default:{
                    return (
                    <ListItem  className={classes.item} key={recent.id} divider>
                      <ImportExportIcon className={classes.icon} color='primary' />
                      <Typography color='textPrimary' className={classes.recentType} variant='h6'>{` ${recent.Category.name} `}</Typography>
                      <Typography color='textPrimary' className={classes.amount} variant='h6'>
                      {` - $ ${recent.amount}`}
                      </Typography>
                      <EditIcon color='primary' />
                  </ListItem> 
                  )
                }
              }
            }
            default: 
              return (
                <ListItem  className={classes.item} key={recent.id} divider>
                  <PaymentIcon className={classes.icon} color='primary' />
                  <Typography color='textPrimary' className={classes.recentType} variant='h6'>{` ${recent.Category.name} `}</Typography>
                  <Typography color='textPrimary' className={classes.amount} variant='h6'>
                    {`$ ${recent.amount}`}
                  </Typography>
                  <EditIcon color='primary' />
                </ListItem>
              )
        }
      }   
      )
}
    </List>
  )}
export default Recents;