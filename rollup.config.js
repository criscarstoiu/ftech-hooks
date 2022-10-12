import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'
import babel from '@rollup/plugin-babel'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import replace from '@rollup/plugin-replace'
import typescript from '@rollup/plugin-typescript'
import pkg from './package.json'

const aName = [
  {
    input: 'src/index.ts',
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        exports: 'named',
        sourcemap: true,
        strict: false,
      },
      {
        file: 'dist/index.es.js',
        format: 'es',
        exports: 'named',
      },
    ],
    plugins: [
      nodeResolve({
        extensions: ['.js'],
      }),
      replace({
        'process.env.NODE_ENV': JSON.stringify('development'),
      }),
      babel({
        presets: ['@babel/preset-react'],
      }),
      commonjs(),
      serve({
        open: true,
        verbose: true,
        contentBase: ['', 'public'],
        host: 'localhost',
        port: 3001,
      }),
      livereload({ watch: 'dist' }),
      typescript({
        tsconfig: './tsconfig.build.json',
        declaration: true,
        declarationDir: './',
        sourceMap: false,
      }),
    ],
  },
]

export default aName
