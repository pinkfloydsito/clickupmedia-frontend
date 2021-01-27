import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";

import Edit from './$id';
import List from './list';

const Root = () => {
  let match = useRouteMatch();

  return(
    <>
      <h2>Stores</h2>
      <Switch>
        <Route path={`${match.path}/edit/:id`}>
          <Edit />
        </Route>
        <Route path={`${match.path}/list/`}>
          <List />
        </Route>
      </Switch>
    </>
  )
}

export default Root;
