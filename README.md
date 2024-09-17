# Phone icon injector

This project is a chrome extension that has the goal to insert phone icons next to phone numbers on a page and send the phone number to the background script.

## How to install and use
1. Run `npm install`
2. Run `npm run build`
3. Go to `chrome://extensions/`, click `Load unpacked`, select and upload the `build` folder.
4. Click on the `Service worker (inactive)` link on the installed extension and minimize it or set it aside.
5. Go to a page that contain phone numbers like: https://sig.ufla.br/modulos/publico/lista_telefonica.php
6. Click on chrome extensions and select the upload extension `Phone Icon Injector`.
7. Click on the phone icon and watch the event being logged on the window opened on the `4th step`.

## Assumptions/Design decisions
1. I decided to only run the contentScript on extension click
2. Since contentScript sounds like it should be a code script, I avoided making it the project entrypoint. The project entrypoint sounds better to be ran on extension popup, which I didn't chose to use since there wasn't anything to show there. And because of that I'm using `react-app-rewired`
3. It may not be the best design decision, not sure what would be the best approach for chrome extensions, but maybe loading the `index.tsx` and inside it create rules for either load a main component or load some scripts might be better than the approach I chose, I don't know really, need to research more.

## Challenges faced
1. Loading assets via `contentScript`.
    - I've trying many different ways to do this more automatically but wasn't successful on any, the only way I got this working was to manually injecting each asset to the page on `contentScript` run.
2. Debugging.
    - As we should deploy the build folder, I failed trying to create mappings to facilitate debug, mostly due to misconfigurations. I gave up on this because of the short timeframe and debugged over the compiled files or using console logs.
3. Not knowing well how workers "work" on chrome
    - I wasn't aware I had to open the worker so it starts to work, I thought it was automatic, which make me lose some time on this. After paying more attention on the chrome extension page I saw it wasn't active.

## Ideas for future improvements
1. Create a popup page with a reload button on it that would re-scan the page to re-add the phone icons or add more functionalities.
2. Add unit tests
3. Improve the phoneNumberInjector code, maybe make it a class and when it detects the phone number is already added breaks the whole operation and not just the DOM update like it is now.
4. Add linter
