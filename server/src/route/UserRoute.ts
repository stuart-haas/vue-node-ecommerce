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
    path: "/users/:id",
    method: "get",
    middleware: [],
    action: UserController.findById,
  },
  {
    path: "/users/register",
    method: "post",
    middleware: [ UserService.validateRegistration, UserService.validationResult, UserService.encryptPassword ],
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
    middleware: [ UserService.validateUpdate, UserService.validationResult, UserService.encryptPassword ],
    action: UserController.update
  }
]