const speechRecognizer = (() => {
    // Create and initialize a recognizer from the SDK
    function create(SDK, recognitionMode, language, format, subscriptionKey) {
        switch (recognitionMode) {
            case "Interactive":
                recognitionMode = SDK.RecognitionMode.Interactive;
                break;
            case "Conversation":
                recognitionMode = SDK.RecognitionMode.Conversation;
                break;
            case "Dictation":
                recognitionMode = SDK.RecognitionMode.Dictation;
                break;
            default:
                recognitionMode = SDK.RecognitionMode.Interactive;
        }

        const recognizerConfig = new SDK.RecognizerConfig(
            new SDK.SpeechConfig(
                new SDK.Context(
                    new SDK.OS(navigator.userAgent, "Browser", null),
                    new SDK.Device("SpeechSample", "SpeechSample", "1.0.00000"))),
            recognitionMode,
            language, // Supported languages are specific to each recognition mode. Refer to docs.
            format); // SDK.SpeechResultFormat.Simple (Options - Simple/Detailed)

        const authentication = new SDK.CognitiveSubscriptionKeyAuthentication(subscriptionKey);
        return SDK.CreateRecognizer(recognizerConfig, authentication);
    }

    // Start streaming audio and returning results
    function start(recognizer) {
        recognizer.Recognize((event) => {
            switch (event.Name) {
                case "RecognitionTriggeredEvent":
                    UpdateStatus("Initializing");
                    break;
                case "ListeningStartedEvent":
                    UpdateStatus("Listening");
                    break;
                case "RecognitionStartedEvent":
                    UpdateStatus("Listening_Recognizing");
                    break;
                case "SpeechStartDetectedEvent":
                    UpdateStatus("Listening_DetectedSpeech_Recognizing");
                    console.log(JSON.stringify(event.Result)); // check console for other information in result
                    break;
                case "SpeechHypothesisEvent":
                    // UpdateRecognizedHypothesis(event.Result.Text, false);
                    console.log(JSON.stringify(event.Result)); // check console for other information in result
                    break;
                case "SpeechFragmentEvent":
                    UpdateRecognizedHypothesis(event.Result.Text, true);
                    console.log(JSON.stringify(event.Result)); // check console for other information in result
                    break;
                case "SpeechEndDetectedEvent":
                    OnSpeechEndDetected();
                    UpdateStatus("Processing_Adding_Final_Touches");
                    console.log(JSON.stringify(event.Result)); // check console for other information in result
                    break;
                case "SpeechSimplePhraseEvent":
                    UpdateRecognizedPhrase(JSON.stringify(event.Result, null, 3));
                    break;
                case "SpeechDetailedPhraseEvent":
                    UpdateRecognizedPhrase(JSON.stringify(event.Result, null, 3));
                    break;
                case "RecognitionEndedEvent":
                    OnComplete();
                    UpdateStatus("Idle");
                    console.log(JSON.stringify(event)); // Debug information
                    break;
                default:
                    console.log(JSON.stringify(event)); // Debug information
            }
        })
        .On(() => {
            // The request succeeded. Nothing to do here.
        },
        (error) => {
            console.error(error);
        });
    }

    // Stop streaming audio
    function stop(recognizer) {
        recognizer.AudioSource.TurnOff();
    }

    return {
        create: create,
        start: start,
        stop: stop
    };
})();