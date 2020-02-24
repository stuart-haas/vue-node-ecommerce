import { CartService } from '@service/CartService';

export class CartController {

  public static async add(req, res) {
    const cart = CartService.session(req)
    const nProduct = CartService.product(req)
    if(cart.items.length == 0) {
      CartService.add(cart, nProduct)
    } else {
      const product = CartService.find(cart, nProduct)
      if(product) {
        CartService.add(cart, product, nProduct.quantity, nProduct.subtotal)
      } else {
        CartService.add(cart, nProduct)
      }
    }
    CartService.save(req, res, cart)
  }

  public static async get(req, res) {
    res.json(req.session.cart)
  }

  public static async update(req, res) {
    const cart = CartService.session(req)
    const product = CartService.product(req)
    CartService.update(cart, product, product.quantity, product.subtotal)
    CartService.save(req, res, cart)
  }

  public static async remove(req, res) {
    const cart = CartService.session(req)
    const product = CartService.product(req)
    CartService.remove(cart, product)
    CartService.save(req, res, cart)
  }

  public static async clear(req, res) {
    const cart = CartService.session(req)
    CartService.clear(req)
    CartService.save(req, res, cart)
  }
}