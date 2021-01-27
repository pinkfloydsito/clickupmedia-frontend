import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  useRouteMatch,
  withRouter
} from "react-router-dom";
import confirm from "reactstrap-confirm";
import { Badge, Table, ButtonToggle, ButtonGroup } from 'reactstrap';
import Edit from './popupedit';

const List = ({ history }) => {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const [idSelected, setId] = useState(null)
  let match = useRouteMatch();
  const category = useSelector(state => state.category);

  useEffect(() => {
    dispatch({type: 'category/fetch'})
  }, [])

  const {
    data 
  } = category;

  const onDelete = async (id) => {
    const result = await confirm({
      title: (
        <>
          category# <strong>{id}</strong>
        </>
      ),
      message: "Are you sure you want to delete it?",
      confirmText: "Yes",
      confirmColor: "primary",
      cancelColor: "link text-danger"
    });

    if(result) {
      dispatch({type: 'category/delete', payload: id})
    }
  }

  const onEdit = (id) => {
    setOpen(true)
    setId(id)
  }

  const rows = useMemo(() => {
    return data.map(({id, name, keywords}) =>
      <tr key={id}>
        <th scope="row">{id}</th>
        <td>{name}</td>
        <td>{keywords.map(item => <Badge color="light" pill>{item.name}</Badge>)}</td>
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
      <Edit open={open} setOpen={setOpen} id={idSelected}/>
      <Table responsive>
      <thead>
        <tr>
          <th>#</th>
          <th>name</th>
          <th>keywords</th>
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
