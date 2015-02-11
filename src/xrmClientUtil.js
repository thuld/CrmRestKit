/*globals Xrm, GetGlobalContext */

module.exports = (function(){
    'use strict';

    var ODATA_ENDPOINT = "/XRMServices/2011/OrganizationData.svc",
        endpointUrlCache;

    // the "Xrm" object exists only on the CRM form, but the module
    function getContext() {

        var ctx = null;

        if(typeof GetGlobalContext !== "undefined") {
            ctx = GetGlobalContext(); // jshint ignore:line
        }
        else if(typeof Xrm !== "undefined") {
            ctx = Xrm.Page.context;
        }
        else {
            throw new Error( "Context is not available.");
        }

        return ctx;
    }

    // depending how the script is executed (as part of a form, inside a web-resouce)
    // is the server-url constructed in a different fassion
    function getServerUrl() {

        var url = null,
            localServerUrl = window.location.protocol + "//" + window.location.host,
            context = getContext();


        if ( Xrm.Page.context.getClientUrl !== undefined ) {
            // since version SDK 5.0.13
            // http://www.magnetismsolutions.com/blog/gayan-pereras-blog/2013/01/07/crm-2011-polaris-new-xrm.page-method

            url = Xrm.Page.context.getClientUrl();
        }
        else if ( context.isOutlookClient() && !context.isOutlookOnline() ) {
            url = localServerUrl;
        }
        else {
            url = context.getServerUrl();
            url = url.replace( /^(http|https):\/\/([_a-zA-Z0-9\-\.]+)(:([0-9]{1,5}))?/, localServerUrl );
            url = url.replace( /\/$/, "" );
        }
        return url;
    }

    // used the cached version where possible
    function getODataEndpointUrl() {

        if(!endpointUrlCache) {

            endpointUrlCache = getServerUrl() + ODATA_ENDPOINT;
        }

        return endpointUrlCache;
    }

    // public member of the module
    return {
        getODataEndpointUrl: getODataEndpointUrl
    };
}());
