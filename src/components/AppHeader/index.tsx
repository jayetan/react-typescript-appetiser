import React, { ReactElement } from 'react';
import { AppBar, List, MenuItem, Toolbar, Typography } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';

import { useStyles } from './styles';
import { onLogout } from '../../api';

function AppHeader(): ReactElement {
  const classes = useStyles();
  const history = useHistory();

  const logout = () => {
    onLogout();
    history.push('/');
  }

  return (
    <AppBar elevation={1}>
      <Toolbar>
        <Typography
          color="inherit"
          component={Link}
          to="/dashboard"
          variant="h6"
          noWrap
          className={classes.brandName}
        >
          Appetiser
        </Typography>
        <div className={classes.spacer} />
        <List className={classes.inlineList}>
          <MenuItem onClick={logout}>Logout</MenuItem>
        </List>
      </Toolbar>
    </AppBar>
  );
}

export default AppHeader;
