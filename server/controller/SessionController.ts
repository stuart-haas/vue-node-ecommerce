import { Response, Request, NextFunction } from "express"
import { getManager } from "typeorm"
import { User } from "@entity/User"

export class SessionController {

  public static async create(req:Request, res:Response, next:NextFunction) {
    try {
      const userRepository = getManager().getRepository(User)
      const user = await userRepository.findOneOrFail({where: {"username": req.body.username}, select: ["id", "username"]})

      if (!user) {
        res.status(404).end()
        return
      }

      req['session'].user = user
      return next()
    } catch(err) {
      console.log(err)
    }
  }

  public static delete(req:Request, res:Response, next:NextFunction) {
    if(req['session'] && req['session'].user) {
      req['session'].destroy()
    }
    return next()
  }
}