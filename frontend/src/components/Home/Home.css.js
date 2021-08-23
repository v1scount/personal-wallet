import { makeStyles } from '@material-ui/core/styles';
// import {lightBlue, blue} from '@material-ui/core/colors';


const useStyles = makeStyles((theme) => ({
  gridContainer: {
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
    [theme.breakpoints.up('md')]: {
      width: '65vw',
    },
    [theme.breakpoints.up('lg')]: {
      width: '80vw',
    },
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: theme.palette.text.secondary,
  },
  avbMoney: {
    '& h3': {
      color: theme.palette.text.primary,
      marginBottom: '.5rem'
    },
    '& span': {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    '& div': {
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
    }
  },
  btnOperations: {
    margin: '.5rem'
  },
}));

export default useStyles;