import request from 'supertest'
import app from '@/main/config/app'

describe('Body Parser Middleware', () => {
  test('Should parse body as json', async () => {
    app.post('/test-body-parser', (req, res) => {
      res.send(req.body)
    })
    await request(app)
      .post('/test-body-parser')
      .send({ name: 'Rodrigo' })
      .expect({ name: 'Rodrigo' })
  })
})
