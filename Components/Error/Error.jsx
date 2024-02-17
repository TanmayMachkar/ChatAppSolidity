import React from "react";

import styles from './Error.module.css';

const Error = ({error}) => {
  return(
    <div className = {styles.Error}>
      <div className = {styles.Error_box}>
        <h2>Please Fix This Issue And Reload Your Browser</h2>
        {error}
      </div>
    </div>
  );
};

export default Error;
