import React from "react";
import Container from "./Container";

const Search = ({ searchTerm, location }) => {
  return (
    <div>
      <Container searchTerm={searchTerm} location={location} />
    </div>
  );
};

export default Search;
