# Build V - Vue 视频构建工具

## 注意事项

录像组件 `CCapture` 存在兼容问题, 安装依赖后需修改下方文件

```
/node_modules/ccapture.js/src/CCapture.js
```

在 `CCapture.js` 顶部加入 `WebM` 格式支持

```
let WebMWriter = require('webm-writer');
```

然后将于此文件同目录的 `download.js` 中的代码合并到 `CCapture.js` 中

## 运行项目

运行前先安装依赖, 这里不建议使用 `cnpm`, 一定机率会导致 `webm-writer` 无法读取

```
npm install
```

安装完成后执行下方命令即可

```
npm run serve
```

## 部署项目

执行下方命令

```
npm run build
```

等待执行完成后将 `dist` 目录中的文件上传服务器即可

> 部署建议挂在域名根目录