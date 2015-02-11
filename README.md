Project Description
-----------
Based on the idea of the CrmServiceToolkit (Daniel Cai) and provides basic CRUD operations for the
Dynamcis CRM 2011 REST /ODATA web-services endpoit.

###Breaking Changes with version 3.x
The API of the module has changed:
- Use `GetById` instead of `Retrieve`
- Use `GetByQuery` instead of `ByQuery`
- Use `GetByQueryUrl` instead of `ByQueryUrl`

The option parameter `opt_asyn` is not supported by version 3.x. All method will perform asynchronous operation. In case you need a certain operation to be performed in synchronous mode, use the method with the `Sync` postfix:
- `GetByIdSync`
- `GetByQuerySync`
- `GetByQueryUrlSync`
- `CreateSync`
- `DeleteSync`
- `UpdateSync`

Dynamics CRM 2013
-----------
All unit-tests are passed /green for CRM 2013 Online (tested with the CrmRestKit-2.6.1.js).

Roadmap
-----------
The next major release (3.0) of the CrmRestKit.js requires some fundamental changes:
- Eliminate the jQuery dependency
- when.js (https://github.com/cujojs/when) instead of jQuery for the promise-pattern
- Jasmine (http://pivotal.github.io/jasmine/) as unit-testing framework instead of QUnit
- “Real” unit-tests with mocks/stubs
- Prototypes (CrmRestKit.Prototype.Create)
- Performance
- Namespace changes (e.g. CrmRestKit.util.ParseODataDate)
