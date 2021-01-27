import React, { useEffect, useRef } from 'react';
import { ButtonToggle, FormFeedback, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import {
  useRouteMatch,
  withRouter,
} from "react-router-dom";
import { useFormik } from 'formik';

const Edit = ({ history }) => {
  const dispatch = useDispatch()
  let match = useRouteMatch();
  const formEl = useRef(null);
  const product = useSelector(state => state.product);

  const { params: {id} } = match;
  useEffect(() => {
    if(id) {
      dispatch({type: 'product/fetchfields', payload: { id }})
    }
  }, [id])

  useEffect(() => {
    dispatch({type: 'product/fetchcategories'})
  }, [])

  const {
    categories_data,
    fields : {
      name, price, color, size, category_id
    }
  } = product;

  const handleSubmit = (values) => {
    dispatch({type: 'product/submitfields', push: history.push, payload: {...values, id}})
  };

  const handleReset = () => {
    dispatch({type: 'product/clearfields'})
    formEl.current.reset()
  };

  const validationSchema = Yup.object().shape({
    name: Yup.mixed().required('Name is required!'),
    color: Yup.string().required('Color is required!'),
    size: Yup.string().required('Size is required!'),
    category_id: Yup.string().required('Category is required!'),
    price: Yup.number().test(
      'is-decimal',
      'invalid decimal',
      value => (value + "").match(/^\d*\.{1}\d*$/),
    ),})
 const formik = useFormik({
   enableReinitialize: true,
   validationSchema,
    initialValues: {
      id,
      name,
      price,
      color,
      size,
      category_id,
    },
    onSubmit: values => {
      handleSubmit(values)
    },
  });

  const options = categories_data.map(item => (<option value={item.id}>{item.name}</option>))
  return (
    <Form innerRef={formEl} onSubmit={formik.handleSubmit}>
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
        <Label for="price">Price</Label>
        <Input type="text"
               name="price"
               id="price"
               value={formik.values.price}
               onChange={formik.handleChange}
               valid={!formik.errors.price && formik.values.price !== null && formik.values.price !== undefined }
               invalid={formik.errors.price}
        />
        {formik.touched.price && formik.errors.price ?
         <FormFeedback valid={false} invalid={true}>Price is invalid</FormFeedback> : null}
      </FormGroup>
      <FormGroup>
        <Label for="color">Color</Label>
        <Input type="text" name="color"
               id="color"
               value={formik.values.color}
               onChange={formik.handleChange}
               valid={!formik.errors.color && formik.values.color !== null && formik.values.color !== undefined }
               invalid={formik.errors.color}
               placeholder="Enter the color" />
        {formik.touched.color && formik.errors.color ?
         <FormFeedback valid={false} invalid={true}>Color is invalid</FormFeedback> : null}
      </FormGroup>
      <FormGroup>
        <Label for="size">Size</Label>
        <Input type="select" name="size" id="size"
               onChange={formik.handleChange}
               value={formik.values.size}
               valid={!formik.errors.size && formik.values.size !== null && formik.values.size !== undefined }
               invalid={formik.errors.size}
        >
          <option></option>
          <option>small</option>
          <option>medium</option>
          <option>large</option>
        </Input>
        {formik.touched.size && formik.errors.size ?
         <FormFeedback valid={false} invalid={true}>Size is invalid</FormFeedback> : null}
      </FormGroup>
      <FormGroup>
        <Label for="category_id">category</Label>
        <Input type="select" name="category_id" id="category_id"
               onChange={formik.handleChange}
               value={formik.values.category_id}
               valid={!formik.errors.category_id && formik.values.category_id !== null && formik.values.category_id !== undefined }
               invalid={formik.errors.category_id}
        >
          <option></option>
          {options}
        </Input>
        {formik.touched.category_id && formik.errors.category_id ?
         <FormFeedback valid={false} invalid={true}>Category is invalid</FormFeedback> : null}
      </FormGroup>
      <ButtonToggle color="primary" type="submit" >Save</ButtonToggle>
      <ButtonToggle color="danger" onClick={handleReset}>Reset</ButtonToggle>
    </Form>
  );
}

export default withRouter(Edit);
