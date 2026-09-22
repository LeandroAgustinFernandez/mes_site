import { mkdirSync, readdirSync, readFileSync, writeFileSync, renameSync, unlinkSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')

const galleryDir = join(root, 'src', 'assets', 'gallery')
const assetsDir = join(root, 'src', 'assets')
const publicDir = join(root, 'public')

mkdirSync(galleryDir, { recursive: true })
mkdirSync(publicDir, { recursive: true })

async function convert({ input, output, max, quality }) {
  await sharp(input)
    .rotate()
    .resize({ width: max, height: max, fit: 'inside', withoutEnlargement: true })
    .webp({ quality })
    .toFile(output)
  unlinkSync(input)
  console.log(`${input} -> ${output}`)
}

const galleryFiles = readdirSync(galleryDir).filter((f) =>
  /\.jpe?g$/i.test(f),
)

const jobs = [
  ...galleryFiles.map((f) => ({
    input: join(galleryDir, f),
    output: join(galleryDir, `${f.replace(/\.jpe?g$/i, '')}.webp`),
    max: 1080,
    quality: 80,
  })),
  {
    input: join(assetsDir, 'hero.jpg'),
    output: join(assetsDir, 'hero.webp'),
    max: 1920,
    quality: 82,
  },
  {
    input: join(assetsDir, 'about.jpg'),
    output: join(assetsDir, 'about.webp'),
    max: 1600,
    quality: 80,
  },
  {
    input: join(assetsDir, 'training.jpg'),
    output: join(assetsDir, 'training.webp'),
    max: 1080,
    quality: 78,
  },
  {
    input: join(assetsDir, 'maestros.jpg'),
    output: join(assetsDir, 'maestros.webp'),
    max: 1200,
    quality: 80,
  },
  {
    input: join(assetsDir, 'shaolin.jpeg'),
    output: join(assetsDir, 'shaolin.webp'),
    max: 1080,
    quality: 78,
  },
  {
    input: join(assetsDir, 'sanda.jpeg'),
    output: join(assetsDir, 'sanda.webp'),
    max: 1080,
    quality: 78,
  },
]

for (const job of jobs) {
  try {
    await convert(job)
  } catch (error) {
    console.error(`Error en ${job.input}: ${error.message}`)
  }
}

// Logo: redimensionar y conservar PNG (también alimenta al favicon)
try {
  await sharp(join(assetsDir, 'logo.png'))
    .rotate()
    .resize({ width: 512, height: 512, fit: 'inside', withoutEnlargement: true })
    .png({ quality: 90 })
    .toFile(join(assetsDir, 'logo-opt.png'))
  renameSync(join(assetsDir, 'logo-opt.png'), join(assetsDir, 'logo.png'))
  writeFileSync(join(publicDir, 'favicon.png'), readFileSync(join(assetsDir, 'logo.png')))
  console.log('logo.png optimizado + favicon.png actualizado')
} catch (error) {
  console.error(`Error en logo: ${error.message}`)
}

console.log('Optimización finalizada.')