import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch,
  withRouter,
} from "react-router-dom";
import { Jumbotron, Button } from 'reactstrap';

import List from './list';
import Edit from './popupedit';

const Root = ({ history }) => {
  let match = useRouteMatch();
  const dispatch = useDispatch()

  const [open, setOpen] = useState(false)

  return(
    <>
      <Edit open={open} setOpen={setOpen}/>
    <div>
      <Jumbotron>
        <h1 className="display-0">Categories!</h1>
        <p className="lead">Management.</p>
        <hr className="my-2" />
        <p className="lead">
          <Button color="primary"onClick={() => {
            dispatch({type: 'category/clearfields'})
            setOpen(true)
          }} >New</Button>
        </p>
      </Jumbotron>
    </div>
      <Switch>
        <Route path={`${match.path}/list/`}>
          <List />
        </Route>
      </Switch>
    </>
  )
}

export default withRouter(Root);
