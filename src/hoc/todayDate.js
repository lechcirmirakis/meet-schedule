import React from 'react';

const withTodayDate = (WrappedComponent) => {
  const getTodayDate = () => {
    let todayDate = new Date();

    let dd = todayDate.getDate();
    let mm = todayDate.getMonth() + 1;
    const yyyy = todayDate.getFullYear();

    if (dd < 10) { dd = '0' + dd }
    if (mm < 10) { mm = '0' + mm }

    return todayDate = yyyy + '-' + mm + '-' + dd;
  }

  return props => (
    <WrappedComponent {...props} todayDate={getTodayDate()} />
  )
}

export default withTodayDate;