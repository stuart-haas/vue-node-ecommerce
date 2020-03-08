import { Response, Request, response } from "express"
import { getManager } from "typeorm"
import { Product } from "@entity/Product"

export interface CartItemCallback {
  (product:CartItem):void
}

export class CartItem {
  public id:number
  public sku:string
  public price:number
  public quantity:number
  public subtotal:number
  public name:string
  public image:string
  constructor(id:number, price:number, quantity:number, sku:string = '', name:string = '', image:string = ''){
    this.id = id
    this.image = image
    this.sku = sku
    this.name = name
    this.price = price
    this.quantity = quantity
    this.subtotal = price * quantity
  }
}

export class Cart {
  public items:Array<CartItem> = []
  public totalItems:number = 0
  public totalPrice:number = 0
  constructor() {}
}

export class CartService {

  static product(req:Request, callback:CartItemCallback) {
    const id = parseInt(req.params.id)
    const price = parseFloat(req.body.price)
    const quantity = parseInt(req.body.quantity)

    return callback(new CartItem(id, price, quantity))
  }

  static find(cart:Cart, product:CartItem) {
    return cart.items.find(item => {
      return item.id === product.id
    })
  }

  static add(cart:Cart, product:CartItem, quantity:number=0, subtotal:number=0) {
    if(!quantity && !subtotal) {
      cart.items.push(product)
    } else {
      product.quantity += quantity
      product.subtotal += subtotal
      let index = cart.items.findIndex(item => item.id === product.id)
      cart.items.splice(index, 1, product)
    }
    CartService.calculateTotals(cart)
  }

  static update(cart:Cart, product:CartItem, quantity:number, subtotal:number) {
    product.quantity = quantity
    product.subtotal = subtotal
    let index = cart.items.findIndex(item => item.id === product.id)
    cart.items.splice(index, 1, product)
    CartService.calculateTotals(cart)
  }

  static remove(cart:Cart, product:CartItem) {
    let index = cart.items.findIndex(item => item.id === product.id)
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

  static async merge(cart: Cart, items:Array<CartItem>) {
    for(var i = 0; i < items.length; i ++) {
      try {
        var cartItem:CartItem = items[i];
        var id = cartItem.id
        const productRepository = getManager().getRepository(Product)
        const product = await productRepository.findOne(id)
        cartItem.sku = product.sku
        cartItem.name = product.name
        cartItem.image = product.image
        let index = cart.items.findIndex(item => item.id === cartItem.id)
        cart.items.splice(index, 1, cartItem)
      } catch(error) {
        console.log(error)
      }
    }
    return cart
  }
}