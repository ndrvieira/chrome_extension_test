import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import Button from 'react-bootstrap/Button';
import RuntimeMessageActionEnum from '../../enum/RuntimeMessageActionEnum';

const PhoneAction = ({ phoneNumber }: { phoneNumber: string }) => {
  const onClick = () => {
    chrome.runtime.sendMessage({ action: RuntimeMessageActionEnum.PhoneIconClicked, phoneNumber }, (response) => {
      if (chrome.runtime.lastError) {
        console.error('Error:', chrome.runtime.lastError);
      }
    });
  };

  return (
    <Button onClick={ onClick } size="sm" className="px-1 py-0 mr-2px">
      <FontAwesomeIcon icon={ faPhone } size="1x" />
    </Button>
  );
};

export default PhoneAction;