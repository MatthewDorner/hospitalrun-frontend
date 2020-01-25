import React, { useEffect } from 'react'
import { useHistory, Route } from 'react-router'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Spinner } from '@hospitalrun/components'
import NewEditPatientForm from './NewEditPatientForm'
import useTitle from '../../page-header/useTitle'
import Patient from '../../model/Patient'
import { updatePatient } from '../patients-slice'
import { fetchPatient } from '../patient-slice'
import { getPatientFullName } from '../util/patient-name-util'
import { RootState } from '../../store'

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

  return (
    <Route exact path="/patients/edit/:id">
      <NewEditPatientForm
        isNew={false}
        onCancel={onCancel}
        onSave={onSave}
        patientForEdit={patient}
      />
    </Route>
  )
}

export default EditPatient
