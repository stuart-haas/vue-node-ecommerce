import * as fs from 'fs'
import vision from '@google-cloud/vision'
import automl from '@google-cloud/automl'

export class PredictionService {

  public static async vision(filePath) {
    const client = new vision.ImageAnnotatorClient()
    try {
      return await client.labelDetection(filePath)
    } catch(error) {
      console.log(error)
    }
  }

  public static async automl(filePath) {
    const client = new automl.PredictionServiceClient()
  
    const projectId = `sonar-1575487358584`
    const computeRegion = `us-central1`
    const modelId = `ICN113984171428282368`
    const scoreThreshold = `0.5`
  
    const modelFullId = client.modelPath(projectId, computeRegion, modelId)
    
    const content = fs.readFileSync(filePath, 'base64')
  
    const params:any = {}
  
    if (scoreThreshold) {
      params.score_threshold = scoreThreshold
    }
  
    const payload:any = {}
    payload.image = {imageBytes: content}
  
    try {
      return await client.predict({
        name: modelFullId,
        payload: payload,
        params: params,
      })
    } catch(error) {
      console.log(error)
    }
  }
}