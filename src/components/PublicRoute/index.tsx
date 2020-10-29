import  React, { ReactElement } from  "react";
import { Route, Redirect } from  "react-router-dom";
import { isAuthenticated } from "../../api";

interface IProps {
  component: React.FC;
  path: string;
  exact?: boolean;
}

function PublicRoute(props: IProps): ReactElement {
  const { path, component, exact } = props;

  const isAuth = () => {
    return isAuthenticated();
  }

  return isAuth() ? (<Redirect to="/dashboard" />) :
    (<Route path={path} component={component} exact={exact} />);
};

export default PublicRoute;
