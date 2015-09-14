var xrmclient = require('xrmClientUtil.js');
var xrmfactories = require('factories.js')
var httputil = require('xrmHttpRequestUtil.js');

(function ( window, document, undefined ) {
    'use strict';


    ///
    /// Parses the ODATA date-string into a date-object
    /// All queries return a date in the format "/Date(1368688809000)/"
    ///
    function parseODataDate( value ) {

        return new Date( parseInt( value.replace( '/Date(', '' ).replace( ')/', '' ), 10 ) );
    }

    // retrievs a single record in async mode - based on the provided id
    function getById(entityName, id, columns) {

        var setName = entityName + 'Set',
            queryurl = [
                xrmclient.getODataEndpointUrl(),
                "/" + setName,
                "(guid'" + id + "')",
                "?$select=" + columns.join( ',' )
            ].join('');

        return httputil.getRequestAsync(queryurl);
    }

    // retrievs a single record in sync mode - based on the provided id
    function getByIdSync(entityName, id, columns) {

        var setName = entityName + 'Set',
            queryurl = [
                xrmclient.getODataEndpointUrl(),
                "/" + setName,
                "(guid'" + id + "')",
                "?$select=" + columns.join( ',' )
            ].join('');

        return httputil.getRequestSync(queryurl);
    }

    // retrievs multiuple records based on filter
    // The max number of records returned by Odata is limited to 50, the result object contains the property
    // 'next' and the fn loadNext that could be used to load the addional records
    function getByQuery(entityName, columns, opt_filter) {

        // in case filter is empty
        var filter = ( opt_filter ) ? "&$filter=" + opt_filter : '',
            setName = entityName + 'Set',
            queryurl = [
                xrmclient.getODataEndpointUrl(),
                "/" + setName,
                "?$select=" + columns.join( ',' ),
                filter
            ].join('');

        return httputil.getRequest(queryurl);
    }

    // retrievs multiuple records based on filter
    // The max number of records returned by Odata is limited to 50, the result object contains the property
    // 'next' and the fn loadNext that could be used to load the addional records
    function getByQuerySync(entityName, columns, opt_filter) {

        // in case filter is empty
        var filter = ( opt_filter ) ? "&$filter=" + opt_filter : '',
            setName = entityName + 'Set',
            queryurl = [
                xrmclient.getODataEndpointUrl(),
                "/" + setName,
                "?$select=" + columns.join( ',' ),
                filter
            ].join('');

        return httputil.getRequestSync(queryurl);
    }

    // used for joins
    function getByExpandQuery(entityName, columns, expand, opt_filter) {

        // in case filter is empty
        var filter = (opt_filter) ? "&$filter=" + opt_filter : '',
            setName = entityName + 'Set',
            queryurl = [
                xrmclient.getODataEndpointUrl(),
                "/" + setName,
                "?$select=" + columns.join( ',' ),
                '&$expand=' + expand,
                filter
            ].join('');

        return httputil.getRequest(queryurl);
    }

    // used for joins
    function getByExpandQuerySync(entityName, columns, expand, opt_filter) {

        // in case filter is empty
        var filter = (opt_filter) ? "&$filter=" + opt_filter : '',
            setName = entityName + 'Set',
            queryurl = [
                xrmclient.getODataEndpointUrl(),
                "/" + setName,
                "?$select=" + columns.join( ',' ),
                '&$expand=' + expand,
                filter
            ].join('');

        return httputil.getRequestSync(queryurl);
    }

    // used in the context of lazy-loading (more than 50 records found in the retrieveMultiple request)
    // Query (url) needs to define the entity, columns and filter
    function getByQueryUrl(queryurl) {

        return httputil.getRequestSync(queryurl);
    }

    // used in the context of lazy-loading (more than 50 records found in the retrieveMultiple request)
    // Query (url) needs to define the entity, columns and filter
    function getByQueryUrlSync(queryurl) {

        return httputil.getRequestSync(queryurl);
    }

    // per default a REST query returns only 50 record.
    // This function will load all records
    function getByQueryAll(entityName, columns, opt_filter ) {

        var allRecords = [];

        return getByQuery(entityName, columns, opt_filter).then(function handler(result){

            // add the elements to the collection
            allRecords = allRecords.concat(result.entities);

            if (result.d.__next) {

                // recursive call
                return getByQueryUrl(result.d.__next).then(handler);
            }
            else {
                return allRecords;
            }
        });
    }

    // create a single reocr
    function create(entityName, entityObject) {

        var setName = entityName + 'Set',
            url = [
                xrmclient.getODataEndpointUrl(),
                "/" + setName
            ].join(''),
            data = JSON.stringify(entityObject);

        return httputil.postRequestAsync(url, data);
    }

    // create a single reocr
    function createSync(entityName, entityObject) {

        var setName = entityName + 'Set',
            url = [
                xrmclient.getODataEndpointUrl(),
                "/" + setName
            ].join(''),
            data = JSON.stringify(entityObject);

        return httputil.postRequestSync(url, data);
    }

    // updates the record with the stated intance.
    // note 'MERGE' methode does not return data
    function update(entityName, id, entityObject, opt_asyn ) {

        var setName = entityName + 'Set',
            data = JSON.stringify( entityObject ),
            url = [
                xrmclient.getODataEndpointUrl(),
                "/" + setName,
                "(guid'" + id + "')"
            ].join('');


        return httputil.mergeRequest(url, data);
    }

    // updates the record with the stated intance.
    // note 'MERGE' methode does not return data
    function updateSync(entityName, id, entityObject, opt_asyn ) {

        var setName = entityName + 'Set',
            data = JSON.stringify( entityObject ),
            url = [
                xrmclient.getODataEndpointUrl(),
                "/" + setName,
                "(guid'" + id + "')"
            ].join('');


        return httputil.mergeRequestSync(url, data);
    }

    ///
    /// Creates a link between records
    ///
    function associate( entity1Id, entity1Name, entity2Id, entity2Name, relationshipName, opt_asyn ) {

        // default is 'true'
        var asyn = ( opt_asyn === undefined ) ? true : opt_asyn,
            odatapath = getODataPath(),
            request = {
                url: odatapath + "/" + entity1Name + "Set(guid'" + entity1Id + "')/$links/" + relationshipName,
                type: "POST",
                data: window.JSON.stringify( {
                    uri: odatapath + "/" + entity2Name + "Set(guid'" + entity2Id + "')"
                } )
            };

        return doRequest( request, asyn );
    }

    ///
    /// Removes a link between records
    ///
    function disassociate( entity1Id, entity1Name, entity2Id, relationshipName, opt_asyn ) {

        var asyn = ( opt_asyn === undefined ) ? true : opt_asyn,
            odatapath = getODataPath(),
            request = {
                url: odatapath + "/" + entity1Name + "Set(guid'" + entity1Id + "')/$links/" + relationshipName + "(guid'" + entity2Id + "')",
                type: "POST",
                // method: "DELETE",
                beforeSend: function ( request ) {
                    request.setRequestHeader( 'Accept', 'application/json' );
                    request.setRequestHeader( 'X-HTTP-Method', 'DELETE' );
                }
            };

        return doRequest( request, asyn );
    }




    ///
    /// Deletes as single record identified by the id
    /// Sample:
    ///         CrmRestKit.Delete('Account', id).done(...).fail(..);
    ///
    function deleteRecord( entityName, id, opt_asyn ) {

        // default is 'true'
        var asyn = ( opt_asyn === undefined ) ? true : opt_asyn,
            setName = entityName + 'Set',
            query = getODataPath() + '/' + setName + "(guid'" + id + "')",
            options = {
                type: "POST",
                url: query,
                beforeSend: function ( request ) {
                    request.setRequestHeader( 'Accept', 'application/json' );
                    request.setRequestHeader( 'X-HTTP-Method', 'DELETE' );
                }
            };

        return doRequest( options, asyn );
    }

    // PUBLIC API
    window =  {
        // factories namespace
        factories: xrmfactories,

        // util namespace
        util: {
            parseODataDate:parseODataDate
        },

        // read api
        getById: getById,
        getByIdSync: getByIdSync,
        getByQueryUrl: getByQueryUrl,
        getByQueryUrlSync: getByQueryUrlSync,
        getByExpandQuery: getByExpandQuery,
        getByExpandQuerySync: getByExpandQuerySync,
        getByQuery: getByQuery,
        getByQuerySync:getByQuerySync,
        getByQueryAll: getByQueryAll,

        // cud api
        create: create,
        createSync: createSync,
        update: update,
        updateSync:updateSync,
        Update: update,
        Delete: deleteRecord,
        /* N:M relationship operations */
        Associate: associate,
        Disassociate: disassociate,
    };
}( window, document ) );
