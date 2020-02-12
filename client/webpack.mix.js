let mix = require('laravel-mix'),
path = require('path')

mix.setPublicPath('./dist')
    .js('src/js/index.js', 'dist/js')
    .sass('src/scss/app.scss', 'dist/css')
    .sourceMaps()
    .browserSync({
        port: 3000,
        proxy: 'http://localhost:8080',
        ui: { port: 3001 },
        files: [
            './dist/**/*.html',
            './dist/css/**/*.css',
            './dist/js/**/*.js',
        ],
    })
    .version()