import { ImageController } from "../controller/ImageController"
import { ImageService } from "../service/ImageService"
import { AuthService } from "../service/AuthService"

export const ImageRoute = [
  {
    path: "/images",
    method: "get",
    middleware: [ AuthService.requireXHR ],
    action: ImageController.findAll
  },
  {
    path: "/images/:id",
    method: "delete",
    middleware: [ AuthService.requireXHR ],
    action: ImageController.delete
  },
  {
    path: "/images/upload",
    method: "post",
    middleware: [ ImageService.uploadMultiple, ImageService.getMetaData, ImageController.create ],
    action: async (req, res) => { await res.send({ data: "Upload complete" }) }
  }
]