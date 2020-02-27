import { EntityRepository, Repository } from "typeorm"
import { User } from "@entity/User"

@EntityRepository(User)
export class UserRepository extends Repository<User> {

  createAndSave(data) {
    const user = this.create(data)
    return this.save(user)
  }
}