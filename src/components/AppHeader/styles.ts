import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => createStyles({
  brandName: {
    textDecoration: 'none',
  },
  spacer: {
    flexGrow: 1,
  },
  inlineList: {
    display: 'flex',
  },
}));
