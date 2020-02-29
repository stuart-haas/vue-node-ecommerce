import { Response, Request } from "express"
import { getManager } from "typeorm"
import { User } from "@entity/User"

export class ViewController {

  public static redirect(url:string) {
    return (req:Request, res:Response) => {
      res.redirect(url)
    }
  }

  public static renderDashboard(req:Request, res:Response) {
    res.render("pages/dashboard", { data: { user: req['session'].user }})
  }

  public static renderAccount(req:Request, res:Response) {
    const userRepository = getManager().getRepository(User)
    const user = userRepository.findOne(req['session'].user.id).then(user => {
      res.render("pages/account", { data: { user: user }})
    })
  }

  public static renderSettings(req:Request, res:Response) {
    res.render("pages/settings", { data: { user: req['session'].user }})
  }

  public static renderLogin(req:Request, res:Response) {
    res.render("pages/login")
  }

  public static renderRegister(req:Request, res:Response) {
    res.render("pages/register")
  }

  public static renderStore(req:Request, res:Response) {
    res.render("pages/store")
  }
}