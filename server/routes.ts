import * as express from "express"

export class Routes {

  private static apiRoutes = []
  private static viewRoutes = []

  public static registerApiRoutes(app, basePath, ...routes) {
    const router = express.Router()

    this.apiRoutes.push(routes)

    this.apiRoutes[0].forEach(route => {
      route.forEach(route => {
        router[route.method](route.path, route.middleware, (req, res, next) => {
          route.action(req, res)
            .then(() => next)
            .catch(err => next(err))
        })
      })
    })

    app.use(basePath, router)
  }

  public static registerViewRoutes(app, basePath, ...routes) {
    const router = express.Router()

    this.viewRoutes.push(routes)

    this.viewRoutes[0].forEach(route => {
      route.forEach(route => {
        router[route.method](route.path, route.middleware, (req, res, next) => {
          route.action(req, res)
        })
      })
    })

    app.use(basePath, router)
  }
}