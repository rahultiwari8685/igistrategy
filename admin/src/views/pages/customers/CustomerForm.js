import React, { useEffect } from 'react'
import { CForm, CFormInput, CButton, CRow, CCol } from '@coreui/react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import setting from '../../../setting.json'

const CustomerForm = ({ editCustomer, onSuccess }) => {
  const { register, handleSubmit, reset } = useForm()
  const API_URL = `${setting.api}/api/customers`

  useEffect(() => {
    if (editCustomer) {
      reset(editCustomer)
    }
  }, [editCustomer, reset])

  const submitForm = async (data) => {
    if (editCustomer) {
      // UPDATE CUSTOMER (matches: /updateCustomer:id)
      await axios.put(`${API_URL}/updateCustomer${editCustomer._id}`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
    } else {
      // CREATE CUSTOMER (matches: /saveCustomer)
      await axios.post(`${API_URL}/saveCustomer`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
    }

    onSuccess()
  }

  return (
    <CForm onSubmit={handleSubmit(submitForm)}>
      <CRow>
        <CCol md={6} className="mt-2">
          <CFormInput
            label="Customer Name"
            {...register('name')}
            placeholder="Enter Name"
            required
          />
        </CCol>

        <CCol md={6} className="mt-2">
          <CFormInput
            label="Email"
            type="email"
            placeholder="Enter Email"
            {...register('email')}
            required
          />
        </CCol>

        <CCol md={6} className="mt-2">
          <CFormInput label="Phone" placeholder="Enter Phone" {...register('phone')} />
        </CCol>
        <CCol md={6} className="mt-2">
          <CFormInput
            label="Password"
            type="password"
            placeholder="Enter Password"
            {...register('password')}
          />
        </CCol>
      </CRow>

      <div className="mt-3">
        <CButton type="submit" color="success">
          {editCustomer ? 'Update Customer' : 'Create Customer'}
        </CButton>
      </div>
    </CForm>
  )
}

export default CustomerForm
