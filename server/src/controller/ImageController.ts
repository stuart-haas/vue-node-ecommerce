import * as path from 'path'
import { getManager } from 'typeorm'
import { Image } from '@entity/Image'

export class ImageController {

  public static async create(req, res, next) {

    const imageRepository = getManager().getRepository(Image)

    let newImages = []

    for(var file of req.files) {
      const newImage = imageRepository.create({
        userId: req.session.user.id,
        path: file.path,
        data: JSON.stringify(file.meta)
      })
      newImages.push(newImage)
    }

    const images = await imageRepository.save(newImages).then(images => {
      for(var index in images) {
        req.files[index].id = images[index].id
      }
      return next()
    })
  }

  public static async delete(req, res) {

    const imageRepository = getManager().getRepository(Image)
    const image = await imageRepository.delete(req.params.id)

    res.send({ id: req.params.id, data: image })
  }

  public static async findAll(req, res) {
    
    const images = await getManager().getRepository(Image)
    .createQueryBuilder("image")
    .leftJoinAndSelect("image.prediction", "prediction")
    .where("prediction.imageId = image.id")
    .where("image.userId = :userId", { userId: req.session.user.id })
    .getMany()

    res.send(images)
  }
}