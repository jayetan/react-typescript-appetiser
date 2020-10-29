import React, { ReactElement, ReactNode } from 'react';
import { Button, Grid, Typography } from '@material-ui/core';

import { useStyles } from './styles';
import featuredImage from '../../assets/images/featured.jpg';
import { Link } from 'react-router-dom';

interface IProps {
  title: string;
  children: ReactNode;
  errors?: string[];
  buttonOneName: string;
  buttonTwoName: string;
  buttonLink: string;
  buttonAction: () => void;
}

function AuthContainer(props: IProps): ReactElement {
  const { buttonAction, buttonLink, buttonOneName, buttonTwoName, children, errors, title } = props;
  const classes = useStyles();

  const renderErrors = errors?.map(error => <small key={error}>{error}</small>);

  return (
    <div className={classes.root}>
      <Grid container spacing={0}>
        <Grid item xs={12} sm={6}>
          <div className="featured">
            <div className="image" style={{backgroundImage: `url(${featuredImage})`}}></div>
          </div>
        </Grid>
        <Grid item xs={12} sm={6}>
          <div className={classes.form}>
            <div className="form-container">
              <Typography className="title" variant="h5" color="primary">Appetiser App</Typography>
              <Typography className="title" variant="h3">{ title }</Typography>

              {children}

              <div className="button-groups">
                <Link to={buttonLink}>
                  <Button variant="outlined">{buttonOneName}</Button>
                </Link>
                <Button variant="contained" color="primary" onClick={buttonAction}>
                  {buttonTwoName}
                </Button>
              </div>

              <div className="errors">
                {renderErrors}
              </div>
            </div>
          </div>

        </Grid>
      </Grid>
    </div>
  );
}

export default AuthContainer;
