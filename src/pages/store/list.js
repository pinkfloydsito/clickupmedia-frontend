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

const List = () => {
  let match = useRouteMatch();

  return(
    <>
      <h2>Stores</h2>
      <Switch>
        <Route path={`${match.path}/edit/:id`}>
          <Edit />
        </Route>
      </Switch>
    </>
  )
}

export default List;
