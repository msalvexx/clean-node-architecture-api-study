export type Survey = {
  question: string
  answers: SurveyAnswer[]
  date: Date
}
export type SurveyAnswer = {
  answer: string
  image?: string
}
