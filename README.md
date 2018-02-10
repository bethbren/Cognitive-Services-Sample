# Home Automation with Azure Cognitive Services

Demo the Microsoft Azure Cognitive Services API with an intelligent home automation assistant.

## Build instructions
To build and deploy the app:
1. **Build the Speech SDK**
    1. From the command line, go to the `azure-speech-web-sdk` directory
    2. `npm run bundle`
    3. This should create a directory named `distrib` with the build output
2. **Open the app in a browser**
    1. Open `home-automation/HomeAutomation.html` in a Web browser
        1. Edge, Chrome, and Firefox are all supported
        2. However, Safari will not work, since it does not implement the API to access the microphone
3. **Get your API keys from Azure**
    1. Set up a free Azure account at <https://azure.microsoft.com/en-us/free/>
    2. Sign in to the Azure portal at <https://portal.azure.com>
4. Install the `http-server` NPM package: `npm install -g http-server`
5. From the root of the repository, run the server on some port: `http-server -p 8000`
6. In a Web browser, pull up the example: `http://127.0.0.1:8000/home-automation/HomeAutomation.html`
    1. `http://127.0.0.1` is the IP address that "loops back" to your own machine ("localhost")
    2. The path to `HomeAutomation.html` will be relative to the directory you ran `http-server` from
