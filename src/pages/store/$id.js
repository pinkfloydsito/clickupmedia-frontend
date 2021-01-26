import React from 'react';
import {
  useRouteMatch,
} from "react-router-dom";

const Edit = () => {
  let match = useRouteMatch();
  console.info(match)
  return(<div>Edit</div>)
}

export default Edit;
