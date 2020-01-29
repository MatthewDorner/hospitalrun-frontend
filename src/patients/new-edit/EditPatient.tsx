import React, { useEffect } from 'react'
import { useHistory, useParams } from 'react-router'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { Spinner } from '@hospitalrun/components'
import NewEditPatientForm from './NewEditPatientForm'
import useTitle from '../../page-header/useTitle'
import Patient from '../../model/Patient'
import { updatePatient, fetchPatient } from '../patient-slice'
import { RootState } from '../../store'
import { getPatientFullName } from '../util/patient-name-util'

const getFriendlyId = (p: Patient): string => {
  if (p) {
    return p.friendlyId
  }

  return ''
}

const EditPatient = () => {
  const { t } = useTranslation()
  const history = useHistory()
  const dispatch = useDispatch()

  const { patient } = useSelector((state: RootState) => state.patient)
  useTitle(
    `${t('patients.editPatient')}: ${getPatientFullName(patient)} (${getFriendlyId(patient)})`,
  )

  const { id } = useParams()
  useEffect(() => {
    if (id) {
      dispatch(fetchPatient(id))
    }
  }, [dispatch, id])

  if (!patient) {
    return <Spinner color="blue" loading size={[10, 25]} type="ScaleLoader" />
  }

  const onCancel = () => {
    history.goBack()
  }

  const onSave = (patient: Patient) => {
    dispatch(updatePatient(patient, history))
  }

  return <NewEditPatientForm initialPatient={patient} onCancel={onCancel} onSave={onSave} />
}

export default EditPatient
