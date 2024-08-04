import React from 'react';
import DisplayFooter from './display/DisplayFooter';
import DisplayCopyright from './display/DisplayCopyright';
import FunctionalCopyright from './functional/FunctionalCopyright';
import FunctionalFooter from './functional/FunctionalFooter';
import DisplayCta from './display/DisplayCta';
import FunctionalCta from './functional/FunctionalCta';

function Footer(props) {
  const { system } = props.data;
  const { isDisplayMode, isFunctionalMode } = system.state;

  return (
    <>
      {isDisplayMode && (
        <>
          <DisplayCta {...props} />
          <DisplayFooter {...props} />
          <DisplayCopyright {...props} />
        </>
      )}
      {isFunctionalMode && (
        <>
          <FunctionalCta {...props} />
          <FunctionalFooter {...props} />
          <FunctionalCopyright {...props} />
        </>
      )}
    </>
  );
}

export default Footer;
