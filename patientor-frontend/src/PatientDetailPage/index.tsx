import React from "react";
import axios from "axios";
import { Switch, useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import { getPatientInfo, useStateValue } from "../state";
import { 
  Entry, Gender, Patient, 
  HospitalEntry, OccupationalHealthcareEntry, HealthCheckEntry, HealthCheckRating
} from "../types";
import { Container, Header, Icon, Label, LabelDetail, List, ListItem, Rating, Segment } from "semantic-ui-react";

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

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

const HospitalEntryDetail: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {
  // console.log(entry);

  return (
    <Segment>
      <Label color="green" ribbon>{entry.date}</Label>
      <Label as='a' color="green" tag>
        {entry.type}
      </Label>
      <Label>
        Discharge date: 
        <LabelDetail>{entry.discharge.date}</LabelDetail>
      </Label>
      <Header size="small">{entry.discharge.criteria}</Header>
      <Icon name="doctor" size="huge" /> {entry.specialist}
    </Segment>
  );
};

const OccupationalHealthcareEntryDetail: React.FC<{ entry: OccupationalHealthcareEntry }> = ({ entry }) => {
  // console.log(entry);

  return (
    <Segment>
      <Label color="purple" ribbon>{entry.date}</Label>
      <Label as='a' color="purple" tag>
        {entry.type}
      </Label>
      <Label>
				Employer
				<Label.Detail>{entry.employerName}</Label.Detail>
			</Label>

      <Header size="small">{entry.description}</Header>
    </Segment>
  );
};


const HealthCheckEntryDetail: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {
  // console.log(entry);
  
  return (
    <Segment>
      <Label color="orange" ribbon>{entry.date}</Label>
      <Label as='a' color="orange" tag>
        {entry.type}
      </Label>
      <Header size="small">{entry.description}</Header>
      <Rating icon="heart" 
        rating={4 - entry.healthCheckRating} 
        maxRating={4} disabled></Rating>
    </Segment>
  );
};

const EntryDetails: React.FC<{ entry: Entry }> = (props) => {
  // console.log(props.entry);
  // console.log(diagnoses);
  
  switch (props.entry.type) {
    case "Hospital":
      return <HospitalEntryDetail entry={props.entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcareEntryDetail entry={props.entry} />;
    case "HealthCheck":
      return <HealthCheckEntryDetail entry={props.entry}/>;
    default:
      return assertNever(props.entry);
  }
};

const EntryItem: React.FC<{ entry: Entry }> = (props) => {
  const [{ diagnoses }] = useStateValue();
  // console.log(props.entry.type);

  const diagnosisName = (code: string): string => {
    return diagnoses[code] ? diagnoses[code].name : code;
  };
  
  return (
    <div key={props.entry.id}>
      <EntryDetails entry={props.entry} />

      {props.entry.diagnosisCodes && props.entry.diagnosisCodes.map((code) => (
        <ListItem key={code}>
          <List.Content>
            <List.Header>{code}</List.Header>
            <List.Description>
              {diagnosisName(code)}
            </List.Description>
          </List.Content>
        </ListItem>
      ))}
    </div>
  );
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
  
  // console.log(patient);

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