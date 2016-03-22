#! /usr/bin/env node

var _ = require('lodash')
var program = require('commander')
var meterminator = require('../lib/index')

program
  .description('Convert annotated htmls and css files to a functional meteor app')
  .option('-c, --create', 'Remove default meteor files, add and remove packages for a react project')
  .option('-u, --update', 'Convert htmls, add the files into the meteor app')
  .option('-i, --input-path [.design/]', 'specify input path, it can be a file or a folder')
  .option('-r, --recursive', 'find files in the input folder recursivly')
  .option('-o, --override-files', 'override existing files in the output path')

program.on('--help', function () {
  console.log('  Examples:')
  console.log('')
  console.log('    $ meterminator -c')
  console.log('    $ meterminator -u')
  console.log('    $ meterminator -u -i design/')
  console.log('    $ meterminator -u -i design.html')
  console.log('')
})

program.parse(process.argv)

if (!process.argv.slice(2).length) {
  program.outputHelp()
  process.exit(1)
}

// prepare options
var task = _.find(['create', 'update'], function (taskName) {
  return program[taskName]
})

var options = _.pick(
  program,
  ['inputPath', 'recursive', 'overrideFiles']
)

var cleanedOptions = _.omitBy(options, _.isUndefined)

meterminator(task, cleanedOptions)
