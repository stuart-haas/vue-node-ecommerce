import { Route } from "@route/Route"
import { Auth } from "@middleware/Auth"
import { ViewController } from "@controller/ViewController"
import { SessionController } from "@controller/SessionController"
import { log } from "@middleware/Logger"

export class View {

  public static register() {
    Route.middleware([Auth.require("/login"), log]).group((router, middleware) => {
      Route.view('get', '/', middleware, ViewController.renderDashboard)
      Route.view('get', '/dashboard', middleware, ViewController.renderDashboard)
      Route.view('get', '/account', middleware, ViewController.renderAccount)
      Route.view('get', '/settings', middleware, ViewController.renderSettings)
    })

    Route.middleware([Auth.verify("/dashboard"), log]).group((router, middleware) => {
      Route.view('get', '/register', middleware, ViewController.renderRegister)
      Route.view('get', '/login', middleware, ViewController.renderLogin)
    })

    Route.view('get', '/logout', [SessionController.delete], ViewController.redirect("/login"))
    
    Route.view('get', '/store', [],  ViewController.renderStore)
  }
}