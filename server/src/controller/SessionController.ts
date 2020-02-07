import { getManager } from "typeorm"
import { User } from '@entity/User'

export class SessionController {

  public static async create(req, res, next) {
    const userRepository = getManager().getRepository(User)
    const user = await userRepository.findOneOrFail({where: {'username': req.body.username}, select: ["id", "username"]})

    if (!user) {
      res.status(404).end()
      return
    }

    req.session.user = user
    return next()
  }

  public static delete(req, res, next) {
    if(req.session && req.session.user) {
      req.session.destroy()
    }
    return next()
  }
}