import React from 'react';
import DisplayFooter from './display/DisplayFooter';
import DisplayCopyright from './display/DisplayCopyright';
import FunctionalFooter from './functional/FunctionalFooter';
import FunctionalCopyright from './functional/FunctionalCopyright';
import styles from './component.module.css';

function Footer(props) {
  const { system } = props.data;
  const {
    isDisplayMode,
    isFunctionalMode,
  } = system.state;

  return (
    <>
      {isDisplayMode && (
        <>
          <DisplayFooter {...props} />
          <DisplayCopyright {...props} />
        </>
      )}
      {isFunctionalMode && (
        <>
          <FunctionalFooter {...props} />
          <FunctionalCopyright {...props} />
        </>
      )}
    </>
  );
}

export default Footer;
