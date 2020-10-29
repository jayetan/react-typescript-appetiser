import React, { ReactElement } from 'react';
import { Button, Container, Typography } from '@material-ui/core';

import Image404 from '../../assets/images/404-background.jpg';
import { useStyles } from './styles';
import { Link } from 'react-router-dom';

function NotFound(): ReactElement {
  const classes = useStyles();

  return (
    <div className={classes.root} style={{backgroundImage: `url(${Image404})`}}>
      <Container className={classes.container}>
        <Typography variant="h4">
          Where did it go?
        </Typography>
        <Typography variant="subtitle1">
          We couldn’t find what you were looking for.
        </Typography>
        <Typography variant="subtitle1">
          You can go back to previous page.
        </Typography>
        <Link to="/">
          <Button variant="contained" color="primary">Back</Button>
        </Link>
      </Container>
    </div>
  );
}

export default NotFound;