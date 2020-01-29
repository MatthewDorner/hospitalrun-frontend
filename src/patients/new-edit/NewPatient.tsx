import React from 'react'
import { useHistory } from 'react-router'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import NewEditPatientForm from './NewEditPatientForm'
import useTitle from '../../page-header/useTitle'
import Patient from '../../model/Patient'
import { createPatient } from '../patient-slice'

const NewPatient = () => {
  const { t } = useTranslation()
  const history = useHistory()
  const dispatch = useDispatch()
  useTitle(t('patients.newPatient'))

  const onCancel = () => {
    history.goBack()
  }

  const onSave = (patient: Patient) => {
    dispatch(createPatient(patient, history))
  }

  const initialPatient = {} as Patient

  return <NewEditPatientForm onCancel={onCancel} onSave={onSave} initialPatient={initialPatient} />
}

export default NewPatient
