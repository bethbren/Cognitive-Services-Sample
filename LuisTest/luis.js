
function luisAsync(jQuery, region, appId, subscriptionKey, utterance) {
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
