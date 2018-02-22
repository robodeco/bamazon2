var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "127.0.0.1",
  port: 3306,
  user: "root",
  password: "",
  database: "bamazondb"
});

manInv();

function manInv(){
  inquirer.prompt({
    name: "action",
    type: "list",
    message: "What would you like to do?",
    choices:[
      "View Products for Sale",
      "View Low Inventory",
      "Add to Inventory",
      "Add New Product"
    ]
  }).then(function(answer){
      switch (answer.action) {
        case "View Products for Sale":
        return viewProd();

        case "View Low Inventory":
        return viewLow();

        case "Add to Inventory":
        return addInv();

        case "Add New Product":
        return addNew();

      }
  });
};

function viewProd(){
  connection.query("Select * FROM products", function(err, res) {
    console.log("---------");
    console.log("Product ID, Name, Price, Quantity");
    console.log("---------");
    for (var i = 0; i < res.length; i++){
      console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].price + " | " + res[i].stock_quantity);
    }
    console.log("-----------------");
    manInv();
  });
};

function viewLow(){
  var query = "SELECT product_name FROM products WHERE stock_quantity < 5 GROUP BY product_name";

  connection.query(query, function(err, res) {
    console.log("");
    console.log("the following products have reached less than 5 in quantity");
    console.log("==============================");
    for (var j = 0; j < res.length; j++) {
      console.log(res[j].product_name);
    }
    console.log("==============================");
    manInv();
  });
};

function addInv(){
  inquirer.prompt([
  {
    name: "item",
    type: "input",
    message: "What item ID are you adding to?"
  },
  {
    name: "add",
    type: "input",
    message: "How much are you adding?",
    validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      }
    ]).then(function(answer){
      var query = "UPDATE products SET stock_quantity = stock_quantity + ? WHERE item_id = ?";

      connection.query(query, [answer.add, answer.item], function(err, res) {
        console.log("========================");
        console.log("Product ID " + answer.item + " has increased in quantity by " + answer.add);
        console.log("========================");
        manInv();
      });
    })
};

function addNew(){
  inquirer.prompt([
    {
      name: "product",
      type: "input",
      message: "What is the name of the product you're adding?"
    },
    {
      name: "dept",
      type: "input",
      message: "Which department is it going to?"
    },
    {
      name: "cost",
      type: "input",
      message: "How much will it cost?"
    },
    {
      name: "quantity",
      type: "input",
      message: "How much will you keep in stock?"
    }
  ]).then(function(answer){
    var query = "INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES (?, ?, ?, ?)"

    connection.query(query, [answer.product, answer.dept, answer.cost, answer.quantity], function(err, res) {
      console.log("========================");
      console.log("a new product has been added successfully!");
      console.log("========================");
      manInv();
    });
  })
};
