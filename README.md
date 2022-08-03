# vue-music of Vue 3 + TypeScript + Vite

This project is a music project of Netease cloud music API. Please do not use it for any illegal purposes

该项目是网易云音乐api的一个音乐工程，请不要用于任何非法用途

## Quick start | 快速开始

## Clone | 克隆

> git@github.com:mekefly/vue-music.git

## Enter folder | 进入目录

> cd vue-music

## install | 安装

> pnpm install
or
> npm install
or
> yarn

## run | 运行

> npm start

## 更多帮助

### 什么是本地缓存？

答：我使用localStorage做了一个小巧的自动缓存，这个缓存最大可以缓存5MB的请求api的数据，可以减少请求服务器的次数，但由于localStorage只正存储文本数据，所以使用localStorage缓存效率并不是很高，所以我在其基础上增加了一个二级缓存，当请求localStorage得到缓存后将自动存储到内存中，这样对于某个热门接口可以拥有更快的效率

### 那会占用很多空间吗？

答：不会，因为缓存有时效性，到缓存超时后，当您下一次打开这个网页时将自动清理已过期的缓存，这样就可以在缓存爆炸后也能自动修正

### 那对于音乐来说5MB是否太小了？

答：这个小缓存只会缓存API的请求数据，音乐的缓存浏览器会自动进行管理，包括图片在内，他们都属于浏览器自动管理的缓存区域，我们不用管它

### 什么是合并请求？

答：对于一些固定API来说，例如根据ID获取URL，那么他们获取的URL一般是同一个，这时候我们就可以使用合并请求。

**另外他还有额外的优点**

1. 当同一时间（在第一个请求还未返回结果的时候）请求同一个资源时，等待第一个请求返回正确正常的结果后，请求的结果将同时返回到请求本资源的函数，它与缓存合并，在不同时间请求时缓存就会应答请求，这样短时间内就不会有一堆请求被发出
2. 我们在写API获取数据时就不用老是想着哪一个公共API去存储某一个数据了。比如组件一需要歌曲信息，组建二也需要，这时候有两个方法，一是新建一个文件用的存储请求信息，然后在这个公共存储中发出请求，二就是我们直接在组件中发出请求，不用管它会不会发出去，因为同一时间只能发出一个请求，这时候哪怕有新的组件三也需要这个数据，也只需要正常的做请求就可，业务逻辑更简单

## Recommended IDE Setup | 推荐的编辑器和设置

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)

## Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can enable Volar's Take Over mode by following these steps:

1. Run `Extensions: Show Built-in Extensions` from VS Code's command palette, look for `TypeScript and JavaScript Language Features`, then right click and select `Disable (Workspace)`. By default, Take Over mode will enable itself if the default TypeScript extension is disabled.
2. Reload the VS Code window by running `Developer: Reload Window` from the command palette.

You can learn more about Take Over mode [here](https://github.com/johnsoncodehk/volar/discussions/471).
