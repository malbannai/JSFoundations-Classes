/**************************************************************
 * Point: defines a point on the map using X and Y coordinates
 *
 * x: x coordinate
 * y: y coordinate
 *
 * distanceTo(point): takes a point, calculates the distance to
 *                     that point from the current point.
 *
 * let point = new Point(x, y);
 ****************************************************************/
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  // takes a point
  distanceTo = (point) => {
    let xDelta = this.x - point.x;
    let yDelta = this.y - point.y;
    return Math.sqrt(xDelta * xDelta + yDelta * yDelta); // PYTHAGORAS!
  }; // returns the distance

  equals = (point) => point.x === this.x && point.y === this.y;

  static randomPoint = (maxX, maxY) => {
    let x = Math.random() * (maxX || 100);
    let y = Math.random() * (maxY || 100);
    return new Point(x, y);
  };
}

/**********************************************************
 * Wallet: keeps track of money
 *
 * money: how much money is in the wallet. Defaults to 0.
 *
 * credit(amount): adds `amount` to `money`.
 *
 * debit(amount): subtracts `amount` from `money`.
 *
 * let wallet = new Wallet(money);
 **********************************************************/
class Wallet {
  // implement Wallet!
  constructor(money = 0) {
    this.money = money;
  }
  // no need for a return in arrow functions
  credit = (amount) => (this.money = amount + this.money);
  debit = (amount) => (this.money = this.money - amount);
}

/**********************************************************
 * Person: defines a person with a name (and feelings)
 *
 * name: name of said person
 * location: a Point
 * wallet: a Wallet instance initially with 0.
 *
 * moveTo(point): updates the `location` to `point`
 *
 * let person = new Person(name, x, y);
 **********************************************************/
class Person {
  // implement Person!
  constructor(name, x, y, wallet = 0) {
    this.name = name;
    this.location = new Point(x, y); // location will accept x,y and place them in location
    this.wallet = new Wallet(wallet); // location and wallet are instance that calls others
  }
  //location will accept the new point given and change the value it has
  moveTo = (point) => (this.location = point);
}

/**********************************************************
 * Vendor: defines a vendor
 * Subclasses Person
 *
 * range: the maximum distance this vendor can travel - initially 5
 * price: the cost of a single ice cream - initially 1
 *
 * sellTo(customer, numberOfIceCreams):  sells a specific number of ice creams
 *     to the customer by doing the following:
 *         - Moves to the customer's location
 *         - Transfers money from the customer's wallet
 *           to the vendor's wallet
 *
 * new vendor = new Vendor(name, x, y);
 **********************************************************/
class Vendor extends Person {
  // implement Vendor!
  constructor(name, x, y, range = 5, price = 1) {
    super(name, x, y);
    this.range = range;
    this.price = price;
  }
  //this in price is needed for when the price changes
  sellTo = (customer, numberOfIceCreams) => {
    // give the vendor then take from the customar
    this.wallet.credit(numberOfIceCreams * this.price);
    customer.wallet.debit(numberOfIceCreams * this.price);
    // moving the vendor from his location to the customers location
    this.moveTo(customer.location);
  };
}

/**********************************************************
 * Customer: defines a customer
 * Subclasses Person
 *
 * wallet: a Wallet instance initially with 10.
 *
 * _isInRange(vendor): checks if the customer is in range of vendor.
 *
 * _haveEnoughMoney(vendor, numberOfIceCreams): checks if the customer
 *     has enough money to buy a specific number of ice creams from vendor.
 *
 * requestIceCream(vendor, numberOfIceCreams): if the customer is in the vendor's
 *     range and has enough money for ice cream, a request is sent to the vendor.
 *
 * new customer = new Customer(name, x, y);
 **********************************************************/
class Customer extends Person {
  // implement Customer!
  constructor(name, x, y, wallet = 10) {
    super(name, x, y);
    //Assign wallet its cost
    this.wallet = new Wallet(wallet);
  }
  // _ is important
  // ooooooooh I have a function in class point that measures the range
  // this.location => Customer location
  // distanceTo returns a numberthat I will compaire with the range of the vendor
  _isInRange = (vendor) =>
    this.location.distanceTo(vendor.location) <= vendor.range;
  _haveEnoughMoney = (vendor, numberOfIceCreams) =>
    this.wallet.money >= numberOfIceCreams * vendor.price;
  requestIceCream = (vendor, numberOfIceCreams) => {
    this._isInRange(vendor) && this._haveEnoughMoney(vendor, numberOfIceCreams)
      ? vendor.sellTo(this, numberOfIceCreams)
      : "Sorry you are either to far, or can not afford my expensive icecream";
  };
}

export { Point, Wallet, Person, Customer, Vendor };

/***********************************************************
 * If you want examples of how to use the
 * these classes and how to test your code manually,
 * check out the README.md file
 ***********************************************************/
