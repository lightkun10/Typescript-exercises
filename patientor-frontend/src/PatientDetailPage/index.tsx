import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import { getPatientInfo, useStateValue } from "../state";
import { Entry, Gender, Patient } from "../types";
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

const EntryItem: React.FC<{ entry: Entry }> = (props) => {
  const [{ diagnoses }] = useStateValue();
  console.log(diagnoses['F43.2'] ? diagnoses['F43.2'] : diagnoses['F43.2']);
  
  return (
    <div key={props.entry.id}>
      {props.entry.date} <i>{props.entry.description}</i>
      
      {props.entry.diagnosisCodes ? (
        <ul>
          {props.entry.diagnosisCodes.map((code) => (
            <li key={code}>
              {code} {diagnoses[`${code}`] ? diagnoses[`${code}`].name : diagnoses[`${code}`]}
            </li>
          ))}
        </ul>
        )
        : null
      }
    </div>
  )
}

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
  console.log();
  

  if (!(patient && "ssn" in patient)) return (
    <div>loading...</div>
  );
  
  return (
    <div>
      <div className="patient__main">
        <Header as="h2">
          {patient.name} <Icon name={genderIcon(patient.gender)}></Icon>
        </Header>
        ssn: {patient.ssn}
        <br/>
        occupation: {patient.occupation}
      </div>
      
      <br></br>
      
      <div className="patient__entry">
        <Header as="h3">entries</Header>
        { patient.entries && patient.entries.length > 0 
        ? patient.entries.map((entry) => 
          <EntryItem key={entry.id} entry={entry} />
        )
        : <div>No entry for this particular patient.</div>
        }
      </div>
    </div>
  );
};

export default PatientDetailPage;