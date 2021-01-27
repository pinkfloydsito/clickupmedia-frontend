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
  const product = useSelector(state => state.product);

  useEffect(() => {
    dispatch({type: 'product/fetch'})
  }, [])

  const {
    data 
  } = product;

  const onDelete = async (id) => {
    const result = await confirm({
      title: (
        <>
          product# <strong>{id}</strong>
        </>
      ),
      message: "Are you sure you want to delete it?",
      confirmText: "Yes",
      confirmColor: "primary",
      cancelColor: "link text-danger"
    });

    if(result) {
      dispatch({type: 'product/delete', payload: id})
    }
  }

  const onEdit = (id) => {
    history.push(`/products/edit/${id}/`)
  }


  const rows = useMemo(() => {
    return data.map(({id, name, size, price, color, category}) =>
      <tr key={id}>
        <th scope="row">{id}</th>
        <td>{name}</td>
        <td>{size}</td>
        <td>{price}</td>
        <td>{color}</td>
        <td>{category && category.name}</td>
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
          <th>size</th>
          <th>price</th>
          <th>color</th>
          <th>category</th>
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
