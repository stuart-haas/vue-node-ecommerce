import { ProductController } from "@controller/ProductController"

export const ProductRoute = [
  {
    path: "/products/create",
    method: "post",
    middleware: [],
    action: ProductController.create,
  },
  {
    path: "/products",
    method: "get",
    middleware: [],
    action: ProductController.findAll,
  }
]