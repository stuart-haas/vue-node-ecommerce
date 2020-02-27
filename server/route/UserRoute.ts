import { UserController } from "@controller/UserController"
import { UserService } from "@service/UserService"
import { SessionController } from "@controller/SessionController"

export const UserRoute = [
  {
    path: "/users",
    method: "get",
    middleware: [],
    action: UserController.findAll,
  },
  {
    path: "/users/email",
    method: "get",
    middleware: [],
    action: UserController.findByEmail,
  },
  {
    path: "/users/name",
    method: "get",
    middleware: [],
    action: UserController.findByUsername,
  },
  {
    path: "/users/register",
    method: "post",
    middleware: [ UserService.validateRegistration, UserService.validationResult, UserService.hashPassword ],
    action: UserController.create,
  },
  {
    path: "/users/login",
    method: "post",
    middleware: [ UserService.validateLogin, UserService.validationResult, SessionController.create ],
    action: UserController.findBySession
  },
  {
    path: "/users/update",
    method: "post",
    middleware: [ UserService.validateUpdate, UserService.validationResult, UserService.hashPassword ],
    action: UserController.update
  }
]