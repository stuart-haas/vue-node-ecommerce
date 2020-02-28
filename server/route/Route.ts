import * as express from "express"

export class Route {

  private static app
  private static router

  public static async testAction(req, res) {
    return await res.send("Test Action")
  }

  public static boot(app) {
    this.app = app
  }

  public static middleware(middleware) {
    return new Route(middleware)
  }

  public static prefix(path:string) {
    return new Route(null, path)
  }

  public static group(options, callback:Function) {
    Route.router = express.Router()
    if(options.prefix) Route.app.use(options.prefix, Route.router)
    else Route.app.use(Route.router)
    if(options.middleware) callback(Route.router, options.middleware)
    else callback(Route.router)
  }

  public static bind(method, path, middleware, action) {
    Route.router[method](path, middleware, (req, res, next) => {
      action(req, res)
        .then(() => next)
        .catch(err => next(err))
    })
  }

  private middleware
  private prefix
  private router

  public constructor(middleware?, prefix?) {
    this.middleware = middleware || []
    this.prefix = prefix || null
  }

  public group(callback:Function) {
    this.router = express.Router()
    if(this.prefix) Route.app.use(this.prefix, this.router)
    else Route.app.use(this.router)
    if(this.middleware.length) callback(this.router, this.middleware)
    else callback(this.router)
  }
}