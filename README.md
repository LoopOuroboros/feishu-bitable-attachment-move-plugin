# 飞书多维表格附件移动插件

这是一个飞书多维表格插件，用于在不同字段之间移动或复制附件。

## 功能特点

- 支持在不同附件字段之间移动附件
- 支持在不同附件字段之间复制附件
- 支持通过文本匹配筛选需要移动/复制的附件
- 完全支持中英文国际化

## 使用方法

1. 在飞书多维表格中安装此插件
2. 在自动化流程中添加此动作
3. 配置以下参数：
   - 源附件字段：选择包含原始附件的字段
   - 目标附件字段：选择要移动/复制附件到的字段
   - 移动类型：选择"移动"或"复制"
   - 匹配文本：输入用于筛选附件的文本（附件名称包含此文本的将被处理）

## 开发

### 环境要求

- Node.js >= 14
- npm 或 yarn

### 安装依赖

```bash
npm install
# 或
yarn