<p align="center">
<img src="https://raw.githubusercontent.com/boiboif/sakana-react/main/src/assets/img/chisato.png" height="160px">
<img src="https://raw.githubusercontent.com/boiboif/sakana-react/main/src/assets/img/takina.png" height="160px">
</p>

# 🐟「Sakana! React!] 石蒜 React 小组件

[English](https://github.com/boiboif/sakana-react/blob/main/README.md) | [简体中文](https://github.com/boiboif/sakana-react/blob/main/README.zh.md)

[![NPM](https://img.shields.io/npm/v/sakana-react)](https://www.npmjs.com/package/sakana-react)

sakana-react 是一个使用 [react-spring](https://react-spring.io/) 构建的开箱即用的 React 组件，把它添加到你的 React 应用中吧！

<https://bbfbbf.cn>

## Features

- 内置泷奈和千束角色图像并且可以使用自定义图像。
- 拖动角色后释放，会以角色为中心向反方向来回弹跳。
- 可以通过控制器切换角色图像，和拖动组件到别的位置。
- 支持自定义控制器。
- 支持响应式调整大小。

## Usage

通过 npm 或 yarn 包的形式安装组件。

```ts
npm i sakana-react
// or
yarn add sakana-react
```

作为 React 组件引入并使用

```ts
import { SakanaReact } from 'sakana-react';

const App = () => {
  return <SakanaReact />;
};
```

## API

| Property         | Description                | Type                  | Default  |
| ---------------- | -------------------------- | --------------------- | -------- |
| width            | 组件的宽度                 | `string` \| `number`  | `200`    |
| characterSize    | 角色图像大小               | `string` \| `number`  | `80%`    |
| showLine         | 是否显示图像和中心间的连线 | `boolean`             | `true`   |
| lineWidth        | 连线的宽度                 | `number`              | `4`      |
| strokeStyle      | canvas 线条设置            | `string`              | `#333`   |
| style            | 最外层容器样式             | `CSSProperties`       | `-`      |
| className        | 最外层容器的类名           | `string`              | `-`      |
| character        | 角色图像(受控)             | `takina` \| `chisato` | `-`      |
| defaultCharacter | 默认角色图像               | `takina` \| `chisato` | `takina` |
| customCharacter  | 自定义角色图像             | `string`              | `-`      |
| onControlerClick | 控制器点击事件             | `() => void`          | `-`      |
| controlerSize    | 控制器大小                 | `number` \| `string`  | `26`     |
| customControler  | 自定义控制器               | `ReactNode`           | `-`      |
| showControler    | 是否显示控制器             | `boolean`             | `true`   |

## 从源码构建

在仓库根目录运行以下命令，用项目指定的 pnpm 安装依赖。`npm pack` 会执行 Father 构建并生成与发布包相同结构的压缩包，其中包含 ESM、类型声明和图片资源。

```sh
corepack pnpm install --frozen-lockfile
npm pack
```

应用可以安装生成的 `.tgz` 进行发布前验证。若从 Git 安装，把依赖固定到已经推送的完整提交，例如 `git+https://github.com/boiboif/sakana-react.git#<完整提交 SHA>`，并提交应用的锁文件。pnpm 10 会在独立目录中调用 `prepack` 生成 `dist`。需要构建授权时，将 pnpm 提示的包含该提交的完整包标识加入应用的 `onlyBuiltDependencies`。

维护文档和本地 Git 钩子时运行 `corepack pnpm run setup`。版本记录使用 Changesets，`corepack pnpm run version-packages` 应用待发布的版本变更，`corepack pnpm run release` 发布到 npm。

## License

MIT

Image source: 大伏アオ [@blue00f4](https://twitter.com/blue00f4) [pixiv](https://pixiv.me/aoiroblue1340)
