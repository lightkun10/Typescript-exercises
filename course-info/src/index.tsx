/* eslint-disable no-mixed-spaces-and-tabs */
// import { countReset } from "node:console";
import React from "react";
import ReactDOM from "react-dom";

import Header from './components/Header';
import Total from './components/Total';
// import Content from './components/Content';

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
}

// new types
interface CoursePartBase {
  name: string,
  exerciseCount: number
}

interface CourseBaseWithDesc extends CoursePartBase {
  description: string,
}

interface CoursePartOne extends CourseBaseWithDesc {
  name: "Fundamentals";
}

interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

interface CoursePartThree extends CourseBaseWithDesc {
  name: "Deeper type usage";
  exerciseSubmissionLink: string;
}

type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree;

const Part: React.FC<{ course: CoursePart }> = (props) => {
  switch (props.course.name) {
    case "Fundamentals":
      return (
        <div>
          <p>{props.course.name} {props.course.exerciseCount}</p>
			    <p>{props.course.description}</p>
        </div>
      )
    case "Using props to pass data":
      return (
        <div>
          <p>{props.course.name} {props.course.exerciseCount}</p>
          <p>{props.course.groupProjectCount}</p>
        </div> 
      )
    case "Deeper type usage":
      return (
        <div>
          <p>{props.course.name} {props.course.exerciseCount}</p> 
          <p>{props.course.description}</p>
          <p>{props.course.exerciseSubmissionLink}</p>
        </div>
      )
    default:
      return assertNever(props.course)
  }
}

const Content: React.FC<{ courses: Array<CoursePart> }> = (props) => {
  return (
    <div>
      {props.courses.map((course) =>
        <Part key={course.name} course={course} />
      )}
    </div>
  )
}

const App: React.FC = () => {
  const courseName = "Half Stack application development";
  
  // this is the new coursePart variable
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
    }
  ];

  return (
    <div>
      <Header name={courseName} />

      <Content courses={courseParts} />

      <Total total={courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));