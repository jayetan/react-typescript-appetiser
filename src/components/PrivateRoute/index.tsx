import  React, { ReactElement } from  "react";
import { Route, Redirect } from  "react-router-dom";
import { isAuthenticated } from "../../api";

interface IProps {
  component: React.FC;
  path: string;
}

function PrivateRoute(props: IProps): ReactElement {
  const { path, component } = props;

  const isAuth = () => {
    return isAuthenticated();
  }

  return isAuth() ? (<Route path={path} component={component} />) :
    (<Redirect to="/" />);
};

export default PrivateRoute;
