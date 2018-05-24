var gulp = require('gulp')
var qiniu = require('gulp-qiniu')

gulp.task('upload', function(cb) {
  // 上传七牛
  return gulp.src('build/**').pipe(
    qiniu(
      {
        accessKey: '8545_3lKyGrfZpxuJbrkrbDZxPgD15okDtQUIOgF',
        secretKey: '1kLTTb0B3o2ZSosA6FJgl1l1KQ6uZEUcTczQSztV',
        bucket: 'cms-fe'
      },
      { dir: '/' }
    )
  )
})
