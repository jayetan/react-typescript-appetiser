import React, { ReactElement, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { verifyToken } from '../../api';
import AppHeader from '../../components/AppHeader';
import { useStyles } from './styles';

function Dashboard(): ReactElement {
  const history = useHistory();
  const classes = useStyles();

  const privateRoute = async () => {
    const isVerified = await verifyToken();

    if ( !isVerified ) {
      history.push('/');
    }
  }

  useEffect(() => {
    privateRoute();
  });

  return (
    <div className="container">
      <AppHeader />

      <div className="message">
        <h1 className={classes.header}>Login successful</h1>
      </div>
    </div>
  );
}

export default Dashboard;