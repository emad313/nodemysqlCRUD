const sql = require('../db.js');

var Customer = function(customer){
    this.name = customer.name,
    this.email = customer.email,
    this.phone= customer.phone,
    this.address = customer.address
};

Customer.getAll = function(result){
    sql.query("Select * from customers",function(err,res){
        if(err){
            console.log("error: ",err);
            result(null,err);
            return;
        }else{
            console.log("Customers: ", res);
            result(null,res);
        }
    })
};

Customer.create = function(newCustomer,result){
    sql.query("INSERT INTO customers SET ?", newCustomer,function(err,res){
        if(err){
            console.log("error: ",err);
            result(err,null);
            return;
        }else{
            console.log("Created customer: ",{id: res.insertId,...newCustomer});
            result(null,{id: res.insertId,...newCustomer});
        }
    });
};

Customer.findById = function(customerId, result){
    sql.query(`Select * from customers where id = ${customerId}`,function(err,res){
        if(err){
            console.log("error: ", err);
            result(err,null);
            return;
        }if(res.length){
            console.log("found customer: ", res[0]);
            result(null,res[0]);
            return;
        }
        result({kind: "not_found"},null);
    })
};

Customer.updateById = (id, customer, result) => {
    sql.query("UPDATE customers SET name = ?, email = ?, phone = ?, address = ? WHERE id = ?",
      [customer.name, customer.email, customer.phone,customer.address, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found Customer with the id
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("updated customer: ", { id: id, ...customer });
        result(null, { id: id, ...customer });
      }
    );
  };
  
  Customer.remove = (id, result) => {
    sql.query("DELETE FROM customers WHERE id = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found Customer with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted customer with id: ", id);
      result(null, res);
    });
  };
  
  Customer.removeAll = result => {
    sql.query("DELETE FROM customers", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log(`deleted ${res.affectedRows} customers`);
      result(null, res);
    });
  };

module.exports = Customer;