import { AddSurveyModel, AddSurveyRepository, LoadSurveysRepository } from './survey-mongo-repository.protocols'
import { MongoHelper } from '../helpers/mongo.helper'
import { Survey } from '../../../../domain/models/survey'

export class SurveyMongoRepository implements AddSurveyRepository, LoadSurveysRepository {
  async loadAll (): Promise<Survey[]> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    const surveys: Survey[] = await surveyCollection.find().toArray()
    return surveys
  }

  async add (data: AddSurveyModel): Promise<void> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.insertOne(data)
  }
}
