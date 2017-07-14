/**
 * generated on 2017-07-10 using generator-webapp 3.0.1
 */
const gulp = require('gulp');
/*
 * 定义一个 gulp Load Plugins 插件 自动加载组件
 * 它能够自动地从 package.json 中加载任意Gulp插件然后把它们附加到一个对象上。（gulp-*)的组件
 */
const gulpLoadPlugins = require('gulp-load-plugins');
/*
 * Browsersync能让浏览器实时、快速响应您的文件更改（html、js、css、sass、less等）并自动刷新页面
 * 更重要的是 Browsersync可以同时在PC、平板、手机等设备下进项调试
 * demo 演示
 */
const browserSync = require('browser-sync').create();
/**
 * 删除文件组件
 */
const del = require('del');
/**
 * 替换html中的资源组件
 */
const wiredep = require('wiredep').stream;
/**
 * 执行顺序组件
 */
const runSequence = require('run-sequence');
const $ = gulpLoadPlugins();
const reload = browserSync.reload;

/**
 * 是否是开发环境
 */
let dev = false;
/**
 * 定义一个 styles 用于将 styles 下的 *.scss 转化为.css文件
 */
gulp.task('styles', () => {
  return gulp.src('app/styles/*.scss')
    .pipe($.plumber())
    .pipe($.if(dev, $.sourcemaps.init()))
    .pipe($.sass.sync({
      outputStyle: 'expanded',
      precision: 10,
      includePaths: ['.']
    }).on('error', $.sass.logError))
    .pipe($.autoprefixer({browsers: ['> 1%', 'last 2 versions', 'Firefox ESR']}))
    .pipe($.if(dev, $.sourcemaps.write()))
    .pipe(gulp.dest('.tmp/styles'))
    .pipe(reload({stream: true}));
});

gulp.task('scripts', () => {
  return gulp.src('app/scripts/**/*.js')
    .pipe($.plumber())
    .pipe($.if(dev, $.sourcemaps.init()))
    .pipe($.babel())
    .pipe($.if(dev, $.sourcemaps.write('.')))
    .pipe(gulp.dest('.tmp/scripts'))
    .pipe(reload({stream: true}));
});

function lint(files) {
  return gulp.src(files)
    .pipe($.eslint({fix: true}))
    .pipe(reload({stream: true, once: true}))
    .pipe($.eslint.format())
    .pipe($.if(!browserSync.active, $.eslint.failAfterError()));
}

gulp.task('lint', () => {
  return lint('app/scripts/**/*.js')
    .pipe(gulp.dest('app/scripts'));
});
gulp.task('lint:test', () => {
  return lint('test/spec/**/*.js')
    .pipe(gulp.dest('test/spec'));
});

gulp.task('html', ['styles', 'scripts'], () => {
  return gulp.src('app/*.html')
    .pipe($.useref({searchPath: ['.tmp', 'app', '.']}))
    .pipe($.if(/\.js$/, $.uglify({compress: {drop_console: true}})))
    .pipe($.if(/\.css$/, $.cssnano({safe: true, autoprefixer: false})))
    .pipe($.if(/\.html$/, $.htmlmin({
      collapseWhitespace: false,
      minifyCSS: true,
      //minifyJS: {compress: {drop_console: true}},
      processConditionalComments: true,
      removeComments: true,
      removeEmptyAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true
    })))
    .pipe(gulp.dest('dist'))
});

gulp.task('images', () => {
  return gulp.src('app/images/**/*')
    .pipe($.cache($.imagemin()))
    .pipe(gulp.dest('dist/images'));
});

gulp.task('fonts', () => {
  return gulp.src(require('main-bower-files')('**/*.{eot,svg,ttf,woff,woff2}', function (err) {
  })
    .concat('app/fonts/**/*'))
    .pipe($.if(dev, gulp.dest('.tmp/fonts'), gulp.dest('dist/fonts')));
});

gulp.task('extras', () => {
  return gulp.src([
    'app/*',
    '!app/*.html'
  ], {
    dot: true
  }).pipe(gulp.dest('dist'));
});
/*
 清理 clean,clean:rev
 */
gulp.task('clean',['clean:rev'], del.bind(null, ['.tmp', 'dist']));
/*
 清理 clean:rev
 */
gulp.task('clean:rev',del.bind(null,['rev','dist-v']));
/*
基于.tmp 和 app的 serve
 */
gulp.task('serve', () => {
  runSequence(['clean', 'wiredep'], ['styles', 'scripts', 'fonts'], () => {
    browserSync.init({
      notify: false,
      port: 9000,
      server: {
        baseDir: ['.tmp', 'app'],
        routes: {
          '/bower_components': 'bower_components'
        }
      }
    });

    gulp.watch([
      'app/*.html',
      'app/images/**/*',
      '.tmp/fonts/**/*'
    ]).on('change', reload);

    gulp.watch('app/styles/**/*.scss', ['styles']);
    gulp.watch('app/scripts/**/*.js', ['scripts']);
    gulp.watch('app/fonts/**/*', ['fonts']);
    gulp.watch('bower.json', ['wiredep', 'fonts']);
  });
});

gulp.task('serve:dist', ['default'], () => {
  browserSync.init({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['dist']
    }
  });
});
/*
版本号版本 server
 */
gulp.task('serve:dist-v', ['default'], () => {
  browserSync.init({
    notify: false,
    port: 9009,
    server: {
      baseDir: ['dist-v']
    }
  });
});

/*
测试版本
 */
gulp.task('serve:test', ['scripts'], () => {
  browserSync.init({
    notify: false,
    port: 9000,
    ui: false,
    server: {
      baseDir: 'test',
      routes: {
        '/scripts': '.tmp/scripts',
        '/bower_components': 'bower_components'
      }
    }
  });

  gulp.watch('app/scripts/**/*.js', ['scripts']);
  gulp.watch(['test/spec/**/*.js', 'test/index.html']).on('change', reload);
  gulp.watch('test/spec/**/*.js', ['lint:test']);
});

// inject bower components
gulp.task('wiredep', () => {
  gulp.src('app/styles/*.scss')
    .pipe($.filter(file => file.stat && file.stat.size))
    .pipe(wiredep({
      ignorePath: /^(\.\.\/)+/
    }))
    .pipe(gulp.dest('app/styles'));

  gulp.src('app/*.html')
    .pipe(wiredep({
      exclude: ['bootstrap'],
      ignorePath: /^(\.\.\/)*\.\./
    }))
    .pipe(gulp.dest('app'));
});


//定义css、js源文件路径
var cssSrc = 'dist/**/*.css',
  jsSrc = 'dist/**/*.js';


//CSS生成文件hash编码并生成 rev-manifest.json文件名对照映射
gulp.task('revCss', function(){
  gulp.src(cssSrc)
    .pipe($.rev())
    .pipe(gulp.dest('dist-v'))
    .pipe($.rev.manifest())
    .pipe(gulp.dest('rev/css'));
});


//js生成文件hash编码并生成 rev-manifest.json文件名对照映射
gulp.task('revJs', function(){
  return gulp.src(jsSrc)
    .pipe($.rev())
    .pipe(gulp.dest('dist-v'))
    .pipe($.rev.manifest())
    .pipe(gulp.dest('rev/js'));
});

//Html替换css、js文件版本
gulp.task('revHtml', ['revCss','revJs'],function () {
  return gulp.src(['rev/**/*.json', 'dist/**/*.html'])
    .pipe($.revCollector())
    .pipe(gulp.dest('dist-v'));
});

//copy other files
gulp.task('mvfit',['revHtml'],()=>{
  return gulp.src(['dist/**/*','!dist/scripts/**/*','!dist/styles/**/*','!dist/index.html'],{dot:true})
    .pipe(gulp.dest('dist-v'))
});

// 构建原始版本
gulp.task('build', ['lint', 'html', 'images', 'fonts', 'extras'], () => {
  return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
});

// 构建添加版本后的版本
gulp.task('build:mvfit',['build','mvfit'],()=>{

});

// 所有task进行执行
gulp.task('default', () => {
  return new Promise(resolve => {
    dev = false;
    runSequence(['clean','clean:rev', 'wiredep'], 'build','mvfit', resolve);
  });
});


