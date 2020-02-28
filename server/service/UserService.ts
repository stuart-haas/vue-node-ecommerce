import * as bcrypt from "bcryptjs"
import { getManager } from "typeorm"
import { User } from "@entity/User"
import { check, validationResult } from "express-validator"
import { Response, Request, NextFunction } from "express"

export class UserService {

  public static validateUpdate = [
    check("email", "Your email is not valid").exists().isLength({min: 5}).trim().escape(),
    check("password", "Your password must be at least 5 characters").exists().isLength({min: 5}).trim().escape(),
    check("passwordConf", "Passwords do not match").custom((value, {req}) => (value == req.body.password)).trim().escape()
  ]

  public static validateRegistration = [
    check("username", "Your username must have more than 5 characters").exists().isLength({min: 5}).trim().escape().custom(value => {
      const userRepository = getManager().getRepository(User)
      return userRepository.findOne({where: {"username": value}}).then(user => {
        if (user) {
          return Promise.reject("Username already exists")
        }
      })
    }),
    check("email", "Your email is not valid").exists().trim().escape().isEmail().custom(value => {
      const userRepository = getManager().getRepository(User)
      return userRepository.findOne({where: {"email": value}}).then(user => {
        if (user) {
          return Promise.reject("Email already exists")
        }
      })
    }),
    check("password", "Your password must be at least 5 characters").exists().isLength({min: 5}).trim().escape(),
    check("passwordConf", "Passwords do not match").custom((value, {req}) => (value == req.body.password)).trim().escape()
  ]

  public static validateLogin = [
    check("username").exists().trim().escape().custom(async value => {
      const userRepository = getManager().getRepository(User)
      return await userRepository.findOne({where: {"username": value}}).then(user => {
        if (!user) {
          return Promise.reject("Username not found")
        }
      })
    }),
    check("password").exists().trim().escape().custom(async (value, {req}) => {
      const userRepository = getManager().getRepository(User)
      return await userRepository.findOne({where: {"username": req.body.username}}).then(user => {
        return bcrypt.compare(value, user.password).then((error) => {
          if(!error) {
            return Promise.reject("Password does not match")
          }
        })
      })
    })
  ]

  public static validationResult(req:Request, res:Response, next:NextFunction) {
    const errors = validationResult(req)
    
    if(!errors.isEmpty()) {
      return res.status(422).send(errors.array())
    } else {
      return next()
    }
  }

  public static hashPassword(req:Request, res:Response, next:NextFunction) {
    bcrypt.hash(req.body.password, 10, (err:Error, hash:string) => {
      req.body.password = hash
      return next()
    })
  }
}