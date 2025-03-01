export interface Destination {
  id: number
  city: string
  country: string
  clues: string[]
  fun_fact: string[]
  trivia: string[]
}

export interface User {
  id: number
  username: string
  score: number
  correct_count: number
  wrong_count: number
  created_at: Date
  updated_at: Date
}

