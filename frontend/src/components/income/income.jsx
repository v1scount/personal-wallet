import "date-fns";
import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  MenuItem,
  InputAdornment,
  InputLabel,
  FormControl,
  OutlinedInput,
  Select,
  Button,
} from "@material-ui/core";
import useStyles from './income.css'
import { KeyboardDatePicker } from "@material-ui/pickers";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import {getIncomeCategories} from '../../redux/actions/categories-actions';
import {createIncome, getTotal} from '../../redux/actions/operations-actions';



export default function Income() {
  const history = useHistory();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const incomeCategories = useSelector((state) => state.categories.incomeCategories)
  // const [categories, setCategories] = useState([]);
  const [incomeData, setIncomeData] = useState({
    amount: '',
    date: selectedDate,
    CategoryId: "",
    description: "",
    type: 'income',
    UserId: localStorage.getItem('user_id')
  });


  const dispatch = useDispatch()
  const classes = useStyles();
  
  // Gets income categories to display in selector
  useEffect(() => {
    dispatch(getIncomeCategories());
  }, [dispatch, history]);

  // Used to handle the user selection in the various fields
  const handleChange = (event) => {
      setIncomeData({ ...incomeData, [event.target.name]: event.target.value });
  };

  // Handler for category selector
  const handleCategory = (event) => {
    console.log(event)
    setIncomeData({...incomeData, CategoryId: event.target.value});
    console.log(incomeData)
  }

  // Individual handler for date
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  // Submits the operation to database
  const handleSubmit = (event) => {
    event.preventDefault();
    if(incomeData.amount && incomeData.date && incomeData.CategoryId) {
      dispatch(createIncome(incomeData));
      dispatch(getTotal(localStorage.getItem('user_id')))
      history.push('/home');
      console.log(incomeData)
    } else {
      console.log(incomeData)
    }
    
  }

  return (
    <Box className={classes.root}>
      <Typography variant="h5" className={classes.header}>
        Income details
      </Typography>
      <Paper className={classes.paper}>
        <form className={classes.form} onSubmit={handleSubmit}>
          <FormControl fullWidth className={classes.margin} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              value={incomeData.amount}
              placeholder="0"
              type='number'
              name='amount'
              onChange={handleChange}
              startAdornment={
                <InputAdornment position={classes.inputLabel}>$</InputAdornment>
              }
              labelWidth={60}
            />
          </FormControl>
          <KeyboardDatePicker
            disableToolbar
            disableFuture
            // name='date'
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            id="date-picker-inline"
            label="Pick a date"
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
            fullWidth
          />
          <FormControl fullWidth>
            <InputLabel htmlFor="outlined-adornment-type">Category</InputLabel>
            <Select
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              name='category'
              value={incomeData.CategoryId}
              onChange={handleCategory}
              className={classes.type}
            >
              {/* Map the categories obtained from store and creates a item from selector*/}
              { incomeCategories.map(category => {
                return <MenuItem value={category.id} key={category.id } >{category.name}</MenuItem>  
              })}
            </Select>
          </FormControl>
          <TextField
            id="outlined-multiline-static"
            label="Add a description"
            multiline
            rows={4}
            name='description'
            defaultValue="..."
            variant="outlined"
            // onChange={handleChange("description")}
            fullWidth
          />
          <Button variant="contained" color="primary" type='submit' className={classes.btn} onClick={handleSubmit}>
            CONFIRM
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
