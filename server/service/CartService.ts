import { Response, Request } from "express"

export interface ProductCallback {
  (product:Product):void
}

export class Product {
  public sku:string
  public price:number
  public quantity:number
  public subtotal:number
  constructor(sku:string, price:number, quantity:number){
    this.sku = sku
    this.price = price
    this.quantity = quantity
    this.subtotal = price * quantity
  }
}

export class Cart {
  public items:Array<Product> = []
  public totalItems:number = 0
  public totalPrice:number = 0
  constructor() {}
}

export class CartService {

  static product(req:Request, callback:ProductCallback) {
    let price = parseFloat(req.query.price)
    let quantity = parseInt(req.query.quantity)

    return callback(new Product(req.query.sku, price, quantity))
  }

  static find(cart:Cart, product:Product) {
    return cart.items.find(item => {
      return item.sku === product.sku
    })
  }

  static add(cart:Cart, product:Product, quantity:number=0, subtotal:number=0) {
    if(!quantity && !subtotal) {
      cart.items.push(product)
    } else {
      product.quantity += quantity
      product.subtotal += subtotal
      let index = cart.items.findIndex(item => item.sku === product.sku)
      cart.items.splice(index, 1, product)
    }
    CartService.calculateTotals(cart)
  }

  static update(cart:Cart, product:Product, quantity:number, subtotal:number) {
    product.quantity = quantity
    product.subtotal = subtotal
    let index = cart.items.findIndex(item => item.sku === product.sku)
    cart.items.splice(index, 1, product)
    CartService.calculateTotals(cart)
  }

  static remove(cart:Cart, product:Product) {
    let index = cart.items.findIndex(item => item.sku === product.sku)
    cart.items.splice(index, 1)
    CartService.calculateTotals(cart)
  }

  static clear(req:Request) {
    if(req['session']) {
      req['session'].cart.items = []
      req['session'].cart.totalPrice = 0
      req['session'].cart.totalItems = 0
      return req['session'].cart
    }
  }

  static session(req:Request) {
    return req['session'].cart || new Cart()
  }

  static calculateTotals(cart:Cart) {
    cart.totalPrice = 0
    cart.totalItems = 0
    cart.items.forEach(item => {
      let price = item.price
      let quantity = item.quantity
      let amount = price * quantity
      cart.totalPrice += amount
      cart.totalItems += quantity
    });
  }
  
  static save(req:Request, res:Response, cart:Cart) {
    req['session'].cart = cart
    req['session'].save((err:Error) => { 
      if(err){ throw err }       
      res.status(200).send({status: 200, data: req['session'].cart})
    })
  }
}