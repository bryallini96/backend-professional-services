const got = require('got');
const currencyCtrl = {};
const apiUrl = 'https://api.cambio.today/v1/quotes/';
const apiKey = '2625|h13rxxf3XRri~hs_hxjgVz1MjOk4vx88';

currencyCtrl.getExchangeUsdToMxn = async (req, res) => {
    const response = await got(apiUrl + 'USD/MXN/json?quantity=' + req.params.quantity + '&key=' + apiKey);
    console.log("Getting exchange from API CAMBIO TODAY " + response.body);
    const json = JSON.parse(response.body);
    res.json({source: json.result.source, value: json.result.value, target: json.result.target, amount: json.result.amount});
    console.log("Exchange: " + req.params.quantity + "USD to: " + json.result.amount + "MXN");
};

currencyCtrl.getExchangeMxnToUsd = async (req, res) => {
    const response = await got(apiUrl + 'MXN/USD/json?quantity=' + req.params.quantity + '&key=' + apiKey);
    console.log("Getting exchange from API CAMBIO TODAY" + response.body);
    const json = JSON.parse(response.body);
    res.json({source: json.result.source, value: json.result.value, target: json.result.target, amount: json.result.amount});
    console.log("Exchange: " + req.params.quantity + "MXN to: " + json.result.amount + "USD");
};

module.exports = currencyCtrl;
