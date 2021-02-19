import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import { getPatientInfo, useStateValue } from "../state";
import { Gender, Patient } from "../types";
import { Header, Icon } from "semantic-ui-react";

const genderIcon = (gender: Gender) => {
  switch (gender) {
    case Gender.Male:
      return "mars";
    case Gender.Female:
      return "venus";
    case Gender.Other:
      return "genderless";
  }
};

const PatientDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patients: { [id]: patient } }, dispatch] = useStateValue();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();
  
  React.useEffect(() => {
    const fetchPatientDetail = async () => {
      try {
        const { data: patientListFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch(getPatientInfo(patientListFromApi));
      } catch (e) {
        console.error(e);
      }

    };
    fetchPatientDetail();
  }, [dispatch]);
  
  console.log(patient);

  if (!(patient && "ssn" in patient)) return (
    <div>loading...</div>
  );
  
  return (
    <div>
      <Header as="h2">
        {patient.name} <Icon name={genderIcon(patient.gender)}></Icon>
      </Header>
      ssn: {patient.ssn}
      <br/>
      occupation: {patient.occupation}
    </div>
  );
};

export default PatientDetailPage;