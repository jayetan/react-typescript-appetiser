import { createStyles, makeStyles, Theme } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      height: '100%',

      '& .MuiGrid-grid-sm-6': {
        minHeight: '100vh',
      },

      '& .featured, & .image': {
        height: '100%',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      },

      [theme.breakpoints.down('xs')]: {
        '& .MuiGrid-grid-sm-6:last-child': {
          position: 'absolute',
          width: '100%',
        },

        '& .form-container': {
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          padding: '20px 15px',
        }
      }
    },
    form : {
      maxWidth: '400px',
      padding: '0 15px',
      margin: '0 auto',
      marginTop: '20px',

      '& title': {
        fontWeight: 'bold',
      },

      '& .MuiFormControl-root.MuiTextField-root.MuiFormControl-marginNormal': {
        display: 'block',
      },

      '& .MuiInput-formControl': {
        width: '100%',
      },

      '& .button-groups': {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: '20px',
      },

      '& a': {
        textDecoration: 'none',
      },

      '& .errors': {
        display: 'flex',
        flexDirection: 'column',
      },

      '& .errors small': {
        color: 'red',
        padding: '5px 0',
      }
    },
  }),
);
