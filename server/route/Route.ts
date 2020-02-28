import { Response, Request, NextFunction, Router } from "express"
import { app } from "app"

export interface RouteCallback {
  (router:Router, middleware:Array<any>):void
}

export class Route {

  private static router:Router

  public static middleware(middleware:Array<any>) {
    return new Route(middleware, null)
  }

  public static prefix(path:string) {
    return new Route(null, path)
  }

  public static group(options:any, callback:RouteCallback) {
    Route.router = Router()
    if(options.prefix) app.use(options.prefix, Route.router)
    else app.use(Route.router)
    if(options.middleware) callback(Route.router, options.middleware)
    else callback(Route.router, null)
  }

  public static api(method:string, path:string, middleware:Array<any>, action:Function) {
    Route.router[method](path, middleware, (req:Request, res:Response, next:NextFunction) => {
      action(req, res)
        .then(() => next)
        .catch((err:Error) => next(err))
    })
  }

  public static view(method:string, path:string, middleware:Array<any>, action:Function) {
    Route.router[method](path, middleware, (req:Request, res:Response) => {
      action(req, res)
    })
  }

  middleware: Array<any>
  prefix: string

  public constructor(middleware:Array<any>, prefix:string) {
    this.middleware = middleware || []
    this.prefix = prefix || null
  }

  public group(callback:RouteCallback) {
    Route.group(this, callback)
  }
}