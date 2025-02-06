# 显示器线材选择助手

这是一个简单的网页应用，帮助用户根据显示器的分辨率和刷新率，选择合适的显示器连接线材规格。

## 功能特点
- 支持常见显示器分辨率选择（1080p到8K）
- 支持自定义分辨率输入（最高支持15360×8640）
- 支持预设刷新率选择（60Hz到240Hz）
- 支持自定义刷新率输入（最高支持500Hz）
- 自动计算所需带宽
- 推荐合适的连接线材规格：
  - DisplayPort（DP 1.2到DP 2.0）
  - HDMI（HDMI 1.4到HDMI 2.1）
  - USB4（20Gbps和40Gbps）
  - 雷电接口（雷电3和雷电4）

## 使用方法
1. 打开index.html文件
2. 选择或输入您显示器的分辨率：
   - 从预设选项中选择常见分辨率
   - 或选择"自定义"并输入具体的宽度和高度
3. 选择或输入您需要的刷新率：
   - 从预设选项中选择常见刷新率
   - 或选择"自定义"并输入具体的刷新率
4. 系统会自动显示所有支持的接口类型及其推荐规格

## 技术说明
- 使用纯HTML、CSS和JavaScript开发
- 无需安装任何依赖
- 支持所有现代浏览器
- 实时计算带宽需求并匹配合适的接口规格
- 支持高精度自定义参数输入

## 带宽计算方式
带宽计算公式：分辨率 × 刷新率 × 24位色深 × 1.2（考虑协议开销）

## 接口规格说明
- DisplayPort：支持到DP 2.0（最高77.37Gbps）
- HDMI：支持到HDMI 2.1（最高42.6Gbps）
- USB4：支持20Gbps和40Gbps两种规格
- 雷电接口：支持雷电3和雷电4（最高40Gbps）

## 输入限制
- 分辨率：
  - 宽度：1-15360像素
  - 高度：1-8640像素
- 刷新率：1-500Hz
