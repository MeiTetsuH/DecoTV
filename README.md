<!-- markdownlint-disable MD033 MD026 MD034 -->

<h1 align="center">
  <img src="public/logo.png" alt="DecoTV Logo" width="160" style="margin-bottom: 12px;" />
  <br />
  DecoTV
</h1>

> 🎬 **DecoTV** 是一个开箱即用的、跨平台的影视聚合播放器。它基于 **Next.js 16** + **Tailwind&nbsp;CSS 4** + **TypeScript 5** 构建，支持多资源搜索、在线播放、收藏同步、播放记录、云端存储，让你可以随时随地畅享海量免费影视内容。**使用 Vercel + Upstash 一键部署，零运维成本。**

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16-000?logo=nextdotjs)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38bdf8?logo=tailwindcss)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6?logo=typescript)
![License](https://img.shields.io/badge/License-MIT-green)
![Vercel](https://img.shields.io/badge/Vercel-deployed-black?logo=vercel)

</div>

---

## 🎬 项目展示

<div align="center">
  <table>
    <tr>
      <td align="center">
        <img src="public/screenshot1.png" alt="明亮模式" width="400">
        <br>
        <sub><b>明亮模式</b></sub>
      </td>
      <td align="center">
        <img src="public/screenshot2.png" alt="暗夜模式" width="400">
        <br>
        <sub><b>暗夜模式</b></sub>
      </td>
    </tr>
  </table>
</div>

---

### ⚠️ 重要提醒

> **注意**：部署后项目为空壳项目，无内置播放源和直播源，需要自行收集配置。  
> **免责声明**：请不要在 B 站、小红书、微信公众号、抖音、今日头条或其他中国大陆社交平台发布视频或文章宣传本项目，不授权任何"科技周刊/月刊"类项目或站点收录本项目。

## ✨ 功能特性

- 🔍 **多源聚合搜索**：一次搜索立刻返回全源结果
- 📄 **丰富详情页**：支持剧集列表、演员、年份、简介等完整信息展示
- ▶️ **流畅在线播放**：集成 HLS.js & ArtPlayer
- 🔊 **多音轨切换**：自动检测多音轨并提供切换控制
- 🖥️ **网页投屏（Google Cast）**：支持在网页端直接发起投屏
- ❤️ **收藏 + 继续观看**：支持 Upstash 云端存储，多端同步进度
- 👤 **用户注册系统**：支持用户自助注册（可选），带图形验证码防机器人
- 📱 **PWA**：离线缓存、安装到桌面/主屏，移动端原生体验
- 🌗 **响应式布局**：桌面侧边栏 + 移动底部导航，自适应各种屏幕尺寸
- 📺 **弹幕功能**：集成弹弹play弹幕库，支持模糊匹配优化、手动匹配与多节点自定义配置
- ☁️ **PanSou 网盘搜索**：支持对接远程 PanSou 节点，提供聚合网盘搜索能力
- ⬇️ **视频资源下载**：支持浏览器分片下载，m3u8 自动解析分片合并导出
- 📡 **灵活直播体验**：支持多直播源配置、分页切换优化与 m3u8/flv/mp4 自动识别
- 🧠 **豆瓣信息增强**：支持标题反查豆瓣 ID、并行抓取与图片代理
- 🎞️ **TMDB 元数据增强**：中文优先、英文回退，补充海报、背景图与简介
- 🗂️ **私人影库**：支持接入 OpenList / 小雅 Alist / Emby / Jellyfin
- 👿 **智能去广告**：自动跳过视频中的切片广告（实验性）
- 🏠 **本地无数据库模式**：无需数据库，自动降级为浏览器 localStorage 存储
- 🌐 **CMS 全量代理**：根绝 Mixed Content 和 CORS 问题，支持任意第三方源
- 🛡️ **隐私纵深防御**：双重熔断机制，从配置到代理层隔离成人内容

## 🗺 目录

- [🎬 项目展示](#-项目展示)
- [✨ 功能特性](#-功能特性)
- [🛠 技术栈](#-技术栈)
- [🚀 部署](#-部署)
- [⚙️ 配置文件](#️-配置文件)
- [🌍 环境变量](#-环境变量)
- [⬇️ 下载功能](#️-下载功能)
- [📺 AndroidTV 使用](#-androidtv-使用)
- [🔒 安全与隐私提醒](#-安全与隐私提醒)
- [📄 License](#-license)
- [🙏 致谢](#-致谢)

## 🛠 技术栈

| 分类      | 主要依赖                                                                                              |
| --------- | ----------------------------------------------------------------------------------------------------- |
| 前端框架  | [Next.js 16](https://nextjs.org/) · App Router · Turbopack                                            |
| UI & 样式 | [Tailwind&nbsp;CSS 4](https://tailwindcss.com/)                                                       |
| 语言      | TypeScript 5                                                                                          |
| 播放器    | [ArtPlayer](https://github.com/zhw2590582/ArtPlayer) · [HLS.js](https://github.com/video-dev/hls.js/) |
| 代码质量  | ESLint 9 · Prettier 3 · Jest 29                                                                       |
| 数据存储  | [Upstash Redis](https://upstash.com/) (HTTP)                                                          |
| 部署平台  | [Vercel](https://vercel.com/)                                                                         |

## 🚀 部署

本项目使用 **Vercel + Upstash** 一键部署，无需服务器、无需运维。

### 📋 部署步骤

#### 1. Fork 本仓库

点击右上角 **Fork** 按钮，将项目复制到你的 GitHub 账号下。

#### 2. 创建 Upstash Redis 数据库

1. 注册 [Upstash](https://upstash.com/) 账号
2. 创建一个新的 Redis 数据库，区域推荐选离你最近的

#### 3. 部署到 Vercel

1. 登录 [Vercel](https://vercel.com/)，点击 **Add New → Project**
2. 导入你 Fork 的仓库
3. **Framework Preset** 选择 **Next.js**（⚠️ 重要，不要选 Other）
4. 在 **Environment Variables** 中添加以下环境变量：

| 变量名 | 值 | 说明 |
|--------|-----|------|
| `USERNAME` | 你的管理员用户名 | 必填 |
| `PASSWORD` | 你的管理员密码 | 必填 |
| `NEXT_PUBLIC_STORAGE_TYPE` | `upstash` | 必填 |
| `NEXT_PUBLIC_SITE_NAME` | 你的站点名称 | 可选，默认 DecoTV |

5. 点击 **Deploy**

#### 4. 集成 Upstash

1. 在 Vercel 项目的 **Settings → Integrations** 中搜索 **Upstash**
2. 授权并绑定你刚才创建的 Redis 数据库
3. Vercel 会自动注入 `KV_REST_API_URL` 和 `KV_REST_API_TOKEN` 环境变量
4. **重新部署**一次使环境变量生效

> 💡 也可以手动配置 Upstash 变量，支持以下任一组命名：
> - `KV_REST_API_URL` + `KV_REST_API_TOKEN`（Vercel 集成自动注入）
> - `UPSTASH_REDIS_REST_URL` + `UPSTASH_REDIS_REST_TOKEN`
> - `UPSTASH_URL` + `UPSTASH_TOKEN`

#### 5. 配置播放源

部署完成后为**空壳应用**，需要在管理后台 `/admin` 的配置文件设置中填写播放源和直播源。

---

### 🏠 本地无数据库模式（最简部署）

如果你只想快速体验，不需要多端同步功能，可以**不配置 Upstash**：

| 变量名 | 值 |
|--------|-----|
| `PASSWORD` | 你的管理密码 |

此模式下数据保存在浏览器的 localStorage 中，清除浏览器数据会丢失配置。

## ⚙️ 配置文件

完成部署后为空壳应用，无播放源，需要站长在管理后台 `/admin` 的配置文件设置中填写配置文件。

配置文件示例：

```json
{
  "cache_time": 7200,
  "api_site": {
    "dyttzy": {
      "api": "http://xxx.com/api.php/provide/vod",
      "name": "示例资源",
      "detail": "http://xxx.com"
    }
  },
  "custom_category": [
    {
      "name": "华语",
      "type": "movie",
      "query": "华语"
    }
  ],
  "lives": {
    "iptv": {
      "name": "IPTV直播",
      "url": "https://example.com/live.m3u"
    }
  }
}
```

**字段说明：**

- `cache_time`：接口缓存时间（秒）
- `api_site`：资源站配置
  - `key`：唯一标识
  - `api`：资源站 JSON API 地址（苹果 CMS V10 格式）
  - `name`：显示名称
  - `detail`：（可选）网页详情 URL，用于补充信息
- `custom_category`：自定义分类（movie / tv），对应豆瓣搜索关键词
- `lives`：直播源配置

## 🌍 环境变量

### 基础配置

| 变量 | 说明 | 默认值 | 备注 |
|------|------|--------|------|
| `USERNAME` | 管理员账号 | — | Upstash 模式**必填** |
| `PASSWORD` | 管理员密码 | — | **必填** |
| `NEXT_PUBLIC_SITE_NAME` | 站点名称 | DecoTV | — |
| `NEXT_PUBLIC_STORAGE_TYPE` | 存储类型 | localstorage | 推荐 `upstash` |
| `SITE_BASE` | 站点 URL | — | 可选 |
| `ANNOUNCEMENT` | 站点公告 | 默认免责声明 | 可选 |

### Upstash 存储配置

使用 Vercel Upstash 集成会**自动注入**以下变量，无需手动配置：

| 变量 | 说明 |
|------|------|
| `KV_REST_API_URL` | Upstash REST API 地址 |
| `KV_REST_API_TOKEN` | Upstash REST API 令牌 |

> 也支持 `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` 或 `UPSTASH_URL` / `UPSTASH_TOKEN`

### 用户注册配置

| 变量 | 说明 | 默认值 |
|------|------|--------|
| `NEXT_PUBLIC_ENABLE_REGISTRATION` | 开启用户注册 | false |
| `DEFAULT_REGISTRATION_GROUP` | 注册用户默认分组 | — |

> ⚠️ 建议默认关闭注册，仅在需要时临时开启。

### 高级配置

| 变量 | 说明 | 默认值 |
|------|------|--------|
| `NEXT_PUBLIC_SEARCH_MAX_PAGE` | 搜索最大页数 | 5 |
| `NEXT_PUBLIC_DOUBAN_PROXY_TYPE` | 豆瓣数据源代理 | direct |
| `NEXT_PUBLIC_DOUBAN_IMAGE_PROXY_TYPE` | 豆瓣图片代理 | direct |
| `NEXT_PUBLIC_DISABLE_YELLOW_FILTER` | 关闭内容过滤 | false |
| `NEXT_PUBLIC_FLUID_SEARCH` | 流式搜索 | true |
| `TMDB_API_KEY` | TMDB API 密钥 | — |
| `TMDB_PROXY` | TMDB 正向代理 | — |
| `TMDB_REVERSE_PROXY` | TMDB 反向代理 | — |

#### 豆瓣代理类型可选值

| 值 | 说明 |
|----|------|
| `direct` | 服务器直连（默认） |
| `cors-proxy-zwei` | Zwei CORS Proxy |
| `cmliussss-cdn-tencent` | CMLiussss 腾讯云 CDN |
| `cmliussss-cdn-ali` | CMLiussss 阿里云 CDN |
| `custom` | 自定义代理 |

### 弹幕功能

集成了 [弹弹play开放平台](https://www.dandanplay.com/) 弹幕库。如需使用，请自行到弹弹play申请 API 凭证并配置 `DANDANPLAY_APP_ID` 和 `DANDANPLAY_APP_SECRET` 环境变量。

### 网盘搜索（PanSou）

推荐先部署 [fish2018/pansou](https://github.com/fish2018/pansou)，然后在 DecoTV 后台 `PanSou 配置` 中填入服务地址。

### TMDB 元数据增强

1. 到 [TMDB](https://www.themoviedb.org/) 申请 API Key
2. 配置 `TMDB_API_KEY` 环境变量
3. 在后台执行 `TMDB 连通性测试`

### 私人影库（OpenList / Emby / Jellyfin）

在后台 `私人影库` 配置中添加连接，支持：

- **OpenList / 小雅 Alist**：填写服务地址、Token、根路径
- **Emby / Jellyfin**：填写服务地址、API Key，可选用户 ID

更多详情见 [TMDB 与私人影库部署说明](./docs/tmdb-private-library-deployment.md)

## ⬇️ 下载功能

### 浏览器分片下载

在播放页点击 `下载当前集`，m3u8 资源会自动解析分片并下载，完成后在浏览器本地合并导出。

> **注意**：Vercel 部署环境不支持 FFmpeg 服务端转存下载，仅支持浏览器端下载。

## 📺 AndroidTV 使用

本项目可配合 [OrionTV](https://github.com/zimplexing/OrionTV) 在 Android TV 上使用，支持播放记录与网页端同步。

详细配置：
- 📖 [OrionTV 使用指南](./docs/OrionTV使用指南.md)
- 🔒 [成人内容过滤使用指南](./docs/成人内容过滤使用指南.md)

## 🔒 安全与隐私提醒

### 部署要求

1. **设置环境变量 `PASSWORD`**：为您的实例设置一个强密码
2. **仅供个人使用**：请勿将您的实例链接公开分享或传播
3. **遵守当地法律**：请确保您的使用行为符合当地法律法规

### 重要声明

- 本项目仅供学习和个人使用
- 请勿将部署的实例用于商业用途或公开服务
- 如因公开分享导致的任何法律问题，用户需自行承担责任
- 项目开发者不对用户的使用行为承担任何法律责任
- 本项目不在中国大陆地区提供服务。如有该项目在向中国大陆地区提供服务，属个人行为。在该地区使用所产生的法律风险及责任，属于用户个人行为，与本项目无关，须自行承担全部责任

## 📄 License

[MIT](LICENSE) © 2025 DecoTV & Contributors

## 🙏 致谢

- [LunaTV](https://github.com/Decohererk/DecoTV) — 本项目基于 DecoTV（原 LunaTV）修改适配 Vercel 部署。
- [ArtPlayer](https://github.com/zhw2590582/ArtPlayer) — 强大的网页视频播放器。
- [HLS.js](https://github.com/video-dev/hls.js) — HLS 流媒体浏览器播放支持。
- [Upstash](https://upstash.com/) — 提供 Serverless Redis 服务。
- [Vercel](https://vercel.com/) — 提供零配置部署平台。
- [Zwei](https://github.com/bestzwei) — 提供豆瓣数据 CORS Proxy。
- [CMLiussss](https://github.com/cmliu) — 提供豆瓣 CDN 服务。
- 感谢所有提供免费影视接口的站点。

---

<div align="center">
  <p>
    <strong>🌟 如果觉得项目有用，请点个 Star 支持一下！🌟</strong>
  </p>
</div>
