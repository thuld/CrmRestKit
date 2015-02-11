/*globals describe, it, chai*/

'use strict';
describe("CrmRestKit module API", function(){

    var expect = chai.expect;

    it('should provided the public member "Create"', function(){

        expect(CrmRestKit.Create).to.a('function');
    });

    it('should provided the public member "Update"', function(){

        expect(CrmRestKit.Update).to.a('function');
    });

	it('should provided the public member "Delete"', function(){

		expect(CrmRestKit.Delete).to.a('function');
	});

	it('should provided the public member "Retrieve"', function(){

		expect(CrmRestKit.Retrieve).to.a('function');
	});

	it('should provided the public member "ByQuery"', function(){

		expect(CrmRestKit.ByQuery).to.a('function');
	});

	it('should provided the public member "ByQueryUrl"', function(){

		expect(CrmRestKit.ByQueryUrl).to.a('function');
	});

	it('should provided the public member "ByQueryAll"', function(){

		expect(CrmRestKit.ByQueryAll).to.a('function');
	});
});
