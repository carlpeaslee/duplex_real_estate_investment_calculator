chickApp.factory("ClientService", ["$http", function($http){
    var client = {};

    var alterDefaults = function(object){
        $http.put('/defaults/' + object._id, object);
    };

    var getDefaults = function(){
        $http.get("/defaults").then(function(response){
            client.defaults = response.data[0];
        });
    };

    var submitEmail = function(){
        $http.post("/submit", data).then(function(response){
            //TODO what should happen next?
        });
    };

    /* the following variable and function are for loading initial values
    into the DB if there are none. there should be no need to include
    them into the return object for this factory. */

    var initialValues = {
        monthly_rent_def: 999,
        monthly_rent_min: 999,
        monthly_rent_max: 999,
        buying_budget_def: 999,
        buying_budget_min: 999,
        buying_budget_max: 999,
        estimated_rental_income_def: 999,
        estimated_rental_income_min: 999,
        estimated_rental_income_max: 999,
        amortization_interest_rate_def: 999,
        amortization_interest_rate_min: 999,
        amortization_interest_rate_max: 999,
        downpayment_def: 999,
        downpayment_min: 999,
        downpayment_max: 999,
        property_taxes_def: 999,
        property_taxes_min: 999,
        property_taxes_max: 999,
        toggle_married_or_single: 'Single',
        annual_income_def: 999,
        annual_income_min: 999,
        annual_income_max: 999,
        maintainence_costs_def: 999,
        maintainence_costs_min: 999,
        maintainence_costs_max: 999,
        additional_monthly_expenses_def: 999,
        additional_monthly_expenses_min: 999,
        additional_monthly_expenses_max: 999,
        home_value_increase_def: 999,
        home_value_increase_min: 999,
        home_value_increase_max: 999,
        rental_increase_def: 999,
        rental_increase_min: 999,
        rental_increase_max: 999,
        auto_calc_depreciation_def: 999,
        auto_calc_depreciation_min: 999,
        auto_calc_depreciation_max: 999
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
        alterDefaults: alterDefaults,
        client: client,
        getDefaults: getDefaults,
        submitEmail: submitEmail
    };
}]);
