import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  useRouteMatch,
  withRouter
} from "react-router-dom";
import confirm from "reactstrap-confirm";
import { Table, ButtonToggle, ButtonGroup } from 'reactstrap';

const List = ({ history }) => {
  const dispatch = useDispatch()
  let match = useRouteMatch();
  const store = useSelector(state => state.store);

  useEffect(() => {
    dispatch({type: 'store/fetch'})
  }, [])

  const {
    data 
  } = store;

  const onDelete = async (id) => {
    const result = await confirm({
      title: (
        <>
          Store# <strong>{id}</strong>
        </>
      ),
      message: "Are you sure you want to delete it?",
      confirmText: "Yes",
      confirmColor: "primary",
      cancelColor: "link text-danger"
    });

    if(result) {
      dispatch({type: 'store/delete', payload: id})
    }
  }

  const onEdit = (id) => {
    history.push(`/stores/edit/${id}/`)
  }


  const rows = useMemo(() => {
    return data.map(({id, name, street, zip_code, city, country}) =>
      <tr key={id}>
        <th scope="row">{id}</th>
        <td>{name}</td>
        <td>{street}</td>
        <td>{zip_code}</td>
        <td>{city}</td>
        <td>{country}</td>
        <td>---</td>
        <td>
      <ButtonGroup>
        <ButtonToggle color="primary" onClick={() => onEdit(id)}>Edit</ButtonToggle>
        <ButtonToggle color="danger" onClick={() => onDelete(id)}>Delete</ButtonToggle>
      </ButtonGroup>
      </td>
      </tr>)
  }, [data])

  return(
    <>
      <Table responsive>
      <thead>
        <tr>
          <th>#</th>
          <th>name</th>
          <th>street</th>
          <th>zip code</th>
          <th>city</th>
          <th>country</th>
          <th>products</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
      </Table>
    </>
  )
}

export default withRouter(List);
