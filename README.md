<p align="center">
<img src="https://raw.githubusercontent.com/boiboif/sakana-react/main/src/assets/img/chisato.png" height="160px">
<img src="https://raw.githubusercontent.com/boiboif/sakana-react/main/src/assets/img/takina.png" height="160px">
</p>

# 🐟「Sakana! React!]

[English](https://github.com/boiboif/sakana-react/blob/main/README.md) | [简体中文](https://github.com/boiboif/sakana-react/blob/main/README.zh.md)

[![NPM](https://img.shields.io/npm/v/sakana-react)](https://www.npmjs.com/package/sakana-react)

sakana-react-v2 is a widget react component built with [react-spring](https://react-spring.io/).

<https://www.bbfbbf.cn/>

## Features

- Build in takina and chisato character and use your own custom character.
- Drag the character and release it, it will jump back and forth around the character.
- Use controler to move your component and change character.
- Support custom controller.
- Auto resizing support.

## Usage
First install the package by npm or yarn.
```ts
npm i sakana-react-v2
// or
yarn add sakana-react-v2
```
Use in React component
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
| width            | Width of the component        | `string` \| `number`       |  `200`      |
| characterSize    | Size of character img         | `string` \| `number`       | `80%` |
| showLine         | Whether the line that connection between character and center is visible or not | `boolean`  | `true` |
| lineWidth        | Width of the line             | `number`      | `4` |
| strokeStyle      | Canvas stroke settings        | `string`      | `#333` |
| style            | The style of the wrapper dom  | `CSSProperties` | `-` |
| className        | The class name of the wrapper dom  | `string`        | `-` |
| character        | Build in character image path | `takina` \| `chisato`     | `-` |
| defaultCharacter | Deafult character image path  | `takina` \| `chisato`     | `takina` |
| customCharacter  | Custom character image path   | `string`     | `-` |
| onControlerClick | Set the handler to handle controler click event    | `() => void`  | `-` |
| controlerSize    | Size of Controler             | `number` \| `string`  | `26` |
| customControler  | Custom controler              | `ReactNode`  | `-` |
| showControler    | Whether the controler is visible or not               | `boolean`  | `true` |

## License
MIT

Image source: 大伏アオ [@blue00f4](https://twitter.com/blue00f4) [pixiv](https://pixiv.me/aoiroblue1340)
