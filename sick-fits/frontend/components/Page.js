import PropTypes from "prop-types";
import React from "react";
import Header from "./Header";

export default function Page({ children }) {
  return (
    <div>
      <Header />
      <h2> I am the page</h2>
      {children}
    </div>
  );
}

Page.propTypes = {
  children: PropTypes.any,
};
