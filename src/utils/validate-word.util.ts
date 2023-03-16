import { VALID_GUESSES } from '../valid-guesses'
import { WORDS } from '../wordlist'

// January 1, 2022 Game Epoch - UTC
const EPOCH_START = 1640995200000
const MS_IN_DAY = 86400000
const OFFSET = new Date().getTimezoneOffset() * 60000

export const isWordInWordList = (word: string) => {
  return (
    WORDS.includes(word.toLowerCase()) ||
    VALID_GUESSES.includes(word.toLowerCase())
  )
}

export const getWordOfDay = () => {
  return WORDS[getWordOfDayIndex()].toUpperCase()
}

export const isWinningWord = (word: string) => {
  return getWordOfDay() === word
}

export const getWordOfDayIndex = () => {
  const now = Date.now()
  return Math.floor((now - EPOCH_START - OFFSET) / MS_IN_DAY) % WORDS.length
}
