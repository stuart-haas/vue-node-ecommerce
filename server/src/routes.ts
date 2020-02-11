import { ImageRoute } from "@route/ImageRoute"
import { UserRoute } from "@route/UserRoute"
import { Array } from "@util/Array"

export const routes = [
  ImageRoute,
  UserRoute
]

export const Routes = Array.flatten(routes)