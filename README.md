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
4. **Provide the app with your API keys**
