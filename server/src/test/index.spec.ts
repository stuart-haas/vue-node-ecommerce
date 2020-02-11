import * as express from "express"
import * as bodyParser from "body-parser"
import * as request from "supertest"
import "mocha"

const app = express()

const PORT = process.env.PORT || 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', function (req, res) {
  res.status(200).send('ok');
})

const server = app.listen(PORT)

describe('Status and content', () => {
  afterEach(() => {
    server.close()
  })
  describe('Main page', () => {
    it('status', (done) => {
      request(server)
        .get('/')
        .expect(200, done)
    })
  })
})