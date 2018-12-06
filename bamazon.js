//Dependencies
var mysql = require("mysql");
var inquirer = require("inquirer");

//Connection for the mySQL Database and server
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "default",
  password: "",
  database: "bamazon_DB"
});

connection.connect(function(err) {
  if (err) throw err;

  // Start function for user Inquirer prompts
  start();
});

//Current shopping cart totals
var runningPrice = 0;
var runningStock = 0;

//Building the list of items
function start() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    console.log(
      "--------------------------------------------------------------------------------"
    );
    for (var i = 0; i < res.length; i++) {
      console.log(
        "ID: " +
          res[i].item_id +
          " | Product: " +
          res[i].product_name +
          " | Department: " +
          res[i].department_name +
          " | Price: " +
          res[i].price +
          " | Stock: " +
          res[i].stock_quantity
      );
      console.log(
        "--------------------------------------------------------------------------------"
      );
    }

    //Start of user inputs
    inquirer
    .prompt([
      {
        name: "item",
        type: "input",
        message:
          "Welcome to Bamazon! What would you like to purchase today? (Enter item ID)"
      },
      {
        name: "amount",
        type: "input",
        message: "How many would you like to purchase?"
      }
    ])
    .then(function(answer) {
      var item = parseInt(answer.item)-1;
        if(answer.amount<=res[item].stock_quantity){
            console.log("Got it, order placed!");
            runningPrice+=parseFloat(res[item].price*answer.amount);
            runningPrice = Math.round(runningPrice * 100) / 100;
            runningStock+=parseInt(answer.amount);
        } else {
            console.log("Sorry, we don't have enough in stock");
        }
        console.log("Your current total for these "+runningStock+" items is $"+runningPrice);
        inquirer
        .prompt([
          {
            name: "continue",
            type: "input",
            message:
              "Continue Shopping? (Y/N)",
            default: "Y"
          }
         
        ]).then(function(answer){
            if(answer.continue==="Y"){
                start();
                
            }else{
                console.log("Your final total for these "+runningStock+" items is $"+runningPrice+"\nHave a nice day!");
            }
        })
    });
  });

}
