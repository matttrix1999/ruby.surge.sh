import gulp from 'gulp'
import rename from 'gulp-rename'
import nunjucks from 'gulp-nunjucks'
import { readJsonSync } from 'fs-extra'
import * as site from './constants/site'

const assets = readJsonSync('./surge/assets/webpack-assets.json')

export function nunjucksTask() {
  return gulp.src('*.html')
  .pipe(nunjucks.compile({ assets, site }))
  .pipe(rename((path) => {
    const { basename } = path
    if (basename === 'mobile') {
      path.basename = 'index'
      path.dirname += '/m'
    }
  }))
  .pipe(gulp.dest('surge'))
}
