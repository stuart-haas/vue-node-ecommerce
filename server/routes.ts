import { ImageRoute } from "./route/ImageRoute"
import { UserRoute } from "./route/UserRoute"
import { Array } from "./util/Array"
import { ViewRoute } from "@route/ViewRoute"

const ApiRoutes = [
  ImageRoute,
  UserRoute
]

const ViewRoutes = [
  ViewRoute
]

export const Routes = { API: Array.flatten(ApiRoutes), View: Array.flatten(ViewRoutes) }