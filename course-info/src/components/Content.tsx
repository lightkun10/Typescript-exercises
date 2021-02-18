import React from "react";

interface CoursePartBase {
  name: string,
  exerciseCount: number
}

const Content: React.FC<{ courseParts: Array<CoursePartBase> }> = (props) => {
  return (
    <div>
      {props.courseParts.map((course) =>
        <p key={course.name}>
          {course.name} {course.exerciseCount}
        </p>
      )}
    </div>
  )
}

export default Content;