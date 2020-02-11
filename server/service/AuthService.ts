export class AuthService {
  
  public static requireAuthentication(url) {
    return (req, res, next) => {
      if(!req.session.user) {
        res.redirect(url)
      } else {
        return next()
      }
    }
  }

  public static checkAuthentication(url) {
    return (req, res, next) => {
      if(req.session && req.session.user) {
        res.redirect(url)
      } else {
        return next()
      }
    }
  }

  public static requireXHR(req, res, next) {
    if (req.xhr) {
      return next()
    } else {
      res.status(400).send('400 Bad Request')
    }
  }
}