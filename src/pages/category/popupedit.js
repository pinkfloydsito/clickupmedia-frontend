import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { ButtonToggle, FormFeedback, Form, FormGroup, Label, Input, Spinner } from 'reactstrap';
import CreatableSelect from 'react-select/creatable';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import {
  useRouteMatch,
  withRouter,
} from "react-router-dom";
import { useFormik } from 'formik';

const Edit = ({ history, open, setOpen, id }) => {
  const dispatch = useDispatch()
  let match = useRouteMatch();
  const formEl = useRef(null);
  const category = useSelector(state => state.category);

  const [ selectedKeywords, setSelectedKeywords ] = useState([])
  useEffect(() => {
    if(id && open === true) {
      dispatch({type: 'category/fetchfields', payload: { id }})
    }
  }, [id, dispatch, open])

  useEffect(() => {
    dispatch({type: 'category/fetchkeywords', payload: { id }})
  }, [])

  const {
    loading,
    keywords,
    fields : {
      name, keywords: keywords_attributes,
    }
  } = category;

  useEffect(() => {
    setSelectedKeywords(keywords_attributes.map(item => ({value: item.name, label: item.name})))
  }, [keywords_attributes])


  const handleSubmit = (values) => {
    dispatch({type: 'category/submitfields', push: history.push, payload: {...values, id}})
    setOpen(false)
  };

  const handleChangeOptions = useCallback((value) => {
    setSelectedKeywords(value)
  }, [setSelectedKeywords])

  const validationSchema = Yup.object().shape({
    name: Yup.mixed().required('Name is required!'),
  })

  const keywordsOptions = keywords.map((item) => ({value: item.name, label: item.name}))

 const formik = useFormik({
   enableReinitialize: true,
   validationSchema,
    initialValues: {
      id,
      name,
    },
    onSubmit: values => {
      formik.resetForm()
      console.info(selectedKeywords)
      handleSubmit({...values, keywords_attributes: selectedKeywords.map((item) => ({id: item.value}))}
                  )},
  });

  const handleReset = useCallback(() => {
    setOpen(false)
    formik.handleReset()
    formEl.current.reset()
    dispatch({type: 'category/clearfields'})
  }, [formik, formEl, dispatch]);

  return (
    <div>
      <Modal isOpen={open} toggle={()=> setOpen(!open)}>
        <ModalHeader toggle={()=> setOpen(!open)}>Categories Edition</ModalHeader>
        <ModalBody>
    <Form innerRef={formEl} onSubmit={formik.handleSubmit}>
      {loading && (<Spinner size="sm" color="primary" />)}
      <FormGroup>
        {id ? <h4>{id}</h4> : ''}
        <Label for="name">Name</Label>
        <Input
          type="text"
          name="name"
          id="name"
          placeholder="Name"
          value={formik.values.name}
          onChange={formik.handleChange}
          valid={!formik.errors.name && formik.values.name !== null && formik.values.name !== undefined }
          invalid={formik.errors.name}
        />
        {formik.touched.name && formik.errors.name ?
         <FormFeedback valid={false} invalid={true}>Name is invalid</FormFeedback> : null}
      </FormGroup>
      <FormGroup>
        <CreatableSelect
          isMulti
          options={keywordsOptions}
          onChange={handleChangeOptions}
          value={selectedKeywords} />
      </FormGroup>
      <ButtonToggle color="primary" type="submit" >Save</ButtonToggle>
      <ButtonToggle color="danger" onClick={handleReset}>Reset</ButtonToggle>
    </Form>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default withRouter(Edit);
