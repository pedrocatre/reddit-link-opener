(function () {
    'use strict';

    function isRelativeUrl(postUrl) {
        return postUrl.indexOf('http') !== 0;
    }

    chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
            if( request.message === 'clicked_browser_action' ) {
                $( '.sitetable a.title' ).each( function( index, element ){
                    var postUrl = $(this).attr('href');
                    if(isRelativeUrl(postUrl)) {
                        postUrl = 'https://www.reddit.com' + postUrl;
                    }
                    console.log(postUrl );
                    chrome.runtime.sendMessage({'message': 'open_new_tab', 'url': postUrl});
                });
            }
        }
    );
}());