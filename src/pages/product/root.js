import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
  withRouter,
} from "react-router-dom";
import { Jumbotron, Button } from 'reactstrap';

import Edit from './$id';
import List from './list';

const Root = ({ history }) => {
  let match = useRouteMatch();
  return(
    <>
    <div>
      <Jumbotron>
        <h1 className="display-0">Products!</h1>
        <p className="lead">Management.</p>
        <hr className="my-2" />
        <p className="lead">
          <Button color="primary"onClick={() => {
            history.push(`${match.path}/new/`)
          }} >New</Button>
        </p>
      </Jumbotron>
    </div>
      <Switch>
        <Route path={`${match.path}/new`}>
          <Edit />
        </Route>
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

export default withRouter(Root);
