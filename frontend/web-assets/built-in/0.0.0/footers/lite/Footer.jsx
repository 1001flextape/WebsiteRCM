import React from 'react';
import DisplayCopyright from './display/DisplayCopyright';
import FunctionalCopyright from './functional/FunctionalCopyright';

function Footer(props) {
  const { system } = props.data;
  const {
    isDisplayMode,
    isFunctionalMode,
  } = system.state;

  return (
    <>
      {isDisplayMode && (<DisplayCopyright {...props} />)}
      {isFunctionalMode && (<FunctionalCopyright {...props} />)}
    </>
  );
}

export default Footer;
