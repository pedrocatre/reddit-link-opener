(function () {
    'use strict';

    var ruleToOnlyShowOnReddit = {
        conditions: [
            new chrome.declarativeContent.PageStateMatcher({
                pageUrl: { hostEquals: 'www.reddit.com' }
            })
        ],
        actions: [ new chrome.declarativeContent.ShowPageAction() ]
    };

    chrome.runtime.onInstalled.addListener(function(details) {
        chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
            chrome.declarativeContent.onPageChanged.addRules([ruleToOnlyShowOnReddit]);
        });
    });

    chrome.pageAction.onClicked.addListener(function(tab) {
        // Send a message to the active tab
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            var activeTab = tabs[0];
            chrome.tabs.sendMessage(activeTab.id, {'message': 'clicked_browser_action'});
        });
    });

    chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
            if( request.message === 'open_new_tab' ) {
                chrome.tabs.create({"url": request.url});
            }
        }
    );
}());