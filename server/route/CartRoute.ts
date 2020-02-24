import { CartController } from '@controller/CartController'

export const CartRoute = [
  {
    path: "/cart/add",
    method: "post",
    middleware: [],
    action: CartController.add
  },
  {
    path: "/cart/get",
    method: "get",
    middleware: [],
    action: CartController.get
  },
  {
    path: "/cart/update",
    method: "put",
    middleware: [],
    action: CartController.update
  },
  {
    path: "/cart/remove",
    method: "delete",
    middleware: [],
    action: CartController.remove
  },
  {
    path: "/cart/clear",
    method: "delete",
    middleware: [],
    action: CartController.clear
  }
]