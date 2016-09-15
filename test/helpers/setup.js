require('babel-register')
require('babel-polyfill')

// import { expect } from 'chai'
// import sinon from 'sinon'

global.document = require('jsdom').jsdom(
   "<head><meta charset='UTF-8'><title>Shoot The Breeze</title></head><body><div id='application'></div></body>"
)

global.window = document.defaultView
global.navigator = window.navigator
//
// global.expect = expect
// global.sinon = sinon
