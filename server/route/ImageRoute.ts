import { ImageController } from "@controller/ImageController"
import { ImageService } from "@service/ImageService"
import { Auth } from "@middleware/Auth"

export const ImageRoute = [
  {
    path: "/images",
    method: "get",
    middleware: [ Auth.xhr ],
    action: ImageController.findAll
  },
  {
    path: "/images/:id",
    method: "delete",
    middleware: [ Auth.xhr ],
    action: ImageController.delete
  },
  {
    path: "/images/upload",
    method: "post",
    middleware: [ ImageService.uploadMultiple, ImageService.getMetaData, ImageController.create ],
    action: async (req, res) => { await res.send({ data: "Upload complete" }) }
  }
]