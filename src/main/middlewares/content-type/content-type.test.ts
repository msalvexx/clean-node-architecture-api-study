import request from 'supertest'
import app from '../../config/app'

describe('Content Type Middleware', () => {
  test('Should Default Content Type as json', async () => {
    app.get('/test-content-type-json', (req, res) => {
      res.send('')
    })
    await request(app)
      .get('/test-content-type-json')
      .expect('content-type', /json/)
  })

  test('Should Default Content Type as xml when forced', async () => {
    app.get('/test-content-type-xml', (req, res) => {
      res.type('xml')
      res.send('')
    })
    await request(app)
      .get('/test-content-type-xml')
      .expect('content-type', /xml/)
  })
})
