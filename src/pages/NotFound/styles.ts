import { createStyles, makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flexGrow: 1,
      height: '100%',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
    },
    container: {
      textAlign: 'center',
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',

      '& a': {
        textDecoration: 'none',
      }
    }
  }),
);
