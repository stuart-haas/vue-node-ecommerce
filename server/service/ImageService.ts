import * as path from "path"
import * as crypto from "crypto"
import * as exifr from "exifr"
import * as multer from "multer"

const storage = multer.diskStorage({
  filename: (req, file, callback) => {
    crypto.pseudoRandomBytes(16, function(err, raw) {
      if (err) return callback(err)
      callback(null, raw.toString('hex') + path.extname(file.originalname))
    })
  }
})

const upload = multer({ storage: storage })

export class ImageService {

  public static uploadSingle = upload.single('file')

  public static uploadMultiple = upload.array('file', 10)
  
  public static async getMetaData(req, res, next) {
    for(var file of req.files) {
      file.path = file.path.replace(/^public\//, '/')
      file.relativepath = file.destination + "/" + file.filename
      file.absolutepath = req.protocol + "://" + req.headers.host + file.path
      file.meta = await exifr.parse(file.relativepath)
    }
    return next()
  }
}