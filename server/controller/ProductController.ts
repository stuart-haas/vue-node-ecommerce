import { getManager } from "typeorm"
import { Product } from "@entity/Product"

export class ProductController {

  public static async create(req, res) {
    console.log(req.body)
    const productRepository = getManager().getRepository(Product)
    const product = productRepository.create(req.body)
    const savedProduct = await productRepository.save(product)
    res.send(savedProduct)
  }

  public static async update(req, res) {
    const productRepository = getManager().getRepository(Product)
    const product = await productRepository.update({ id: req.body.id }, req.body)
    res.send(product)
  }

  public static async findBySku(req, res) {
    const productRepository = getManager().getRepository(Product)
    const product = await productRepository.findOne({ where: { sku: req.params.sku }})

    if (!product) {
      res.status(404).end()
      return
    }

    res.send(product)
  }

  public static async findAll(req, res) {
    const productRepository = getManager().getRepository(Product)
    const product = await productRepository.find()
    res.send(product)
  }
}