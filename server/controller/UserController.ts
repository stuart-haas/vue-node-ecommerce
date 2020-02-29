import { Response, Request } from "express"
import { getManager } from "typeorm"
import { User } from "@entity/User"
import { UserRepository } from "@repository/UserRepository"

export class UserController {

  public static async create(req:Request, res:Response) {
    try {
      const userRepository = getManager().getCustomRepository(UserRepository)
      const newUser = await userRepository.createAndSave(req.body)
      res.send(newUser)
    } catch(err) {
      console.log(err)
    }
  }

  public static async update(req:Request, res:Response) {
    try {
      const userRepository = getManager().getRepository(User)
      const user = await userRepository.update({ id: req['session'].user.id }, { username: req.body.username, email: req.body.email, password: req.body.password })
      const updatedUser = await userRepository.findOne(req['session'].user.id)
      res.send(updatedUser)
    } catch(err) {
      console.log(err)
    }
  }

  public static async findById(req:Request, res:Response) {
    try {
      const userRepository = getManager().getRepository(User)
      const user = await userRepository.findOne(req.params.id)

      if (!user) {
        res.status(404).end()
        return
      }

      res.send(user)
    } catch(err) {
      console.log(err)
    } 
  }

  public static async findByEmail(req:Request, res:Response) {
    try {
      const userRepository = getManager().getRepository(User)
      const user = await userRepository.find({ where: { email: req.query.email }})

      if (!user) {
        res.status(404).end()
        return
      }

      res.send(user)
    } catch(err) {
      console.log(err)
    }
  }

  public static async findByUsername(req:Request, res:Response) {
    try {
      const userRepository = getManager().getRepository(User)
      const user = await userRepository.find({ where: { username: req.query.username }})

      if (!user) {
        res.status(404).end()
        return
      }

      res.send(user)
    } catch(err) {
      console.log(err)
    }
  }

  public static async findBySession(req:Request, res:Response) {
    try {
      const userRepository = getManager().getRepository(User)
      const user = await userRepository.findOne(req['session'].user.id)
  
      if (!user) {
        res.status(404).end()
        return
      }
  
      res.send(user)
    } catch(err) {
      console.log(err)
    }
  }

  public static async findAll(req:Request, res:Response) {
    try {
      const userRepository = getManager().getRepository(User)
      const user = await userRepository.find()
      res.send(user)
    } catch(err) {
      console.log(err)
    }
  }
}