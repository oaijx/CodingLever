# Vibe Lever


## 目录结构及建议

### 1. 逻辑目录设计 (推荐结构)
建议在根目录下创建两个核心文件夹：
- /content/docs/（**系统沉淀**）：存放 AI 技巧、Prompt 经验、个人总结。
    + 入门：什么是 Vibe Coding？核心心法。
    + 进阶：各领域（代码、文案、设计）的杠杆技巧。
- /content/tool/（**动态交互**）：存放你开发的 AI 工具。
    + 提示词生成器、格式转换器、AI 接口测试台。

### 2. 侧边栏
在 content/.vitepress/config.mts 中定义了侧边栏的目录结构数据：
- 全局侧边栏(Global Sidebar)
```
sidebar: [
  {
    text: 'Vibe Coding 实战手册', // 给侧边栏加个大标题
    items: [
      { text: '第1章：快速入门', link: '/chapter1/' },
      { 
        text: '第2章：深度进阶', 
        collapsed: false, // 允许展开/折叠
        items: [
          { text: '2.1 节：杠杆原理', link: '/chapter2/chapter2_1' },
          { text: '2.2 节：提示词工程', link: '/chapter2/chapter2_2' }
        ]
      }
    ]
  }
]
```
全局侧边栏的优点就是：简单直接，用户在任何页面都能看到全站目录，不容易迷路。

- 局部侧边栏(Local Sidebar)
如果你希望只有进入文档页面时才显示这个侧边栏，而进入工具页面时显示另一套菜单，你需要把 sidebar 改成对象格式：
```
sidebar: {
  '/docs/': [ 
    {
      text: 'Vibe Coding 教程',
      items: [
        { text: '第1章', link: '/docs/chapter1/' },
        // ...
      ]
    }
  ],
  '/tool/': [
    { text: '常用工具', items: [ { text: '计算器', link: '/tool/calc' } ] }
  ]
}
```

### 2. 如何在 Markdown 文章中区分章节？
在写具体的 .md 文件时，遵循以下视觉规范，你的页面会非常漂亮：
```
# 标题：这里写文章总标题 (h1)

这里写文章的简介，SEO 爬虫最看重这段话。

## 第一章：核心概念 (h2)
这是大章节。右侧大纲会显示这一项。

### 1.1 什么是杠杆？ (h3)
这是子章节。

---
## 第二章：实战演练 (h2)
...
```

### 3. 关键：如何实现“非静态”的工具页面？
由于你以后要写非静态工具，我建议你从一开始就养成这个习惯：
1. 静态内容：写在 .md 里。
2. 动态组件：写在 .vitepress/theme/components/ 下的 .vue 文件里。
3. 引用：在 Markdown 里像 HTML 一样引入。



## Reference
比较常见的框架为：**Docusaurus** 和 **VitePress**, 处于不同的定位：
- **[Docusaurus](https://github.com/facebook/docusaurus)** 更侧重于静态网站生成，适合文档类网站。
- **[VitePress](https://github.com/vuejs/vitepress)** 则更注重于静态网站生成和 Markdown 文档的渲染，适合博客和技术文档。
