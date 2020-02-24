export class CartService {

  static product(req) {
    let price = parseFloat(req.query.price)
    let quantity = parseInt(req.query.quantity)

    return {
      sku: req.query.sku,
      price: price,
      quantity: quantity,
      subtotal: price * quantity
    }
  }

  static find(cart, product) {
    return cart.items.find(item => {
      return item.sku === product.sku
    })
  }

  static add(cart, product, quantity?, subtotal?) {
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

  static update(cart, product, quantity, subtotal) {
    product.quantity = quantity
    product.subtotal = subtotal
    let index = cart.items.findIndex(item => item.sku === product.sku)
    cart.items.splice(index, 1, product)
    CartService.calculateTotals(cart)
  }

  static remove(cart, product) {
    let index = cart.items.findIndex(item => item.sku === product.sku)
    cart.items.splice(index, 1)
    CartService.calculateTotals(cart)
  }

  static clear(req) {
    if(req.session) {
      req.session.cart.items = []
      req.session.cart.totalPrice = 0
      req.session.cart.totalItems = 0
      return req.session.cart
    }
  }

  static session(req) {
    return req.session.cart ||  { items: [], totalItems: 0, totalPrice: 0 }
  }

  static calculateTotals(cart) {
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
  
  static save(req, res, cart) {
    req.session.cart = cart
    req.session.save((err) => { 
      if(err){ throw err }       
      res.json(req.session.cart)
    })
  }
}