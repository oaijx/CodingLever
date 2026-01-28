---
title: Linux 内存缓慢增长问题排查与优化
description: 分析 Linux 系统内存缓慢增长的常见原因（如内存泄漏、缓存未释放），并提供有效的监控与处理方案。
keywords: Linux 内存, 内存泄漏, 系统监控, 性能调优, 内存管理
---

# linux 内存缓慢增长问题

在遇到 内存、cpu 等系统资源 缓慢增长问题时，可以使用类似的脚本进行数据采样，然后通过对格式化数据分析找到 具体的服务(进程)。

## 监控脚本
```
    #!/bin/bash

    # */1 * * * * bash /data/data_tmp/monitor.sh

    now=`date +%Y%m%d`
    /usr/bin/top -c -b -n 1 | sort -nr -k10 | head -n 20 | tee >>/data/data_tmp/top_$now.txt

    tow_days_ago=`date +%Y%m%d -d "5 day ago"`
    if [ -f /data/data_tmp/top_${tow_days_ago}.txt ];then
    rm -f /data/data_tmp/top_${tow_days_ago}.txt
    fi
```

## 分析数据
```
    # 按进程名分组写入不同的文件
    cat tmp.txt | grep -v % | grep -v KiB | grep -v Tasks | sort -r -k12 -k11 | awk '{print $0 >> $12".rlog"}'
```
