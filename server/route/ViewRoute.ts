import { Auth } from "@middleware/Auth"
import { ViewController } from "@controller/ViewController"
import { SessionController } from "@controller/SessionController"

export const ViewRoute = [
  {
    path: "/",
    method: "get",
    middleware: [ Auth.require("/login") ],
    action: ViewController.renderDashboard
  },
  {
    path: "/dashboard",
    method: "get",
    middleware: [ Auth.require("/login") ],
    action: ViewController.renderDashboard
  },
  {
    path: "/account",
    method: "get",
    middleware: [ Auth.require("/login") ],
    action: ViewController.renderAccount
  },
  {
    path: "/settings",
    method: "get",
    middleware: [ Auth.require("/login") ],
    action: ViewController.renderSettings
  },
  {
    path: "/register",
    method: "get",
    middleware: [ Auth.verify("/dashboard") ],
    action: ViewController.renderRegister
  },
  {
    path: "/login",
    method: "get",
    middleware: [ Auth.verify("/dashboard") ],
    action: ViewController.renderLogin
  },
  {
    path: "/logout",
    method: "get",
    middleware: [ SessionController.delete ],
    action: ViewController.redirect("/login")
  },
  {
    path: "/store",
    method: "get",
    middleware: [],
    action: ViewController.renderStore
  }
]