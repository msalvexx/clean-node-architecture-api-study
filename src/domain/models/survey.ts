export interface Survey {
  question: string
  answers: SurveyAnswer[]
  date: Date
}
export interface SurveyAnswer {
  answer: string
  image?: string
}
