import { AddSurveyModel, AddSurveyRepository } from './db-add-survey.protocols'
import { DbAddSurvey } from './db-add-survey'

interface SutTypes {
  sut: DbAddSurvey
  repoStub: AddSurveyRepository 
}

const makeRepositoryStub = (): AddSurveyRepository => {
  class AddSurveyRepositoryStub implements AddSurveyRepository {
    async add (data: AddSurveyModel): Promise<void> {
      return Promise.resolve(null)
    } 
  }
  return new AddSurveyRepositoryStub()
}

const makeSut = (): SutTypes => {
  const repoStub = makeRepositoryStub() 
  const sut = new DbAddSurvey(repoStub)
  return {
    sut,
    repoStub
  }
}

const makeFakeSurveyData = (): AddSurveyModel => ({
  question: 'any_question',
  answers: [
    {
      answer: 'any_answer'
    }
  ]
})

describe('DbAddSurvey Usecase', () => {
  test('Should call AddSurveyRepository with correct values', async () => {
    const { sut, repoStub } = makeSut()
    const addSpy = jest.spyOn(repoStub, 'add')
    await sut.add(makeFakeSurveyData())
    expect(addSpy).toHaveBeenCalledWith(makeFakeSurveyData())
  })
})
