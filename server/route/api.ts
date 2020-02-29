import { Route } from "@route/Route"
import { UserController } from "@controller/UserController"
import { UserService } from "@service/UserService"
import { SessionController } from "@controller/SessionController"
import { CartController } from "@controller/CartController"
import { ProductController } from "@controller/ProductController"
import { ImageService } from "@service/ImageService"
import { Auth } from "@middleware/Auth"
import { log } from "@middleware/Logger"

export class API {

  public static register() {
    Route.group({prefix: '/api/users', middleware: [log]}, (router, middleware) => {
      Route.async('get', '/', middleware, UserController.findAll)
      Route.async('get', '/email', middleware, UserController.findByEmail)
      Route.async('get', '/name', middleware, UserController.findByUsername)
      Route.async('post', '/register', [UserService.validateRegistration, UserService.validationResult, UserService.hashPassword], UserController.create)
      Route.async('post', '/login', [UserService.validateLogin, UserService.validationResult, SessionController.create], UserController.findBySession)
      Route.async('put', '/update', [UserService.validateUpdate, UserService.validationResult, UserService.hashPassword], UserController.update)
    })

    Route.group({prefix: '/api/cart', middleware: [log]}, (router, middleware) => {
      Route.async('post', '/add', middleware, CartController.add)
      Route.async('get', '/get', middleware, CartController.get)
      Route.async('put', '/update', middleware, CartController.update)
      Route.async('delete', '/remove', middleware, CartController.remove)
      Route.async('delete', '/clear', middleware, CartController.clear)
    })

    Route.group({prefix: '/api/products', middleware: [log]}, (router, middleware) => {
      Route.async('get', '/', middleware,  ProductController.findAll)
      Route.async('post', '/create', middleware, ProductController.create)
    })

    Route.match(['get', 'post'], '/api/test', (router, method, path) => {
      Route.async(method, path, [log],  ProductController.findAll)
    })
  }
} 