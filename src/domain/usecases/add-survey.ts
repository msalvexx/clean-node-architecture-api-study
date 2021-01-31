export interface AddSurveyModel {
  question: string
  answers: SurveyAnswers[]
  date: Date
}

export interface SurveyAnswers {
  image?: string
  answer: string
}

export interface AddSurvey {
  add: (data: AddSurveyModel) => Promise<void>
}
