import { getManager } from 'typeorm'
import { User } from '@entity/User'
import { UserRepository } from '@repository/UserRepository'

export class UserController {

  public static async create(req, res) {
    const userRepository = getManager().getCustomRepository(UserRepository)
    const newUser = await userRepository.createAndSave(req.body)
    res.send(newUser)
  }

  public static async update(req, res) {
    const userRepository = getManager().getRepository(User)
    const user = await userRepository.update({ id: req.session.user.id }, { username: req.body.username, email: req.body.email, password: req.body.password })
    const updatedUser = await userRepository.findOne(req.session.user.id)
    res.send(updatedUser)
  }

  public static async findById(req, res) {
    const userRepository = getManager().getRepository(User)
    const user = await userRepository.findOne(req.params.id)

    if (!user) {
      res.status(404).end()
      return
    }

    res.send(user)
  }

  public static async findBySession(req, res) {
      const userRepository = getManager().getRepository(User)
      const user = await userRepository.findOne(req.session.user.id)
  
      if (!user) {
        res.status(404).end()
        return
      }
  
      res.send(user)
    }

  public static async findAll(req, res) {
    const userRepository = getManager().getRepository(User)
    const user = await userRepository.find()
    res.send(user)
  }
}