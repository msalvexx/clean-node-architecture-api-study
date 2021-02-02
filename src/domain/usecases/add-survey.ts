export type AddSurveyModel = {
  question: string
  answers: SurveyAnswers[]
  date: Date
}

export type SurveyAnswers = {
  image?: string
  answer: string
}

export type AddSurvey = {
  add: (data: AddSurveyModel) => Promise<void>
}
