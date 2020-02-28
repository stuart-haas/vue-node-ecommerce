import { API } from "@route/api"
import { View } from "@route/view"

export class Routes {

  public static register() {
    API.register()
    View.register()
  }
}