(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}]},{},[1]);
