import { Route } from "@route/Route"
import { Auth } from "@middleware/Auth"
import { ViewController } from "@controller/ViewController"
import { SessionController } from "@controller/SessionController"
import { log } from "@middleware/Logger"

export class View {

  public static register() {
    Route.middleware([Auth.require("/login"), log]).group((router, middleware) => {
      Route.sync('get', '/', middleware, ViewController.renderDashboard)
      Route.sync('get', '/dashboard', middleware, ViewController.renderDashboard)
      Route.sync('get', '/account', middleware, ViewController.renderAccount)
      Route.sync('get', '/settings', middleware, ViewController.renderSettings)
    })

    Route.middleware([Auth.verify("/dashboard"), log]).group((router, middleware) => {
      Route.sync('get', '/register', middleware, ViewController.renderRegister)
      Route.sync('get', '/login', middleware, ViewController.renderLogin)
    })

    Route.sync('get', '/logout', [SessionController.delete], ViewController.redirect("/login"))
    
    Route.sync('get', '/store', [],  ViewController.renderStore)
  }
}