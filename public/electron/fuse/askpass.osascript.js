#!/usr/bin/env osascript -l JavaScript

/* eslint-disable */

ObjC.import('stdlib')

const app = Application.currentApplication()
app.includeStandardAdditions = true

const result = app.displayDialog('Space wants to install OSX FUSE and needs privilege access. Enter your password to allow this.', {
  defaultAnswer: '',
  withIcon: 'note',
  buttons: ['Cancel', 'Install OSX FUSE'],
  defaultButton: 'Install OSX FUSE',
  hiddenAnswer: true,
})

if (result.buttonReturned === 'Install OSX FUSE') {
  result.textReturned
} else {
  $.exit(255)
}
