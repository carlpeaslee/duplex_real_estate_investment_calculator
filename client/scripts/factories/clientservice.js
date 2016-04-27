chickApp.factory("ClientService", ["$http", function($http){
    var client = {};

    var getDefaults = function(){
        $http.get("/defaults").then(function(response){
            // client.defaults = response.data;
            var wtfMate = response.data;
            console.log(wtfMate);
        });
    };

    var submitEmail = function(){
        $http.post("/submit", data).then(function(response){
            //what should happen next?
        });
    };

    /* the following variable and function are for loading initial values
    into the DB if there are none. there should be no need to include
    them into the return object for this factory. */

    var initialValues = {
        monthly_rent_def: 9999999999999999,
        monthly_rent_min: 9999999999999999,
        monthly_rent_max: 9999999999999999,
        buying_budget_def: 9999999999999999,
        buying_budget_min: 9999999999999999,
        buying_budget_max: 9999999999999999,
        estimated_rental_income_def: 9999999999999999,
        estimated_rental_income_min: 9999999999999999,
        estimated_rental_income_max: 9999999999999999,
        amortization_interest_rate_def: 9999999999999999,
        amortization_interest_rate_min: 9999999999999999,
        amortization_interest_rate_max: 9999999999999999,
        downpayment_def: 9999999999999999,
        downpayment_min: 9999999999999999,
        downpayment_max: 9999999999999999,
        property_taxes_def: 9999999999999999,
        property_taxes_min: 9999999999999999,
        property_taxes_max: 9999999999999999,
        toggle_married_or_single: 'Single',
        annual_income_def: 9999999999999999,
        annual_income_min: 9999999999999999,
        annual_income_max: 9999999999999999,
        maintainence_costs_def: 9999999999999999,
        maintainence_costs_min: 9999999999999999,
        maintainence_costs_max: 9999999999999999,
        additional_monthly_expenses_def: 9999999999999999,
        additional_monthly_expenses_min: 9999999999999999,
        additional_monthly_expenses_max: 9999999999999999,
        home_value_increase_def: 9999999999999999,
        home_value_increase_min: 9999999999999999,
        home_value_increase_max: 9999999999999999,
        rental_increase_def: 9999999999999999,
        rental_increase_min: 9999999999999999,
        rental_increase_max: 9999999999999999,
        auto_calc_depreciation_def: 9999999999999999,
        auto_calc_depreciation_min: 9999999999999999,
        auto_calc_depreciation_max: 9999999999999999
    };

    var checkIfThereIsData = function(){
        $http.get('/checkDB').then(function(response){
            var bool = response.data;
            if(bool == false){
                $http.post('/defaults', initialValues).then(function(response){
                    getDefaults();
                });
            }else{
                getDefaults();
            }
        });
    };
    checkIfThereIsData();
    return {
        client: client,
        getDefaults: getDefaults,
        submitEmail: submitEmail
    };
}]);
