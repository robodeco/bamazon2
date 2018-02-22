# bamazon


The bamazon node application utilizes mysql in order to mockup a fake amazon program. The database program used was Sequel Pro on Mac.

Using bamazonCustomer.js, the user is able to see what is available for sale along with its price, select an item to buy, and select a desired quantity to purchase.

If the quantity the user selects exceeds stock, they are met with an "insufficient quantity" message and must go through the prompt again.

When a user completes their purchase they are greeted with the total cost of the purchase and the database in which all the information is stored. the database is updated in real time to reflect quantity.

The second application, bamazonManager.js, also utilizes mysql and allows manipulation of the database through the manager's perspective. Using this application the user is able to:

  - 1) view products for sale
  - 2) view low Inventory (inventory under 5 items)
  - 3) add stock to Inventory
  - 4) add new products to Inventory

Again, the database is updated in realtime.
