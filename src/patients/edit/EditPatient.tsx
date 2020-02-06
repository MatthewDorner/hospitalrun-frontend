import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { Spinner } from '@hospitalrun/components'

import GeneralInformation from '../GeneralInformation'
import useTitle from '../../page-header/useTitle'
import Patient from '../../model/Patient'
import { updatePatient, fetchPatient } from '../patient-slice'
import { RootState } from '../../store'
import { getPatientFullName, getPatientName } from '../util/patient-name-util'

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

  const [patient, setPatient] = useState({} as Patient)
  const { patient: reduxPatient } = useSelector((state: RootState) => state.patient)

  useTitle(
    `${t('patients.editPatient')}: ${getPatientFullName(reduxPatient)} (${getFriendlyId(
      reduxPatient,
    )})`,
  )

  useEffect(() => {
    setPatient(reduxPatient)
  }, [reduxPatient])

  const { id } = useParams()
  useEffect(() => {
    if (id) {
      dispatch(fetchPatient(id))
    }
  }, [id, dispatch])

  const onCancel = () => {
    history.goBack()
  }

  const onSave = () => {
    dispatch(
      updatePatient(
        {
          ...patient,
          fullName: getPatientName(patient.givenName, patient.familyName, patient.suffix),
        },
        history,
      ),
    )
  }

  const onFieldChange = (key: string, value: string | boolean) => {
    setPatient({
      ...patient,
      [key]: value,
    })
  }

  // see comment in ViewPatient
  if (!reduxPatient) {
    return <Spinner color="blue" loading size={[10, 25]} type="ScaleLoader" />
  }

  return (
    <GeneralInformation
      isEditable
      patient={patient}
      onCancel={onCancel}
      onSave={onSave}
      onFieldChange={onFieldChange}
    />
  )
}

export default EditPatient