import { AuthService } from "@service/AuthService"
import { ViewController } from "@controller/ViewController"
import { SessionController } from "@controller/SessionController"

export const ViewRoute = [
  {
    path: "/",
    method: "get",
    middleware: [ AuthService.requireAuthentication("/login") ],
    action: ViewController.renderDashboard
  },
  {
    path: "/dashboard",
    method: "get",
    middleware: [ AuthService.requireAuthentication("/login") ],
    action: ViewController.renderDashboard
  },
  {
    path: "/account",
    method: "get",
    middleware: [ AuthService.requireAuthentication("/login") ],
    action: ViewController.renderAccount
  },
  {
    path: "/settings",
    method: "get",
    middleware: [ AuthService.requireAuthentication("/login") ],
    action: ViewController.renderSettings
  },
  {
    path: "/register",
    method: "get",
    middleware: [ AuthService.checkAuthentication("/dashboard") ],
    action: ViewController.renderRegister
  },
  {
    path: "/login",
    method: "get",
    middleware: [ AuthService.checkAuthentication("/dashboard") ],
    action: ViewController.renderLogin
  },
  {
    path: "/logout",
    method: "get",
    middleware: [ SessionController.delete ],
    action: ViewController.redirect("/login")
  }
]