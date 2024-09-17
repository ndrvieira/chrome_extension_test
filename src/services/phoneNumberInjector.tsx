import { createRoot } from 'react-dom/client';
import PhoneAction from '../components/phone/PhoneAction';
import RuntimeMessageActionEnum from '../enum/RuntimeMessageActionEnum';

const phoneNumberPatterns: RegExp[] = [
  // International phone number format (e.g., +1-800-555-5555, +44 20 7946 0958)
  /(\+?\d{1,4}?[\s.-]?)?(\(?\d{1,4}?\)?[\s.-]?)?[\d\s.-]{7,15}/g,

  // US phone number format (e.g., (800) 555-5555 or 800-555-5555)
  /\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}/g,

  // UK phone number format (e.g., 020 7946 0958, +44 20 7946 0958)
  /(\+44\s?7\d{3}|\(?07\d{3}\)?\s?|\d{5})[\s.-]?\d{5,8}/g,

  // Australian phone number format (e.g., 02 1234 5678 or +61 2 1234 5678)
  /(\+61\s?[\d\s.-]{9,11}|\(?\d{2}\)?[\s.-]?\d{4}[\s.-]?\d{4})/g,

  // Indian phone number format (e.g., 9876543210 or +91 9876543210)
  /(\+91[\s.-]?)?\d{10}/g,

  // Brazilian phone number format (e.g., (11) 91234-5678 or +55 11 91234-5678)
  /(\+55\s?)?\(?\d{2}\)?[\s.-]?\d{4}[\s.-]?\d{4}/g
];

const combinedPhoneNumberPattern = new RegExp(phoneNumberPatterns.map(pattern => pattern.source).join('|'), 'g');
const phoneIconInjectorClass = 'phoneIconInjector';

const processTextNode = (node: Document | ChildNode) => {
  const matches = node.textContent?.match(combinedPhoneNumberPattern);
  if (matches) {
    const parent = node.parentNode as HTMLElement;
    const fragment = document.createDocumentFragment();

    let alreadyRan = false;
    for (let i = 0; i < parent.childNodes.length; i++) {
      const node = parent.childNodes[i];
      if (node.nodeType === Node.ELEMENT_NODE) {
        const element = node as HTMLElement;

        if (element.tagName === 'DIV' && element.classList.contains(phoneIconInjectorClass)) {
          alreadyRan = true;
          break;
        }
      }
    };

    if (alreadyRan) {
      return;
    }

    let lastIndex = 0;
    matches.forEach((match) => {
      const index = node.textContent!.indexOf(match, lastIndex);
      const beforeText = node.textContent!.substring(lastIndex, index);
      const matchedText = node.textContent!.substring(index, index + match.length);
      
      fragment.appendChild(document.createTextNode(beforeText));
  
      const phoneElement = document.createElement('div');
      phoneElement.style.display = 'inline-block';
      phoneElement.className = phoneIconInjectorClass;
      const root = createRoot(phoneElement);
      root.render(<PhoneAction phoneNumber={ matchedText } />);
      fragment.appendChild(phoneElement);
  
      fragment.appendChild(document.createTextNode(matchedText));

      lastIndex = index + match.length;
    });

    fragment.appendChild(document.createTextNode(node.textContent!.substring(lastIndex)));
    parent.replaceChild(fragment, node);
  }
};

const processNodes = (node: Document | ChildNode) => {
  if (node.nodeType === Node.TEXT_NODE) {
    processTextNode(node);
  } else if (node.childNodes) {
    node.childNodes.forEach(processNodes);
  }
};

export const injectPhoneIcons = () => {
  processNodes(document);

  chrome.runtime.sendMessage({ action: RuntimeMessageActionEnum.PhoneIconsInjected });
};
