# Yc Design Vue Resolver

<p align="center">
  <a href="https://www.npmjs.com/package/yc-design-vue-resolver" target="_blank"><img src="https://img.shields.io/npm/v/yc-design-vue-resolver.svg" alt="NPM Version"></a>
  <a href="https://www.npmjs.com/package/yc-design-vue-resolver" target="_blank"><img src="https://img.shields.io/npm/dt/yc-design-vue-resolver.svg" alt="NPM Downloads"></a>
  <a href="./LICENSE" target="_blank"><img src="https://img.shields.io/github/license/your-github-username/yc-design-vue-resolver.svg" alt="License"></a>
</p>

`yc-design-vue-resolver` 是为 [yc-design-vue](https://yc-design-vue.vercel.app/) UI 库量身定制的组件解析器。

它专为 [Vite](https://vitejs.dev/) 项目设计，配合 [unplugin-vue-components](https://github.com/antfu/unplugin-vue-components) 插件，可以实现 `yc-design-vue` 组件及其样式的全自动按需导入。

你不再需要在每个文件中手动 `import { YcButton } from 'yc-design-vue'`，也无需在主文件里全局引入所有 CSS。现在，你只需在模板中直接使用 `<YcButton />`，插件和本解析器会自动处理剩下的所有事情。

## ✨ 功能特性

- **完全的按需导入**: 只打包你用到的组件代码和样式，有效减小生产环境的构建体积。
- **智能的样式依赖分析**: 自动解析并注入组件的所有依赖项样式。例如，当你使用 `YcSelect` 组件时，它所依赖的 `YcInput`, `YcSpin`, `YcScrollbar` 等组件的样式也会被一并引入，确保组件显示正常。
- **支持子组件**: 像 `YcLayoutContent` 或 `YcMenuItem` 这样的子组件也能被正确识别和导入。
- **无需手动引入样式**: 组件的 CSS 会随着组件的导入自动注入，包括基础样式和依赖样式。
- **配置简单**: 只需在 `vite.config.ts` 中添加几行代码即可启用。
- **类型友好**: 配合 `unplugin-vue-components` 的 `d.ts` 生成功能，获得完整的组件类型提示。

## 📦 安装

首先，你需要安装 `unplugin-vue-components` 和 `yc-design-vue-resolver`。

```bash
# 使用 npm
npm install unplugin-vue-components yc-design-vue-resolver -D

# 使用 yarn
yarn add unplugin-vue-components yc-design-vue-resolver -D

# 使用 pnpm
pnpm add unplugin-vue-components yc-design-vue-resolver -D
```

> `unplugin-auto-import` 也是一个推荐搭配使用的插件，它可以自动导入 Vue 的 API（如 `ref`, `reactive`）。

## 🚀 使用方法

修改你的 `vite.config.ts` 文件，引入插件和解析器：

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import YcDesignVueResolver from 'yc-design-vue-resolver';

export default defineConfig({
  plugins: [
    vue(),

    // 配置 unplugin-vue-components
    Components({
      // 默认情况下，`unplugin-vue-components` 只会扫描 `src/components` 目录
      // 要想让它识别 UI 库的组件，必须配置 resolvers
      resolvers: [YcDesignVueResolver()],

      // 自动生成 TypeScript 类型声明文件，在 `components.d.ts`
      // 这将为所有自动导入的组件提供类型支持
      dts: true,
    }),

    // 如果需要，可以同时配置 unplugin-auto-import
    // AutoImport({
    //   imports: ['vue', 'vue-router'],
    //   dts: 'src/auto-imports.d.ts',
    // }),
  ],
});
```

配置完成后，重启你的 Vite 服务。现在你就可以在任何 `.vue` 文件中直接使用 `yc-design-vue` 的组件了，无需任何 `import` 语句。

**使用前（需要在main.ts里面注册）:**

```typescript
import { createApp } from 'vue';
import App from './App.vue';
import YcDesignVue from 'yc-design-vue';
import 'yc-design-vue/es/style.css';
const app = createApp(App);
app.use(YcDesignVue);
app.mount('#app');
```

**使用后 (现在的方式，可直接使用无需注册):**

```vue
<template>
  <YcButton type="primary">按钮</YcButton>
  <YcInput placeholder="请输入..." />
</template>
```

## ⚙️ 选项配置

`YcDesignVueResolver` 支持一个 `exclude` 选项，用于阻止某些组件被自动导入。这在你需要对某个组件进行特殊处理或自定义导入时会非常有用。

`exclude` 选项可以是一个字符串、一个正则表达式，或者由它们组成的数组。

**示例：** 在 `vite.config.ts` 中配置

```typescript
// vite.config.ts
import Components from 'unplugin-vue-components/vite';
import YcDesignVueResolver from 'yc-design-vue-resolver';

// ...
Components({
  resolvers: [
    YcDesignVueResolver({
      // 排除单个组件
      exclude: 'YcModal',

      // 使用正则表达式排除所有以 'Layout' 结尾的组件
      // exclude: /Layout$/,

      // 使用数组排除多个组件和匹配项
      // exclude: ['Modal', 'Drawer', /^Grid.*/]
    }),
  ],
});
// ...
```

## 📄 License

[MIT](./LICENSE) License © 2025
