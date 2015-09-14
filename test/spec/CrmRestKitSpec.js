/*globals describe, it, before, after, chai, sinon*/

'use strict';
describe("CrmRestKit - Module API", function(){

    var expect = chai.expect;

    it('should provided the public member "create"', function(){

        expect(CrmRestKit.create).to.a('function');
    });

    it('should provided the public member "createSync"', function(){

        expect(CrmRestKit.createSync).to.a('function');
    });

    it('should provided the public member "update"', function(){

        expect(CrmRestKit.update).to.a('function');
    });

    it('should provided the public member "updateSync"', function(){

        expect(CrmRestKit.updateSync).to.a('function');
    });

    it('should provided the public member "delete"', function(){

        expect(CrmRestKit.delete).to.a('function');
    });

        it('should provided the public member "deleteSync"', function(){

            expect(CrmRestKit.deleteSync).to.a('function');
        });

    it('should provided the public member "getById"', function(){

        expect(CrmRestKit.getById).to.a('function');
    });

    it('should provided the public member "getByIdSync"', function(){

        expect(CrmRestKit.getByIdSync).to.a('function');
    });

    it('should provided the public member "byQuery"', function(){

        expect(CrmRestKit.byQuery).to.a('function');
    });

    it('should provided the public member "byQuerySync"', function(){

        expect(CrmRestKit.byQuerySync).to.a('function');
    });

    it('should provided the public member "byQueryUrl"', function(){

        expect(CrmRestKit.byQueryUrl).to.a('function');
    });

    it('should provided the public member "byQueryUrl"', function(){

        expect(CrmRestKit.byQueryUrl).to.a('function');
    });

    it('should provided the public member "byQueryUrlSync"', function(){

        expect(CrmRestKit.byQueryUrlSync).to.a('function');
    });

    it('should provided the public member "byQueryAll"', function(){

        expect(CrmRestKit.byQueryAll).to.a('function');
    });

    it('should provided the public member "factories"', function(){

        expect(CrmRestKit.byQueryAll).to.a('object');
    });
});

describe("CrmRestKit - 'factories' namespace", function(){

    var expect = chai.expect;

    it('should provided the public member "factories"', function(){

        expect(CrmRestKit.factories).to.a('object');
    });

    it('should provided the public member "entityReference"', function(){

        expect(CrmRestKit.factories.entityReference).to.a('function');
    });

    it('should provided the public member "optionSetValue"', function(){

        expect(CrmRestKit.factories.optionSetValue).to.a('function');
    });
});

describe("CrmRestKit - Retrieve", function(){

    var expect = chai.expect;

    // fake server for the ajax requests
    var server;

    // invoke before each test is executed
    function before() {

        server = sinon.fakeServer.create();
    }

    function after() {

        server.restore();
    }

    it('')
});
