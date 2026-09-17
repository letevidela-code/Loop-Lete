import fs from 'node:fs'

const source = fs.readFileSync('src/x7.jsx', 'utf8')
const match = source.match(/const _p='([^']+)'/)

if (!match) {
  throw new Error('No se encontró la foto de perfil embebida en src/x7.jsx')
}

fs.writeFileSync(
  'src/profile-data.js',
  `export const PROFILE_IMAGE = ${JSON.stringify(match[1])}\n`,
  'utf8',
)

console.log('Foto de perfil preparada para la página Yo')
