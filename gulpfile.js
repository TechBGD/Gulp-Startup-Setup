const { series, parallel, src, dest } = require('gulp')
const sass = require('gulp-sass')(require('sass'));
const { join, dirname, basename, extname } = require('path')
sass.compiler = require('node-sass')
const { sync } = require('glob')
const cleanCSS = require('gulp-clean-css')
const rename = require('gulp-rename');
const { dir } = require('console');

const path = join(__dirname, 'src')

const compileSCSS = () => {
    return src(sync(join(path,'scss','**/*.scss')))
        .pipe(sass().on('error', sass.logError))
        .pipe(dest(join(path,'dist')))
}

const minifyCSS = (cb) => {
    return src(sync(join(path, 'dist', "**/!(*.min)*.css")))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe (
        rename(({ dirname, basename, extname }) => ({ 
            dirname,
            basename: `${basename}.min`,
            extname,
        }))
    )
    .pipe(dest(join(path, 'dist')))
}

exports.default = series(compileSCSS, minifyCSS)

