import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";

const CrudRoute = ({ create, edit, remove, list }) => {
  const match = useRouteMatch();

  const crudRoute = (
    <Switch>
      <Route path={`${match.path}/edit/:id`} component={edit} />
      <Route path={`${match.path}/list`} component={list} />
    </Switch>
  );

  return crudRoute;
};

export default CrudRoute;
