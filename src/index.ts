import axios from 'axios'
import { writeFileSync } from 'fs'
import { join } from 'path'
import puppeteer from 'puppeteer'
import { cyrilicToLatin, getWordOfDay } from './utils'

const sleep = (timeout: number) =>
  new Promise((resolve) => setTimeout(resolve, timeout))

const fetchDictionary = async () => {
  const { data } = await axios.get(
    'https://raw.githubusercontent.com/zborle/wordle/develop/src/constants/wordlist.ts',
    { responseType: 'arraybuffer' }
  )

  // Write to disc
  writeFileSync(join(__dirname, 'wordlist.ts'), data)
}

const fetchValidGuesses = async () => {
  const { data } = await axios.get(
    'https://raw.githubusercontent.com/zborle/wordle/develop/src/constants/valid-guesses.ts',
    { responseType: 'arraybuffer' }
  )

  // Write to disc
  writeFileSync(join(__dirname, 'valid-guesses.ts'), data)
}

const solveQuiz = async () => {
  const word = getWordOfDay()

  const browser = await puppeteer.launch({
    headless: false,
  })

  const page = await browser.newPage()
  await page.setViewport({
    width: 1000,
    height: 1080,
  })

  await page.goto('https://zborle.mk/', {
    waitUntil: 'networkidle2',
  })

  await page.keyboard.press('Escape')

  await sleep(1000)

  // Using foreach to preserve order and timing
  for (const letter of word) {
    await page.keyboard.type(cyrilicToLatin(letter.toLowerCase()))
    await sleep(500)
  }

  await page.keyboard.press('Enter')

  await sleep(5000)

  await browser.close()
}

fetchDictionary()
fetchValidGuesses()
solveQuiz()
