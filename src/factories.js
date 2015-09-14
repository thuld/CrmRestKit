'use strict';
module.exports = {
    // creates an object that reprensts a entity-reference
    entityReference: function (id, opt_logicalName) {

        var reference = null;

        if ( id !== undefined && id !== null ) {

            reference = {
                __metadata: {
                    type: "Microsoft.Crm.Sdk.Data.Services.EntityReference"
                },
                Id: id
            };

            if ( opt_logicalName !== undefined && opt_logicalName !== null ) {

                reference.LogicalName = opt_logicalName;
            }
        }

        return reference;
    },
    // create an object that reprensts a option-set-value
    optionSetValue: function (optionSetValue) {

        return {
            __metadata: {
                type: 'Microsoft.Crm.Sdk.Data.Services.OptionSetValue'
            },
            Value: optionSetValue
        };
    },
	// create an object that represents an money value
	moneyValue: function (value) {

        return {
            __metadata: { type:
				'Microsoft.Crm.Sdk.Data.Services.Money'
			},
            Value: value
        };
    }
};
