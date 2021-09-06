// combine the jest-puppeteer and ts-jest preset into one
// see: https://github.com/smooth-code/jest-puppeteer/issues/364

const ts_preset = require('ts-jest/presets/js-with-babel/jest-preset')
const puppeteer_preset = require('jest-puppeteer/jest-preset')

module.exports = Object.assign(
    ts_preset,
    puppeteer_preset
)