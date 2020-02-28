import { CartService, Product } from "@service/CartService"
import { Response, Request } from "express"

export class CartController {

  public static async add(req:Request, res:Response) {
    const cart = CartService.session(req)
    CartService.product(req, (nProduct:Product) => {
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
    res.json(req['session'].cart)
  }

  public static async update(req:Request, res:Response) {
    const cart = CartService.session(req)
    CartService.product(req, (product:Product) => {
      CartService.update(cart, product, product.quantity, product.subtotal)
      CartService.save(req, res, cart)
    })
  }

  public static async remove(req:Request, res:Response) {
    const cart = CartService.session(req)
    CartService.product(req, (product:Product) => {
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