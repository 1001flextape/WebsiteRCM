import React from 'react';
import FunctionalNotice from './functional/Notice';
import DisplayNotice from './display/Notice';
import DisplayNav from './display/Nav';
import FunctionalNav from './functional/Nav';

const Navbar = (props) => {
  const { system } = props.data;
  const {
    isDisplayMode,
    isFunctionalMode,
  } = system.state;

  return (
    <>
      {isDisplayMode && (
        <>
          <DisplayNotice {...props} />
          <DisplayNav {...props} />
        </>
      )}
      {isFunctionalMode && (
        <>
          <FunctionalNotice {...props} />
          <FunctionalNav {...props} />
        </>
      )}
    </>
  );
};

export default Navbar;
