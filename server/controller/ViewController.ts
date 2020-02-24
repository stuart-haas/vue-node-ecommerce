import { getManager } from 'typeorm'
import { User } from '@entity/User'

export class ViewController {

  public static redirect(url) {
    return (req, res) => {
      res.redirect(url)
    }
  }

  public static renderDashboard(req, res) {
    res.render('pages/dashboard', { data: { user: req.session.user }})
  }

  public static renderAccount(req, res) {
    const userRepository = getManager().getRepository(User)
    const user = userRepository.findOne(req.session.user.id).then(user => {
      res.render('pages/account', { data: { user: user }})
    })
  }

  public static renderSettings(req, res) {
    res.render('pages/settings', { data: { user: req.session.user }})
  }

  public static renderLogin(req, res) {
    res.render('pages/login')
  }

  public static renderRegister(req, res) {
    res.render('pages/register')
  }

  public static renderStore(req, res) {
    res.render('pages/store')
  }
}