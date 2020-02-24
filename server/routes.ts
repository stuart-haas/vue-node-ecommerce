import { ImageRoute } from "@route/ImageRoute"
import { UserRoute } from "@route/UserRoute"
import { ProductRoute } from "@route/ProductRoute"
import { CartRoute } from "@route/CartRoute"
import { ViewRoute } from "@route/ViewRoute"
import { Array } from "@util/Array"

const ApiRoutes = [
  ImageRoute,
  UserRoute,
  ProductRoute,
  CartRoute
]

const ViewRoutes = [
  ViewRoute
]

export const Routes = { API: Array.flatten(ApiRoutes), View: Array.flatten(ViewRoutes) }