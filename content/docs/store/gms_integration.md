---
title: GMS (Google Mobile Services) 集成指南与签名配置
description: 详细介绍 Android 应用集成 Google Mobile Services 的流程，包括签名证书配置与上架准备。
keywords: GMS 集成, Google Play, Android 签名, 移动服务, 应用开发
---
# GMS 集成指南

## 签名与证书
- 生成签名文件  
  在 Android Studio 菜单执行：
  ```Build → Generate Signed Bundle/APK → …```

- 配置签名到编译选项  
  ```
  在 Android Studio 菜单执行：File → Project Structure → Modules → [选择 Module] → Signing Configs → [选择编译选项] → …
  ```

- 格式转换（JKS → PKCS12）  
  使用如下命令进行转换（请替换方括号内路径）：
  ```
  keytool -importkeystore -srckeystore [./my.keystore] -destkeystore [./my.pkcs12.keystore] -deststoretype pkcs12
  ```

> [!NOTE]
> - JKS 支持两个密码：store 与 key；PKCS12 仅使用一个密码（store 与 key 共用）。  
> - 若源 JKS 的 storepass 与 keypass 不同，转换时需要指定 `-destkeypass`；否则会出现  
>   `目标 pkcs12 密钥库具有不同的 storepass 和 keypass` 的报错。  
> - 使用错误密码打包会出现 `Given final block not properly padded`，请检查密码是否一致。

- 验证签名
  - 验证 keystore：
    ```
    keytool -list -v -keystore [签名文件路径]
    ```
  - 验证 APK 签名：
    ```
    1) 在 APK 的 META-INF 目录中找到 xxx.RSA
    2) 执行 keytool -printcert -file [xxx.RSA 文件路径]
    ```

## Firebase 集成
- 官方文档  
  [将 Firebase 添加到您的 Android 项目](https://firebase.google.com/docs/android/setup)

- AdMob 两种使用方式  
  [借助 Firebase](https://firebase.google.com/docs/admob/android/quick-start) 或 [独立 AdMob 版](https://developers.google.com/admob/android/quick-start)

- 项目接入步骤
  1. 登录并关联 App，生成 google-services.json
     - 将 google-services.json 放置到应用模块（包含 `apply plugin: 'com.android.application'` 的 build.gradle 同级目录）
  2. 在应用模块的 build.gradle 中增加依赖：
     ```
     dependencies {
         implementation 'com.google.firebase:firebase-ads:18.0.0'
         implementation 'com.google.firebase:firebase-analytics:17.5.0'
         implementation 'com.google.firebase:firebase-crashlytics:17.2.2'
         implementation 'com.google.firebase:firebase-core:17.0.0'
     }
     ```
     在文件末尾增加：
     ```
     apply plugin: 'com.google.gms.google-services'
     ```
  3. 在项目根目录的 build.gradle 中确保以下部分存在(否则会提示：找不到插件 com.google.gms.google-services)：
     ```
     buildscript {
         repositories { google() }
         dependencies {
             classpath 'com.google.gms:google-services:4.2.0'
         }
     }
     allprojects {
         repositories { google() }
     }
     ```

## AdMob 集成
- 登录 https://apps.admob.com/ 创建项目，并与 Firebase 与 Google Play 进行关联
