import { getManager } from 'typeorm'
import { Prediction } from '@entity/Prediction'
import { PredictionService } from '@service/PredictionService'

export class PredictionController {

  public static create(req, res, next) {
    
    for(var file of req.files) {

      PredictionService.automl(file.relativepath).then(response => {

        const predictionRepository = getManager().getRepository(Prediction)
        const newPrediction = predictionRepository.create({
          image: file.id, data: JSON.stringify(response)
        })

        predictionRepository.save(newPrediction).then(response => {

          predictionRepository.findOne({
            where: { image: file.id },
            relations: ["image"]
          }).then(response => {
            file.data = response.data
            res.status(200).send(file)
          })
        })
      })
    }
  }
}