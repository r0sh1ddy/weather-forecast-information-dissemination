import React from 'react';

const AlertMessage = ({ message }) => {
  return message ? <div className="alert">{message}</div> : null;
};

export default AlertMessage;