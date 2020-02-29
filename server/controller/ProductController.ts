import { Response, Request } from "express"
import { getManager } from "typeorm"
import { Product } from "@entity/Product"

export class ProductController {

  public static async create(req:Request, res:Response) {
    try {
      const productRepository = getManager().getRepository(Product)
      const product = productRepository.create(req.body)
      const savedProduct = await productRepository.save(product)
      res.send(savedProduct)
    } catch(err) {
      console.log(err)
    }
  }

  public static async update(req:Request, res:Response) {
    try {
      const productRepository = getManager().getRepository(Product)
      const product = await productRepository.update({ id: req.body.id }, req.body)
      res.send(product)
    } catch(err) {
      console.log(err)
    }
  }

  public static async findBySku(req:Request, res:Response) {
    try {
      const productRepository = getManager().getRepository(Product)
      const product = await productRepository.findOne({ where: { sku: req.params.sku }})
  
      if (!product) {
        res.status(404).end()
        return
      }
  
      res.send(product)
    } catch(err) {
      console.log(err)
    }
  }

  public static async findAll(req:Request, res:Response) {
    try {
      const productRepository = getManager().getRepository(Product)
      const product = await productRepository.find()
      res.send(product)
    } catch(err) {
      console.log(err)
    }
  }
}