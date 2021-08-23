import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
    [theme.breakpoints.up("md")]: {
      width: "65vw",
    },
    [theme.breakpoints.up("lg")]: {
      width: "80vw",
    },
    // color: theme.palette.text.secondary,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  header: {
    color: theme.palette.text.primary,
    marginBottom: "1rem",
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
    [theme.breakpoints.up("md")]: {
      width: "65vw",
    },
    [theme.breakpoints.up("lg")]: {
      width: "36vw",
    },
  },

  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minWidth: "75%",
    padding: theme.spacing(2),
  },
  type: {
    marginBottom: "1.75rem",
  },
  btn: {
    width: "32%",
    marginTop: "1rem  ",
  },
}));

export default useStyles;