import React, { useEffect, useRef, useCallback } from 'react';
import { ButtonToggle, FormFeedback, Button, Form, FormGroup, Label, Input, FormText, Spinner } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import {
  useRouteMatch,
  withRouter,
} from "react-router-dom";
import { useFormik } from 'formik';
import { regex } from '../../utils'

const Edit = ({ history }) => {
  const dispatch = useDispatch()
  let match = useRouteMatch();
  const formEl = useRef(null);
  const store = useSelector(state => state.store);

  const { params: {id} } = match;
  useEffect(() => {
    if(id) {
      dispatch({type: 'store/fetchfields', payload: { id }})
    }
  }, [id])

  const {
    loading,
    fields : {
      name, country, street, city, zip_code, number,
    }
  } = store;

  const handleSubmit = (values) => {
    dispatch({type: 'store/submitfields', push: history.push, payload: {...values, id}})
  };

  const validationSchema = Yup.object().shape({
    name: Yup.mixed().required('Name is required!'),
    country: Yup.string().required('Country is required!'),
    street: Yup.string().required('Street is required!'),
    zip_code: Yup.string().required('Zip code is required!'),
    number: Yup.string().matches(regex.phone, 'Phone number is required'),}
  )

 const formik = useFormik({
   enableReinitialize: true,
   validationSchema,
    initialValues: {
      id,
      name,
      country,
      street,
      city,
      zip_code,
      number
    },
    onSubmit: values => {
      formik.resetForm()
      handleSubmit(values)
    },
  });

  const handleReset = useCallback(() => {
    formik.handleReset()
    formEl.current.reset()
    dispatch({type: 'store/clearfields'})
  }, [formik, formEl, dispatch]);

  return (
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
        <Label for="country">Country</Label>
        <Input type="text"
               name="country"
               id="country"
               value={formik.values.country}
               onChange={formik.handleChange}
               valid={!formik.errors.country && formik.values.country !== null && formik.values.country !== undefined }
               invalid={formik.errors.country} />
        {formik.touched.country && formik.errors.country ?
         <FormFeedback valid={false} invalid={true}>Country is invalid</FormFeedback> : null}
      </FormGroup>
      <FormGroup>
        <Label for="city">City</Label>
        <Input type="text"
               name="city"
               id="city"
               value={formik.values.city}
               onChange={formik.handleChange}
               valid={!formik.errors.city && formik.values.city !== null && formik.values.city !== undefined }
               invalid={formik.errors.city} />
        {formik.touched.city && formik.errors.city ?
         <FormFeedback valid={false} invalid={true}>City is invalid</FormFeedback> : null}
      </FormGroup>
      <FormGroup>
        <Label for="street">Street</Label>
        <Input
          type="text"
          name="street"
          id="street"
          value={formik.values.street}
          onChange={formik.handleChange}
          valid={!formik.errors.street && formik.values.street !== null && formik.values.street !== undefined }
          invalid={formik.errors.street} />
        {formik.touched.street && formik.errors.street ?
         <FormFeedback valid={false} invalid={true}>Street is invalid</FormFeedback> : null}
      </FormGroup>
      <FormGroup>
        <Label for="number">Phone</Label>
        <Input
          type="text"
          name="number"
          id="number"
          value={formik.values.number}
          onChange={formik.handleChange}
          valid={!formik.errors.number && formik.values.number !== null && formik.values.number !== undefined }
          invalid={formik.errors.number} />
        {formik.touched.number && formik.errors.number ?
         <FormFeedback valid={false} invalid={true}>Phone number is invalid</FormFeedback> : null}
      </FormGroup>
      <FormGroup>
        <Label for="zip_code">Zip Code</Label>
        <Input type="text" name="zip_code"
               id="zip_code"
               value={formik.values.zip_code}
               onChange={formik.handleChange}
               placeholder="Enter the zip code"
               valid={!formik.errors.zip_code && formik.values.zip_code !== null && formik.values.zip_code !== undefined }
               invalid={formik.errors.zip_code} />
        {formik.touched.zip_code && formik.errors.zip_code ?
         <FormFeedback valid={false} invalid={true}>Phone zip code is invalid</FormFeedback> : null}
      </FormGroup>
      <ButtonToggle color="primary" type="submit" >Save</ButtonToggle>
      <ButtonToggle color="danger" onClick={handleReset}>Reset</ButtonToggle>
    </Form>
  );
}

export default withRouter(Edit);
