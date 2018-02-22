var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "127.0.0.1",
  port: 3306,
  user: "root",
  password: "",
  database: "bamazondb"
});

function queryAllItems() {
  connection.query("Select * FROM products", function(err, res){
    console.log("---------");
    console.log("Product ID, Name, and Price");
    console.log("---------");
    for (var i = 0; i < res.length; i++){
      console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].price);
    }
    console.log("-----------------");
    askUser();
  });
}

queryAllItems();

function askUser()  {
  inquirer.prompt([
    {
      name: "id",
      type: "input",
      message: "What is the ID of the product you'd like to buy?"
      // validate: validateItem();
    },
    {
      name: "quantity",
      type: "input",
      message: "How many would you like to buy?"
    }
  ]).then(function(answer){
    // var query = 'SELECT `item_id`, `quantity` FROM `products` WHERE `?`';
      connection.query("SELECT * FROM products WHERE ?", { item_id: answer.id }, function(err, res) {

        for (var m = 0; m < res.length; m++){

          if (answer.quantity > res[m].stock_quantity) {
            console.log("INSUFFICIENT QUANTITY");
            askUser();
        } else {
          var quanUpd = res[m].stock_quantity - answer.quantity;
          var totalPrice = res[m].price * answer.quantity;

          function updateProduct(){
            connection.query('UPDATE `products` SET ? WHERE ?', [{ stock_quantity: quanUpd}, {item_id: answer.id }], function(err, res) {
                  console.log("YOUR ORDER HAS BEEN PLACED!");
                  console.log("total cost: $" + totalPrice);
                });
            };
          updateProduct();
          console.log("____________________");
          queryAllItems();
          };
      };
    });
  });
};

//validate the item id==========
// function validateItem(){
//     for (var k = 0; k < results.length; m++){
//     if (id = results[i].item_id){
//       console.log("Yes, " + results[i].item_id + " is an item!")
//     }
//     else {
//       console.log("Im sorry, that is not valid, please try again.");
//       askUser();
//     }
//   };
// };
// ========================
