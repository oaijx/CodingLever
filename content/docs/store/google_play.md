---
title: Google Play 上架实战与政策指南
description: 深度解析 Google Play Console 操作流程、应用审核政策、合规性要求及 AAB 发布实战。
keywords: Google Play, 上架流程, 谷歌商店政策, Data Safety, AAB, 应用发布
---

# Google Play 上架与运营指南

上架 Google Play 是出海开发者的核心环节。除了技术层面的 GMS 集成，商店的政策合规与发布管理同样至关重要。

---

## 1. 账号与控制台准备
### 1.1 开发者账号
- **注册**：需要支付一次性 25 美元的费用。
- **身份验证**：自 2023 年起，Google 对新账号和存量账号均要求进行身份验证（D-U-N-S 编号或个人身份）。

### 1.2 控制台 (Google Play Console)
- **主要模块**：
  - **信息中心**：整体状态与任务提醒。
  - **发布**：管理不同测试轨道与生产轨道。
  - **商店详情**：配置元数据（标题、描述、图标、截图）。
  - **政策与合规性**：处理声明与审核问题。

---

## 2. 商店列表与元数据
### 2.1 视觉素材要求
- **图标**：512x512 32 位 PNG。
- **置顶大图**：1024x500。
- **截图**：至少 2 张手机截图，建议包含平板与大屏设备。

### 2.2 多语言本地化
- **重要性**：为不同国家/地区配置本地化的标题和描述可显著提升转化率。
- **自动翻译**：控制台提供机器翻译功能，但建议人工校对。

---

## 3. 发布管理与 AAB
### 3.1 Android App Bundle (AAB)
- 自 2021 年起，新应用必须使用 AAB 格式发布。
- **优势**：Google Play 会根据用户设备自动拆分 APK，减小下载体积。

### 3.2 测试轨道
- **内部测试**：最快分发方式，最多 100 名测试人员，无需审核。
- **封闭测试 (Alpha)**：针对特定群组进行测试。
- **开放测试 (Beta)**：任何用户都可以在商店加入测试。
- **生产轨道**：正式发布给全量用户。

### 3.3 Google Play 应用签名
- 必须加入 Google Play 应用签名计划，由 Google 管理签名密钥，确保 AAB 能够正确拆分为 APK。

---

## 4. 政策合规性 (核心关注)
### 4.1 数据安全 (Data Safety)
- 必须详细说明应用收集哪些数据、数据用途以及是否与第三方共享。
- **常见坑点**：即使是第三方 SDK（如广告、分析）收集的数据，也必须在声明中体现。

### 4.2 隐私政策
- 必须提供有效的隐私政策 URL，且内容必须符合 Google 的透明度要求。

### 4.3 金融与版权
- 严禁假冒、侵权内容。
- 涉及金融交易必须符合当地法律法规。

## 5. 技术集成 (GMS 与支付)

在完成应用上架准备后，核心的技术集成工作通常围绕 Google Sign-In 和 Google Play 结算系统展开。

### 5.1 Google Sign-In (谷歌登录)
- **文档参考**：
  - [Google Sign-In for Android](https://developers.google.com/identity/sign-in/android/start)
  - [使用 OAuth 2.0 访问 Google API](https://developers.google.com/identity/protocols/oauth2)

- **登录模式选择**：
  1. **requestIdToken**：
     - 使用 `GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_SIGN_IN).requestIdToken` 获取 ID Token。
     - **注意**：ID Token 会过期。若未处理登出，重新进入 App 时可通过 `silentSignIn` 刷新获取。
     - **安全建议**：使用 Google ID (而非 Email) 来识别用户唯一性，因为 Email 地址可以更改。
     - **服务端验证**：必须将 ID Token 发送到服务器验证，以防客户端伪造用户 ID。
  2. **requestServerAuthCode**：
     - 用于服务器代表用户进行离线 API 调用。每次登录时需重新获取 AuthCode 以处理账号切换。
  3. **基础登录 (Basic Profile)**：
     - 不需要服务端参与，即可获取用户的 ID、Email 和基础个人信息。

### 5.2 Google Play Billing (结算系统)
- **核心流程**：
  ```mermaid
  flowchart LR
    A(创建订单) --> B(建立GP服务连接) --> C(查询GP商品信息) --> D(确认商品购买策略) --> E(发起支付) --> F(订单确认) --> H(订单履约)
  ```

- **商品类型**：
  - **INAPP (一次性商品)**：分为“消耗型”（可重复购买，如金币）和“非消耗型”（永久解锁）。
  - **SUBS (订阅)**：包含三个层级：Subscription (商品 ID) -> Plan (价格方案) -> Offer (优惠方案)。

- **订单确认 (重要)**：
  - 支付成功后必须在 **3 天内** 进行确认（Acknowledge），否则 Google 会自动退款。
  - 消耗型商品需通过 `consumeAsync` 确认，非消耗型通过 `acknowledgePurchase` 确认。

### 5.3 Google Pay (电子钱包)
- Google Pay 本质上是电子钱包，常作为第三方支付网关（如 Stripe）的渠道之一进行集成。

---

## 6. 测试与常见问题
### 6.1 测试流程
1. **控制台配置**：在 Google Console 添加测试账号（包括“内测用户”和“许可测试”）。
2. **接受邀请**：测试员必须点击内测链接并手动“接受邀请”方可下载。
3. **版本发布**：需发布一个内测版本（无需等待审核通过即可开始测试）。

### 6.2 常见技术坑点
- **服务连接失败**：测试时务必确保 VPN 环境（建议非香港节点），若仍失败可尝试清除 Google Play 商店缓存并重新登录。
- **查询不到商品**：检查应用包名、签名是否与控制台上传的 AAB 一致，且商品状态是否为“有效”。

---

## 7. 常见审核问题与避坑
- **描述性文字违规**：禁止在描述中使用“Top 1”、“Best”等夸大词汇。
- **应用内更新**：严禁通过第三方渠道下载更新 APK，必须通过 GP 商店。
- **登录方式**：如果应用提供第三方登录，必须确保第三方服务（如 Facebook）能正常在测试机上运行。

---

## 8. 参考资源
- [Google Play 管理中心帮助](https://support.google.com/googleplay/android-developer)
- [Android 开发者政策中心](https://play.google.com/about/developer-content-policy/)
- [Google Play 结算系统开发文档](https://developer.android.com/google/play/billing)
