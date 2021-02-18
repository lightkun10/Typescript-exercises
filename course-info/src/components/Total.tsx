import React from "react";

const Total: React.FC<{ total: number  }> = (props) => {
  return (
    <p>
      Number of exercises{" "}
      {props.total}
    </p>
  )
}

export default Total;