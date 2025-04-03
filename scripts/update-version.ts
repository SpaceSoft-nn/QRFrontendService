import fs from 'fs'
import path from 'path'

const packagePath = path.join(process.cwd(), 'package.json')
const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf8'))

const [major, minor, patch] = pkg.version.split('.')

pkg.version = `${major}.${minor}.${parseInt(patch) + 1}`

fs.writeFileSync(packagePath, JSON.stringify(pkg, null, 2) + '\n')

console.log('🔄 Версия обновлена до ' + pkg.version)
