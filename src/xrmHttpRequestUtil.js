var RSVP = require('rsvp');

module.exports = (function(){
    'use strict';


    function extractRequestErrorMessage(xhr) {

        return JSON.parse( xhr.responseText ).error.message.value;
    }

    // method -> 'POST' || 'GET'
    function buildXhrRequest(url, method, async){

        var xhr = new XMLHttpRequest();

        xhr.open(method, encodeURIComponent(url), async);

        // define the requerst headers
        xhr.setRequestHeader( "Accept", "application/json" );

        return xhr;
    }

    function getRequestAsync(url) {
        return new RSVP.Promise(function(resolve, reject) {

            // create an ansync POST HttpRequest
            var xhr = buildXhrRequest(url, 'POST', true);
            xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");

            xhr.onreadystatechange = function () {
                // completed
                if (xhr.readyState === 4) {
                    if(xhr.status === 200) {
                        resolve(xhr.data);
                    }
                    else {
                        reject(extractRequestErrorMessage(xhr));
                    }
                }
            };

            xhr.send();
        });
    }

    function getRequestSync(url) {

        // create an ansync POST HttpRequest
        var xhr = buildXhrRequest(url, 'POST', true),
            response = null;

        xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");

        xhr.send();

        if(xhr.status === 200) {
            response = JSON.parse(xhr.responseText).d;
        }
        else {
            throw new Error(extractRequestErrorMessage(xhr));
        }

        return response;
    }

	// note 'MERGE' methode does not return data
    function mergeRequest(url, payload) {

        return new RSVP.Promise(function(resolve, reject) {

            // create an ansync POST HttpRequest
            var xhr = buildXhrRequest(url, 'POST', true);

            xhr.setRequestHeader( "Accept", "application/json" );
            xhr.setRequestHeader( "X-HTTP-Method", "MERGE" );

            xhr.onreadystatechange = function () {
                // completed
                if (xhr.readyState === 4) {
                    if(xhr.status === 200) {
                        // MERGE methode does not return data
                        resolve();
                    }
                    else {
                        reject(extractRequestErrorMessage(xhr));
                    }
                }
            };

            xhr.send(payload);
        });
    }

	// note 'MERGE' methode does not return data
    function mergeRequestSync(url, payload) {



        // create an ansync POST HttpRequest
        var xhr = buildXhrRequest(url, 'POST', true);

        xhr.setRequestHeader( "Accept", "application/json" );
        xhr.setRequestHeader( "X-HTTP-Method", "MERGE" );

        if(xhr.status === 200) {
            return;
        }
        else {
            throw new Error(extractRequestErrorMessage(xhr));
        }

        xhr.send(payload);
    }

    function postRequestAsync(url, payload){

        return new RSVP.Promise(function(resolve, reject) {

            // create an ansync POST HttpRequest
            var xhr = buildXhrRequest(url, 'POST', true);

            xhr.onreadystatechange = function () {
                // completed
                if (xhr.readyState === 4) {
                    if(xhr.status === 200) {
                        resolve(xhr.data);
                    }
                    else {
                        reject(extractRequestErrorMessage(xhr));
                    }
                }
            };

            xhr.send(payload);
        });
    }

    function postRequestSync(url, payload){

        // create an ansync POST HttpRequest
        var xhr = buildXhrRequest(url, 'POST', true),
            response;

        xhr.send(payload);

        if(xhr.status === 200) {
            response = JSON.parse(xhr.responseText).d;
        }
        else {
            throw new Error(extractRequestErrorMessage(xhr));
        }

        return response;
    }

    // public API of the module
    return {
        getRequestAsync: getRequestAsync,
        getRequestSync: getRequestSync,
        postRequestAsync: postRequestAsync,
        postRequestSync: postRequestSync,
		mergeRequest: mergeRequest,
		mergeRequestSync: mergeRequestSync
    }
});
