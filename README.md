[TOC]

# 前言
框架选择:    
1. ant-design 系列，用于开发 后台相关的Application  
工具：roadhog,dva,dva-cli,antd,babel,ecmascript 2015  
2. 基于 jQuery,bootstrap4开发前端和移动端的application  
工具：jQuery,bootstrap4,yeoman(yo),gulp,gulp-plugins,bower  
3. 需要了解javascript,css3,html5 
4. 开发工具Web Storm


# nodejs & npm
`npm`是随nodejs一起发布的包管理工具集合，能解决`nodejs`代码部署上的诸多问题。安装好`nodejs`后,就会成功安装`npm`。  
`nodejs` 安装  
![安装图片](http://note.youdao.com/yws/api/personal/file/WEB3b2bb897bde10004ef28b3e39acce572?method=download&shareKey=05177ea6ffa3537a52717bd9f2073ef6&inline=true)  

# roadhog 
roadhog(路霸)是一个 cli 工具，提供 server、 build 和 test 三个命令，分别用于本地调试和构建，并且提供了特别易用的 mock 功能。命令行体验和 create-react-app 一致，配置略有不同，比如默认开启 css modules，然后还提供了 JSON 格式的配置方式。  
## 配置
```json
{
  "entry": "src/index.js", 
  "disableCSSModules": false,
  "publicPath": "/",
  "outputPath": "./dist",
  "extraBabelPlugins": [],
  "extraPostCSSPlugins": [],
  "autoprefixer": null,
  "proxy": null,
  "externals": null,
  "library": null,
  "libraryTarget": "var",
  "multipage": false,
  "define": null,
  "env": null,
  "theme": null,
}
```
1. `entry`:入口
2. `disableCSSModules`:禁用 CSS Modules。最好别关，熟悉并使用他后，你会发现写样式简单了很多。
3. `publicPath`: 配置生产环境的 publicPath，开发环境下永远为 `/`。
4. `outputPath`:配置输出路径，默认是 `./dist`。
5. `extraBabelPlugins`:扩展的babel，配置额外的 babel plugin。babel plugin 只能添加，不允许覆盖和删除。  
6. `extraPostCSSPlugins`:配置额外的 postcss 插件。
7. `autoprefixer`:配置 autoprefixer 参数，详见 [autoprefixer](https://github.com/postcss/autoprefixer) 和 [browserslist](https://github.com/ai/browserslist#queries)。
8. `proxy`:配置代理。主要是调试使用。  
  
Others 详见 https://github.com/sorrycc/roadhog#%E9%85%8D%E7%BD%AE

学习资料：https://github.com/sorrycc/roadhog#env


# dva
```powershell
$ npm i 
```
`dva`是一个基于 react 和 redux 的轻量应用框架
dva, dva 基于 React + Redux开发,概念来自 elm，支持 side effects、热替换、动态加载、react-native、SSR 等，已在生产环境广泛应用。   
学习资料：https://github.com/dvajs/dva/blob/master/README_zh-CN.md

# dva-cli
```powershell

```
dva-cli 基于 roadhog 实现 build 和 server,是dva的交互工具。
dva-cli学习资料:https://github.com/dvajs/dva-cli

# antd
```powershell

```
antd学习资料：https://github.com/ant-design/ant-design/blob/master/README-zh_CN.md

# babel
```powershell

```
babeljs学习资料：http://babeljs.io/faq/

# ecmascript 2015
学习资料：  
http://www.jianshu.com/p/ebfeb687eb70  
https://github.com/ruanyf/es6tutorial/

>`是JavaScript语言的下一代标准。因为当前版本的ES6是在2015年发布的，所以又称ECMAScript 2015`
### 常用的特性
`let, const, class, extends, super, arrow functions, template string, destructuring, default, rest arguments`
#### let const
as the `var` key word,for declare variabled.
```javascript
var name = 'dandan'

while(true)
{
    var name = "abc"
    console.log(name)
    break
}
console.log(name)

```
使用`var`两次输出的都是 ``abc``
```javascript
let name = 'abc'
while(true)
{
    let name = 'ddddd'
    console.log(name)//ddddd
    break
}
console.log(name) //abc
```

### classe , extends,super

```javascript
class Animal{
    constructor(){
        this.type = 'animal'
    }
    says(says){
        console.log(says)
    }
}

let animal = new Animal()
animal.says('hello')

class Cat extends Animal{
    constructor{
        super()
        this.type = 'cat'
    }
    
}
```

# gulp yo bower

## 安装 gulp yo bower
```powershell
$ npm install --global yo gulp-cli bower
$ npm install --global generator-webapp
$ mkdir testyo && cd testyo && yo webapp

使用web storm打开项目
```
**gulp**:采用代码优于配置策略，让简单的事情继续简单，复杂的任务变得可管理。
1. **高效**：通过利用Node.js强大的流，不需要往磁盘写中间文件，可以更快地完成构建。
2. **高质量**：gulp严格的插件指导方针，确保插件简单并且按你期望的方式工作。
3. **易于学习**：通过把API降到最少，你能在很短的时间内学会gulp。构建工作就像你设想的一样：是一系列流管道。

## gulp和grunt的异同点

`易用`: gulp相比grunt更简洁，而且遵循代码优于配置策略，维护gulp更像是写代码。  
`高效`: gulp相比grunt更有设计感，核心设计基于Unix流的概念，通过管道连接，不需要写中间文件。  
`高质量`: gulp的每个插件只完成一个功能，这也是Unix的设计原则之一，各个功能通过流进行整合并完成复杂的任务。例如：grunt的imagemin插件不仅压缩图片，同时还包括缓存功能。在gulp中，缓存是另一个插件，可以被别的插件使用，这样就促进了插件的可重用性。目前官方列出的有673个插件。  
`易学`: gulp的核心API只有5个，掌握了5个API就学会了gulp，之后便可以通过管道流组合自己想要的任务。
 
## 差异和不同

`流`：gulp是一个基于流的构建系统，使用代码优于配置的策略。  
`插件`：gulp的插件更纯粹，单一的功能，并坚持一个插件只做一件事。  
`代码优于配置`：维护gulp更像是写代码，而且gulp遵循commonJS规范，因此跟写node程序没有差别。
没有产生中间文件。

## gulp 
```javascript
/**
 * generated on 2017-07-10 using generator-webapp 3.0.1
 */
const gulp = require('gulp');
/**
 * 定义一个 gulp Load Plugins 插件 自动加载组件
 * 它能够自动地从 package.json 中加载任意Gulp插件然后把它们附加到一个对象上。（gulp-*)的组件
 */
const gulpLoadPlugins = require('gulp-load-plugins');
/**
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

gulp.task('serve:dist-v', ['default'], () => {
  browserSync.init({
    notify: false,
    port: 9009,
    server: {
      baseDir: ['dist-v']
    }
  });
});
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
```
## bower
bower是一个客户端技术的软件包管理器，它可用于搜索、安装和卸载如JavaScript、HTML、CSS之类的网络资源。其他一些建立在Bower基础之上的开发工具，如YeoMan和gulp，这个会在以后的文章中介绍。  
```powershell
$ bower init  // 初始化
$ bower install package  --save // 安装包  --save 保存到配置文件
$ bower info // 查询包信息
$ bower update // update 包信息
$ bower search package // 查询包信息
$ bower uninstall package //卸载包
```

# sass or scss 
css的扩展语言  
http://www.jianshu.com/p/3c4b34d8143b  
https://www.sass.hk/docs/

# browsersync省时的浏览器同步测试工具
Browsersync能让浏览器实时、快速响应您的文件更改（html、js、css、sass、less等）并自动刷新页面。更重要的是 Browsersync可以同时在PC、平板、手机等设备下进项调试。您可以想象一下：“假设您的桌子上有pc、ipad、iphone、android等设备，同时打开了您需要调试的页面，当您使用browsersync后，您的任何一次代码保存，以上的设备都会同时显示您的改动”。无论您是前端还是后端工程师，使用它将提高您30%的工作效率。  
运维需要深入研究的是如何在tomcat,nginx或者其他的Web伺服器上引入browsersync
这个为测试提供多屏适配测试解决方案，重点研究！  
[文档](http://www.browsersync.cn/)

# chai & mocha
Chai is a BDD / TDD assertion library for node and the browser that can be delightfully paired with any javascript testing framework.


# electron 开发跨平台桌面应用
https://electron.atom.io/
