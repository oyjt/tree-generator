# tree-generator
这是一个可以根据指定目录生成目录树的插件，形如
```
  ├─ css              // css
  │  ├─ common.css    // common.css
  │  └─ details.css   
  ├─ images           
  │  └─ logo.png      //
  └─ js               
     ├─ lib           
     │  └─ jquery.js  //
     ├─ common.js     
     ├─ home.js       
     └─ pages.js      //
```

# 功能
- 美观。连接线完美展示，注释位对齐
- 方便。只需右键点击生成即可复制到剪贴板上
- 快速。原生实现，不依赖任何第三方，性能高

> 已排除`node_modules`、`uni_modules`、`unpackage`文件夹和以.开头的文件或文件夹

# 使用说明
1. 在文件夹目录右击
2. 在弹出的对话框中选择【生成目录树】
3. 粘贴目录树到文档中

PS: 本插件根据vscode同名插件进行改造而成，原插件地址[tree-generator](https://github.com/XboxYan/tree-generator)