import fs from 'node:fs'
import path from 'node:path'
import JavaScriptObfuscator from 'javascript-obfuscator'

const root = path.resolve('dist')

// Configuración deliberadamente conservadora: ofusca el bundle sin aplicar
// transformaciones agresivas que pueden romper React o eventos del navegador.
const options = {
  compact: true,
  identifierNamesGenerator: 'hexadecimal',
  renameGlobals: false,
  stringArray: true,
  stringArrayEncoding: ['base64'],
  stringArrayThreshold: 0.75,
  rotateStringArray: true,
  shuffleStringArray: true,
  transformObjectKeys: false,
  splitStrings: false,
  numbersToExpressions: false,
  simplify: false,
  selfDefending: false,
  controlFlowFlattening: false,
  deadCodeInjection: false,
  sourceMap: false
}

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) walk(full)
    else if (entry.isFile() && full.endsWith('.js')) {
      const source = fs.readFileSync(full, 'utf8')
      const output = JavaScriptObfuscator.obfuscate(source, options).getObfuscatedCode()
      fs.writeFileSync(full, output)
      console.log(`ofuscado seguro: ${path.relative(process.cwd(), full)}`)
    }
  }
}

walk(root)
