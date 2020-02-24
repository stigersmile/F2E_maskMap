# 口罩地圖

## DEMO

https://albertnotes.github.io/F2E_maskMap/

## 功能

- 城市、地區選單選取
- 搜尋地址
- 即時定位
- 智能判別 icon - 藍色有庫存 - 紅色單一商品 0 庫存 - 灰色全數商品 0 庫存
- 支援不同裝置瀏覽體驗

## 技術

- openstreetmap 圖資
- leaflet 框架
- leaflet markercluster 套件
- leaflet Locate 套件
- pug
- scss
- gulp

## 安裝與運行

```
# node 版本 v12.15.0
# gulp 版本 4.0.2

# 安裝 gulp
npm install gulp-cli -g

# 執行
npm install
gulp

# 其他指令
gulp build # 生成靜態網頁（未壓縮）預設 --env development 可省略
gulp build --env production # 生成靜態網頁（壓縮 CSS）
gulp deploy # 將靜態網頁佈署到 gh-pages
```

## 聲明

- 設計稿來自 [F2E 投稿設計師 - Wendy](https://challenge.thef2e.com/user/2259)
