import { Route } from "@service/RouteService"
import { Auth } from "@middleware/Auth"
import { ViewController } from "@controller/ViewController"
import { SessionController } from "@controller/SessionController"
import { UserController } from "@controller/UserController"
import { UserService } from "@service/UserService"
import { CartController } from "@controller/CartController"
import { ProductController } from "@controller/ProductController"
import { log } from "@middleware/Logger"
import { Request, Response } from "express"

export class Routes {

  public static register() {
    Route.root('/api', () => {
      Route.group({prefix: '/users', middleware: [log]}, (router, middleware) => {
        Route.async('get', '/', middleware, UserController.findAll)
        Route.async('get', '/email', middleware, UserController.findByEmail)
        Route.async('get', '/name', middleware, UserController.findByUsername)
        Route.async('post', '/register', [UserService.validateRegistration, UserService.validationResult, UserService.hashPassword], UserController.create)
        Route.async('post', '/login', [UserService.validateLogin, UserService.validationResult, SessionController.create], UserController.findBySession)
        Route.async('put', '/update', [UserService.validateUpdate, UserService.validationResult, UserService.hashPassword], UserController.update)
      })

      Route.group({prefix: '/cart', middleware: [log]}, (router, middleware) => {
        Route.async('post', '/add', middleware, CartController.add)
        Route.async('get', '/get', middleware, CartController.get)
        Route.async('put', '/update', middleware, CartController.update)
        Route.async('delete', '/remove', middleware, CartController.remove)
        Route.async('delete', '/clear', middleware, CartController.clear)
      })
  
      Route.group({prefix: '/products', middleware: [log]}, (router, middleware) => {
        Route.async('get', '/', middleware,  ProductController.findAll)
        Route.async('post', '/create', middleware, ProductController.create)
      })
  
      Route.match(['get', 'post'], '/test', (router, method, path) => {
        Route.sync(method, path, [log],  (req:Request, res:Response) => res.send("Hello World!"))
      })
    })

    Route.middleware([Auth.require(), log]).group((router, middleware) => {
      Route.sync('get', '/', middleware, ViewController.renderDashboard)
      Route.sync('get', '/dashboard', middleware, ViewController.renderDashboard)
      Route.sync('get', '/account', middleware, ViewController.renderAccount)
      Route.sync('get', '/settings', middleware, ViewController.renderSettings)
    })

    Route.middleware([Auth.verify(), log]).group((router, middleware) => {
      Route.sync('get', '/register', middleware, ViewController.renderRegister)
      Route.sync('get', '/login', middleware, ViewController.renderLogin)
    })

    Route.sync('get', '/logout', [SessionController.delete], Route.redirect("/login"))
    
    Route.sync('get', '/store', [],  ViewController.renderStore)
  }
}