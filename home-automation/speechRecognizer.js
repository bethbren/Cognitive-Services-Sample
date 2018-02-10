const speechRecognizer = (() => {
    // Create and initialize a recognizer from the SDK
    function create(SDK, subscriptionKey) {
        const recognizerConfig = new SDK.RecognizerConfig(
            new SDK.SpeechConfig(
                new SDK.Context(
                    new SDK.OS(navigator.userAgent, "Browser", null),
                    new SDK.Device("SpeechSample", "SpeechSample", "1.0.00000"))),
            SDK.RecognitionMode.Interactive,
            "en-US",
            SDK.SpeechResultFormat.Simple);

        const authentication = new SDK.CognitiveSubscriptionKeyAuthentication(subscriptionKey);
        return SDK.CreateRecognizer(recognizerConfig, authentication);
    }

    // Start streaming audio and returning results
    function start(recognizer) {
        recognizer.Recognize((event) => {
            switch (event.Name) {
                case "SpeechEndDetectedEvent":
                    OnSpeechEndDetected();
                    break;
                case "SpeechSimplePhraseEvent":
                    UpdateRecognizedPhrase(event.Result);
                    break;
                case "SpeechDetailedPhraseEvent":
                    UpdateRecognizedPhrase(event.Result);
                    break;
                case "RecognitionEndedEvent":
                    OnComplete();
                    break;
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