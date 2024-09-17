import RuntimeMessageActionEnum from "./enum/RuntimeMessageActionEnum";

chrome.action.onClicked.addListener((tab) => {
  if(tab.id) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["contentScript.js"],
    });
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  switch (message.action) {
    case RuntimeMessageActionEnum.PhoneIconClicked:
      console.log(`Phone number ${ message.phoneNumber } is being called`);
      break;
    case RuntimeMessageActionEnum.PhoneIconsInjected:
      console.log(`All phone icons have been injected`);
      break;
    default:
      console.log(`message`, message);
      break;
  }

  sendResponse({ status: 'Received' }); // Ensure this is called

  return true;
});

export {};