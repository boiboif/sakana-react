<p align="center">
<img src="https://raw.githubusercontent.com/boiboif/sakana-react/main/src/assets/img/chisato.png" height="160px">
<img src="https://raw.githubusercontent.com/boiboif/sakana-react/main/src/assets/img/takina.png" height="160px">
</p>

# 🐟「Sakana! React!] 石蒜React小组件

[English](https://github.com/boiboif/sakana-react/blob/main/README.md) | [简体中文](https://github.com/boiboif/sakana-react/blob/main/README.zh.md)

[![NPM](https://img.shields.io/npm/v/sakana-react)](https://www.npmjs.com/package/sakana-react)

sakana-react 是一个使用 [react-spring](https://react-spring.io/) 构建的开箱即用的React组件，把它添加到你的React应用中吧！

<https://www.bbfbbf.cn/>

## Features

- 内置泷奈和千束角色图像并且可以使用自定义图像。
- 拖动角色后释放，会以角色为中心向反方向来回弹跳。
- 可以通过控制器切换角色图像，和拖动组件到别的位置。
- 支持自定义控制器。
- 支持响应式调整大小。

## Usage
通过npm或yarn包的形式安装组件。
```ts
npm i sakana-react-v2
// or
yarn add sakana-react-v2
```
作为React组件引入并使用
```ts
import SakanaReact from 'sakana-react'

const App = () => {

  return (
    <SakanaReact />
  )
}
```

## API

| Property         | Description                   | Type                       | Default  |
| -----------      | ---------------------------   | -------------------------  | ------- |
| width            | 组件的宽度        | `string` \| `number`       |  `200`      |
| characterSize    | 角色图像大小        | `string` \| `number`       | `80%` |
| showLine         | 是否显示图像和中心间的连线 | `boolean`  | `true` |
| lineWidth        | 连线的宽度             | `number`      | `4` |
| strokeStyle      | canvas 线条设置        | `string`      | `#333` |
| style            | 最外层容器样式  | `CSSProperties` | `-` |
| className        | 最外层容器的类名  | `string`        | `-` |
| character        | 角色图像(受控) | `takina` \| `chisato`     | `-` |
| defaultCharacter | 默认角色图像  | `takina` \| `chisato`     | `takina` |
| customCharacter  | 自定义角色图像   | `string`     | `-` |
| onControlerClick | 控制器点击事件    | `() => void`  | `-` |
| controlerSize    | 控制器大小             | `number` \| `string`  | `26` |
| customControler  | 自定义控制器              | `ReactNode`  | `-` |
| showControler    | 是否显示控制器               | `boolean`  | `true` |

## License
MIT

Image source: 大伏アオ [@blue00f4](https://twitter.com/blue00f4) [pixiv](https://pixiv.me/aoiroblue1340)
