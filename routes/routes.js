module.exports = function(app){
    const customers = require('../controller/controller.js');
    app.get('/customers',customers.findAll);
    app.post('/customers',customers.createCustomer);
    app.get('/customers/:customerId', customers.findOne);
    app.put("/customers/:customerId", customers.update);
    app.delete("/customers/:customerId", customers.delete);
    app.delete("/customers", customers.deleteAll);
}