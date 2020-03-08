import { CartService, CartItem } from "@service/CartService"
import { Response, Request } from "express"

export class CartController {

  public static async add(req:Request, res:Response) {
    const cart = CartService.session(req)
    CartService.product(req, (nProduct:CartItem) => {
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
    })
  }

  public static async get(req:Request, res:Response) {
    if(req['session'].cart && req['session'].cart.items.length) {
      const cart = CartService.session(req)
      const nCart = CartService.merge(cart)
      nCart.then(response => {
        res.status(200).send({status: 200, data: response})
      })
    } else {
      res.status(200).send({status: 200, error: 'Your cart is empty'})
    }
  }

  public static async update(req:Request, res:Response) {
    const cart = CartService.session(req)
    CartService.product(req, (product:CartItem) => {
      CartService.update(cart, product, product.quantity, product.subtotal)
      CartService.save(req, res, cart)
    })
  }

  public static async remove(req:Request, res:Response) {
    const cart = CartService.session(req)
    CartService.product(req, (product:CartItem) => {
      CartService.remove(cart, product)
      CartService.save(req, res, cart)
    })
  }

  public static async clear(req:Request, res:Response) {
    const cart = CartService.session(req)
    CartService.clear(req)
    CartService.save(req, res, cart)
  }
}