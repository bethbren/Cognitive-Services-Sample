const luis = (() => {
    function parseUtteranceAsync(jQuery, region, appId, subscriptionKey, utterance) {
        const queryParameters = {
            q: utterance,
            timezoneOffset: 0,
            verbose: true,
            spellCheck: false,
            staging: false,
            "subscription-key": subscriptionKey
        };

        return jQuery.ajax({
            url: `https://${region}.api.cognitive.microsoft.com/luis/v2.0/apps/${appId}?${jQuery.param(queryParameters)}`,
            type: "GET",
            data: "{body}",
        });
    }

    function maxBy(list, key) {
        let maxKey = null;
        let maxItem = null;

        for (let item of list) {
            const itemKey = key(item);
            if (itemKey > maxKey) {
                maxItem = item;
                maxKey = itemKey;
            }
        }

        return maxItem;
    }

    function highestScoredObjectFromList(list) {
        return maxBy(list, x => x.score);
    }

    function highestScoredIntent(luisResult) {
        const highestScored = highestScoredObjectFromList(luisResult.intents);
        return highestScored ? highestScored.intent : null;
    }

    function highestScoredEntity(luisResult, entityType) {
        const entities = luisResult.entities.filter(x => x.type === entityType);
        const highestScored = highestScoredObjectFromList(entities);
        return highestScored ? highestScored.entity : null;
    }

    const homeAutomation = (() => {
        const intent = {
            on: "HomeAutomation.TurnOn",
            off: "HomeAutomation.TurnOff"
        };

        const entity = {
            device: "HomeAutomation.Device",
            room: "HomeAutomation.Room",
            operation: "HomeAutomation.Operation"
        };

        return {
            intent: intent,
            entity: entity
        };
    })();

    return {
        parseUtteranceAsync: parseUtteranceAsync,
        highestScoredIntent: highestScoredIntent,
        highestScoredEntity: highestScoredEntity,
        homeAutomation: homeAutomation
    };
})();