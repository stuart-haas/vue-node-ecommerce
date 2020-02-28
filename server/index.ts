import "reflect-metadata"
import * as dotenv from "dotenv"
import { createConnection } from "typeorm"
import { App } from "app"

dotenv.config()

createConnection().then(async connection => {

  App.start()

}).catch(error => console.log("TypeORM connection error: ", error))