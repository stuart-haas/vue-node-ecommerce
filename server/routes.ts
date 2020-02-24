import { ImageRoute } from "@route/ImageRoute"
import { UserRoute } from "@route/UserRoute"
import { ProductRoute } from "@route/ProductRoute"
import { Array } from "@util/Array"
import { ViewRoute } from "@route/ViewRoute"

const ApiRoutes = [
  ImageRoute,
  UserRoute,
  ProductRoute
]

const ViewRoutes = [
  ViewRoute
]

export const Routes = { API: Array.flatten(ApiRoutes), View: Array.flatten(ViewRoutes) }