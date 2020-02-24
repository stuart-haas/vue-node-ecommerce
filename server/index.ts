import "reflect-metadata"
import * as express from "express"
import * as session from "express-session"
import * as bodyParser from "body-parser"
import * as cors from "cors"
import * as helmet from "helmet"
import * as cookieParser from "cookie-parser"
import * as dotenv from "dotenv"
import { createConnection, getConnection } from "typeorm"
import { Routes } from "./routes"
import { TypeormStore } from "typeorm-store"
import { Session } from "./entity/Session"

dotenv.config()

createConnection().then(async connection => {

    const app = express()
    const PORT = process.env.PORT || 8080

    app.use(cors())
    app.use(helmet())
    app.use(cookieParser())
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({extended: true}))
    app.set('view engine', 'pug')
    app.set('views', '../client/dist')
    app.use(express.static('./node_modules'))
    app.use(express.static('../client/dist'))

    const repository = getConnection().getRepository(Session)

    app.use(session({
      secret: 'secret',
      resave: false,
      saveUninitialized: false,
      store: new TypeormStore({ repository }),
      cookie: {
        secure: false,
        maxAge: 24 * 60 * 60 * 1000
      }
    }))

    const apiRouter = express.Router()
    
    Routes.API.forEach(route => {
      apiRouter[route.method](route.path, route.middleware, (req, res, next) => {
        route.action(req, res)
          .then(() => next)
          .catch(err => next(err))
      })
    })

    app.use('/api', apiRouter)

    const viewRouter = express.Router()

    Routes.View.forEach(route => {
      viewRouter[route.method](route.path, route.middleware, (req, res, next) => {
        route.action(req, res)
      })
    })

    app.use('/', viewRouter)

    app.listen(PORT)

    console.log(`Express application is up and running on port ${PORT}`)

}).catch(error => console.log("TypeORM connection error: ", error))