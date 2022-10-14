import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
          margin: theme.spacing(1),
        },
    },
    paper: {
      padding: theme.spacing(2),
      borderRadius: '15px',
      boxShadow: '4px 6px 27px 13px rgba(0,0,0,0.72)',
      WebkitBoxShadow: '4px 6px 27px 13px rgba(0,0,0,0.72)',
      MozBoxShadow: '4px 6px 27px 13px rgba(0,0,0,0.72)',
    },
    form: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
    fileInput: {
      width: '97%',
      margin: '10px 0',
    },
    buttonSubmit: {
      marginBottom: 10,
    },
}));