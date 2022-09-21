## oauth2 all in one
本项目参考了 Java 项目 JustAuth 的设计，将所有的第三方登录都整合到一个项目中，方便使用。
因为 JustAuth 项目是 Java 项目，Node 项目中没有类似的项目，所以本项目就诞生了。
原项目地址：[JustAuth](https://github.com/justauth/JustAuth)

设计上基本上保持一直，只是将 Java 项目中的代码翻译成了 Node 项目中的代码。做了一些小的改动，比如将 Java 项目中的枚举类型改成了字符串类型，因为 Node 项目中没有枚举类型。

目前支持的第三方登录有：
- [x] Google
- [x] Discord
- [x] Twitter

因为我公司只用到了这两个，其他的第三方登录后续会陆续实现。

项目地址：[oauth2-aio](https://github.com/xiaoxiunique/oauth2-aio)

## 使用方法

### 安装

```bash
npm install oauth2-aio
```

### 使用

```typescript
import {AuthGoogleRequest} from "../src";

const googleAuth = new AuthGoogleRequest({
  clientId: "clientId",
  clientSecret: "clientSecret",
  redirectUri: "redirectUri",
  scopes: []
})

const redirectUrl = googleAuth.authorize('32412341')
console.log(redirectUrl)
// exec(`open ${redirectUrl}`)

const r = await googleAuth.login({
  code: 'code'
})
console.log(r)
```
