import { Response, Request, NextFunction } from "express"

export class Auth {
  
  public static require(url:string='/login') {
    return (req:Request, res:Response, next:NextFunction) => {
      if(!req['session'].user) {
        if(url) {
          res.redirect(url)
        } else {
          res.status(401).send({status: 401, error: 'Unauthorized'})
        }
      } else {
        return next()
      }
    }
  }

  public static verify(url:string='/dashboard') {
    return (req:Request, res:Response, next:NextFunction) => {
      if(req['session'] && req['session'].user) {
        if(url) {
          res.redirect(url)
        } else {
          res.status(200).send({status: 200, user: req['session'].user})
        }
      } else {
        return next()
      }
    }
  }

  public static xhr(req:Request, res:Response, next:NextFunction) {
    if (req.xhr) {
      return next()
    } else {
      res.status(400).send({status: 400, error: '400 Bad Request'})
    }
  }
}