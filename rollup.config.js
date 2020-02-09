import run from '@rollup/plugin-run'
import typescript from '@rollup/plugin-typescript'

export default {
  input: 'src/index.js',
  output: {
    file: 'lib/index.js',
    format: 'cjs',
  },
  plugins: [run(), typescript()],
}
