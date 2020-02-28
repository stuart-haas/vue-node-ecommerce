import { Response, Request, NextFunction } from "express"

export function log(req:Request, res:Response, next:NextFunction) {
  console.log(new Date(), req.method, req.originalUrl)
  next()
}