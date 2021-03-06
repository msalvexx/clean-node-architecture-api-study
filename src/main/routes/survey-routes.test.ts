import { Collection } from 'mongodb'
import request from 'supertest'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo.helper'
import app from '@/main/config/app'
import { sign } from 'jsonwebtoken'
import env from '@/main/config/env'

let surveyCollection: Collection
let accountCollection: Collection

const makeFakeSurvey = (): any => ({
  question: 'Question',
  answers: [
    {
      answer: 'Answer 1',
      image: 'http://image-name.com'
    },
    {
      answer: 'Answer 2'
    }
  ]
})

const makeFakeAccount = (): any => ({
  name: 'any_name',
  email: 'any_email@email.com',
  password: 'any_password'
})

const makeAccessToken = async (): Promise<string> => {
  const res = await accountCollection.insertOne({
    ...makeFakeAccount(),
    role: 'admin'
  })
  const id = res.ops.pop()._id
  const accessToken = sign({ id }, env.jwtSecret)
  await accountCollection.updateOne({
    _id: id
  }, {
    $set: {
      accessToken
    }
  })
  return accessToken
}

describe('Survey Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('POST /surveys', () => {
    test('Should return 403 on add survey without access token', async () => {
      await request(app)
        .post('/api/surveys')
        .send(makeFakeSurvey())
        .expect(403)
    })

    test('Should return 204 on add survey with valid access token', async () => {
      const accessToken = await makeAccessToken()
      await request(app)
        .post('/api/surveys')
        .set('x-access-token', accessToken)
        .send(makeFakeSurvey())
        .expect(204)
    })
  })

  describe('GET /surveys', () => {
    test('Should return 403 on load surveys without access token', async () => {
      await request(app)
        .get('/api/surveys')
        .expect(403)
    })

    test('Should return 200 on load surveys with valid access token', async () => {
      const accessToken = await makeAccessToken()
      await surveyCollection.insertOne(makeFakeSurvey())
      await request(app)
        .get('/api/surveys')
        .set('x-access-token', accessToken)
        .expect(200)
    })
  })
})
