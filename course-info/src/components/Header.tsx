import React from "react";

interface HeaderLine {
  name: string;
}

const Header: React.FC<HeaderLine> = (props) => {
  return <h1>{props.name}</h1>
}

export default Header;