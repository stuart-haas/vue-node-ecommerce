import { Response, Request } from "express"
import { getManager } from "typeorm"
import { Product } from "@entity/Product"
import * as faker from "faker"
import { Mathf } from "@util/Mathf"

export class ProductController {

  public static async seed(req:Request, res:Response) {
    var count = req.query.count
    var products = []
    for(var i = 0; i < count; i ++) {

      var product = new Product();
      product.image = 'https://picsum.photos/id/'+Math.round(Mathf.randomRange(0, 1000))+'/640/480'
      product.sku = faker.random.alphaNumeric(6).toUpperCase()
      product.name = faker.commerce.productName()
      product.description = faker.lorem.paragraph(1)
      product.price = parseInt(faker.commerce.price(1, 100))
      product.inStock = faker.random.number(100)

      try {
        const productRepository = getManager().getRepository(Product)
        const savedProduct = await productRepository.save(product)
        products.push(savedProduct)
      } catch(err) {
        console.log(err)
      }
    }

    res.send(products)
  }

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

  public static async delete(req:Request, res:Response) {
    try {
      const productRepository = getManager().getRepository(Product)
      const result = await productRepository.delete({ id: req.body.id })
      res.send(result)
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