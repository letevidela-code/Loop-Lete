import fs from 'node:fs'
import path from 'node:path'
import JavaScriptObfuscator from 'javascript-obfuscator'

const root = path.resolve('dist')
const options = {
  compact: true,
  identifierNamesGenerator: 'hexadecimal',
  renameGlobals: false,
  stringArray: true,
  stringArrayEncoding: ['base64'],
  stringArrayThreshold: 0.8,
  rotateStringArray: true,
  shuffleStringArray: true,
  splitStrings: true,
  splitStringsChunkLength: 8,
  transformObjectKeys: true,
  numbersToExpressions: true,
  simplify: true,
  unicodeEscapeSequence: false,
  selfDefending: false,
  controlFlowFlattening: false,
  deadCodeInjection: false
}

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) walk(full)
    else if (entry.isFile() && full.endsWith('.js')) {
      const source = fs.readFileSync(full, 'utf8')
      const output = JavaScriptObfuscator.obfuscate(source, options).getObfuscatedCode()
      fs.writeFileSync(full, output)
      console.log(`ofuscado: ${path.relative(process.cwd(), full)}`)
    }
  }
}

walk(root)
