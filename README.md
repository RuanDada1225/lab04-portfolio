# 阮伟杰 · 个人作品集

基于原生 HTML / CSS / JavaScript 的个人作品集网站，展示个人介绍、技能方向与精选项目。本项目在实验 3 基础上迭代，新增浅色 / 深色主题切换，并使用 Git 管理开发过程。

## 功能

- 响应式个人作品集页面，兼容桌面端与移动端
- 项目数据由 `js/projects.js` 渲染，支持按类别筛选
- 顶部导航栏右侧支持浅色 / 深色主题切换
- 使用 `localStorage` 记住用户上一次选择的主题
- 滚动淡入、当前导航高亮、移动端菜单等基础交互

## 技术栈

- HTML
- CSS
- JavaScript

未使用 React、Vue 等前端框架，也未引入第三方 UI 组件库。

## 项目结构

```text
lab04/
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── main.js
│   └── projects.js
├── images/
│   ├── chengshimai.svg
│   ├── keyutong.svg
│   ├── qingjizhang.svg
│   └── shiguangjishi.svg
└── profile.md
```

## 本地运行

可直接用 Live Server 打开 `index.html`，或在项目根目录运行：

```bash
python -m http.server 5500
```

然后访问：

```text
http://localhost:5500/
```

## Git 与部署

- 仓库地址：https://github.com/RuanDada1225/lab04-portfolio
- GitHub Pages 地址：https://RuanDada1225.github.io/lab04-portfolio/

主要提交记录：

- `Initial commit`：导入实验 3 作品集项目并初始化版本管理
- `feat: 增加深浅色主题切换功能`：新增主题切换按钮、深色主题变量与本地记忆
- `chore: 忽略临时日志文件`：补充 `.gitignore`
- `docs: 添加项目 README`：补充项目说明文档
