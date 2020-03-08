import { Route } from "@service/RouteService"
import { Auth } from "@middleware/Auth"
import { ViewController } from "@controller/ViewController"
import { SessionController } from "@controller/SessionController"
import { UserController } from "@controller/UserController"
import { UserService } from "@service/UserService"
import { CartController } from "@controller/CartController"
import { ProductController } from "@controller/ProductController"
import { log } from "@middleware/Logger"

export class Routes {

  public static register() {

    Route.root('/api', (router) => {
      Route.group({prefix: '/users', middleware: [log]}, (router, middleware) => {
        Route.async('get', '/', [log, Auth.require()], UserController.findAll)
        Route.async('get', '/email', middleware, UserController.findByEmail)
        Route.async('get', '/name', middleware, UserController.findByUsername)
        Route.async('post', '/register', [UserService.validateRegistration, UserService.validationResult, UserService.hashPassword], UserController.create)
        Route.async('post', '/login', [UserService.validateLogin, UserService.validationResult, SessionController.create], UserController.findBySession)
        Route.async('put', '/update', [UserService.validateUpdate, UserService.validationResult, UserService.hashPassword], UserController.update)
      })

      Route.group({prefix: '/cart', middleware: [log]}, (router, middleware) => {
        Route.async('get', '/', middleware, CartController.get)
        Route.async('post', '/:id', middleware, CartController.add)
        Route.async('put', '/:id', middleware, CartController.update)
        Route.async('delete', '/:id', middleware, CartController.remove)
        Route.async('delete', '/', middleware, CartController.clear)
      })
  
      Route.group({prefix: '/products', middleware: [log]}, (router, middleware) => {
        Route.async('get', '/', middleware,  ProductController.findAll)
        Route.async('post', '/', middleware, ProductController.create)
        Route.async('delete', '/', middleware, ProductController.delete)
        Route.async('post', '/seed', middleware,  ProductController.seed)
      })
    })

    Route.middleware([Auth.require('/login'), log]).group((router, middleware) => {
      Route.sync('get', '/', middleware, ViewController.renderDashboard)
      Route.sync('get', '/dashboard', middleware, ViewController.renderDashboard)
      Route.sync('get', '/account', middleware, ViewController.renderAccount)
      Route.sync('get', '/settings', middleware, ViewController.renderSettings)
    })

    Route.middleware([Auth.verify('/dashboard'), log]).group((router, middleware) => {
      Route.sync('get', '/register', middleware, ViewController.renderRegister)
      Route.sync('get', '/login', middleware, ViewController.renderLogin)
    })

    Route.sync('get', '/logout', [SessionController.delete], Route.redirect("/login"))
    
    Route.sync('get', '/store', [],  ViewController.renderStore)
  }
}