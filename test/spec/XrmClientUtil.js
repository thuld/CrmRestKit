/*globals describe, it, chai */

'use strict';
var xrmclientUtil = require('./xrmClientUtil');

describe('AP of the module', function(){

	var expect = chai.expect;

	it('should provid the public member "getODataEndpointUrl"', function(){

		expect(xrmclientUtil.getODataEndpointUrl).to.be.a('function');
	});
});
