import { Response, Request, NextFunction, Router } from "express"
import { app } from "app"

export interface RouteCallback {
  (router:Router, middleware:Array<any>):void
}

export interface RouteMatchCallback {
  (router:Router, method:string, path:string):void
}

export class Route {

  public static router:Router = Router()

  public static redirect(url:string) {
    return (req:Request, res:Response) => {
      res.redirect(url)
    }
  }

  public static middleware(middleware:Array<any>) {
    return new Route(middleware)
  }

  public static prefix(path:string) {
    return new Route(null, path)
  }

  public static match(methods:Array<string>, path:string, callback:RouteMatchCallback) {
    methods.forEach(method => {
      callback(Route.router, method, path)
    })
    return new Route()
  }

  public static group(options:any, callback:RouteCallback) {
    if(options.prefix) app.use(options.prefix, Route.router)
    else app.use(Route.router)
    if(options.middleware) callback(Route.router, options.middleware)
    else callback(Route.router, null)
  }

  public static async(method:string, path:string, middleware:Array<any>, action:Function) {
    Route.router[method](path, middleware, (req:Request, res:Response, next:NextFunction) => {
      action(req, res)
        .then(() => next)
        .catch((err:Error) => next(err))
    })
  }

  public static sync(method:string, path:string, middleware:Array<any>, action:Function) {
    Route.router[method](path, middleware, (req:Request, res:Response) => {
      action(req, res)
    })
  }

  middleware: Array<any>
  prefix: string

  public constructor(middleware:Array<any> = [], prefix:string = '') {
    this.middleware = middleware
    this.prefix = prefix
  }

  public group(callback:RouteCallback) {
    Route.group(this, callback)
  }
}