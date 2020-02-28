import { Route } from "@route/Route"
import { UserController } from "@controller/UserController"
import { UserService } from "@service/UserService"
import { SessionController } from "@controller/SessionController"
import { CartController } from "@controller/CartController"
import { ProductController } from "@controller/ProductController"
import { ImageController } from "@controller/ImageController"
import { ImageService } from "@service/ImageService"
import { Auth } from "@middleware/Auth"
import { log } from "@middleware/Logger"

export class API {

  public static register() {
    Route.group({prefix: '/api/users', middleware: [log]}, (router, middleware) => {
      Route.api('get', '/', middleware, UserController.findAll)
      Route.api('get', '/email', middleware, UserController.findByEmail)
      Route.api('get', '/name', middleware, UserController.findByUsername)
      Route.api('post', '/register', [UserService.validateRegistration, UserService.validationResult, UserService.hashPassword], UserController.create)
      Route.api('post', '/login', [UserService.validateLogin, UserService.validationResult, SessionController.create], UserController.findBySession)
      Route.api('put', '/update', [UserService.validateUpdate, UserService.validationResult, UserService.hashPassword], UserController.update)
    })

    Route.group({prefix: '/api/cart', middleware: [log]}, (router, middleware) => {
      Route.api('post', '/add', middleware, CartController.add)
      Route.api('get', '/get', middleware, CartController.get)
      Route.api('put', '/update', middleware, CartController.update)
      Route.api('delete', '/remove', middleware, CartController.remove)
      Route.api('delete', '/clear', middleware, CartController.clear)
    })

    Route.group({prefix: '/api/products', middleware: [log]}, (router, middleware) => {
      Route.api('get', '/', middleware,  ProductController.findAll)
      Route.api('post', '/create', middleware, ProductController.create)
    })

    Route.group({prefix: '/api/images', middleware: [Auth.xhr, log]}, (router, middleware) => {
      Route.api('get', '/', middleware,  ImageController.findAll)
      Route.api('post', '/upload', [ImageService.uploadMultiple, ImageService.getMetaData, ImageController.create], async (req, res) => { await res.send({ data: "Upload complete" }) })
      Route.api('delete', '/:id', middleware, ImageController.delete)
    })
  }
} 