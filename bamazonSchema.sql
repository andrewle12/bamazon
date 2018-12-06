DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products(
item_id INT NOT NULL AUTO_INCREMENT,
product_name VARCHAR(100) NOT NULL,
department_name VARCHAR(50),
price DECIMAL(10,2) NOT NULL,
stock_quantity INT NOT NULL,
PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES 
("Bananas", "Produce", 1.29, 75),
("Toilet Paper", "Household", 5.79, 36),
("Rope","Tools", 12.49, 5),
("Ski Mask","Clothing", 4.39, 8),
("Ladder","Tools", 34.99, 2),
("Crowbar","Tools", 10.49, 3),
("Winrar","Software", 39.99, 120),
("Monopoly","Toys", 14.99, 8),
("Sharknado","Entertainment", 1.99, 1),
("Pens","Supplies", 2.99, 50);

SELECT*FROM products;