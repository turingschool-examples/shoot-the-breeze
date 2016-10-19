import React, { Component } from 'react'
import firebase, { reference, signIn } from '../firebase';
import { pick, map, extend } from 'lodash';

const CharacterCount = require('./CharacterCount')
const Clear = require('./Clear')
const Submit = require('.Submit')
const LoginStatus = require('./LoginStatus');
