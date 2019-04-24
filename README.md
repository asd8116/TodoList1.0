# Todo LIst

運用 Express & MongoDB 打造的網頁，將你重要的事情加入備忘錄。

![畫面截圖](https://i.imgur.com/gI8sNID.jpg)

## Built With

- [MongoDB](https://www.mongodb.com/download-center/community) - Database

* [Node.js](https://nodejs.org/en/) - JavaScript runtime built

- [Express](https://expressjs.com/zh-tw/starter/installing.html) - Node.js web framework

## Installing

###### 如何下載並啟動專案

打開終端機(Terminal)，啟動本地 MongoDB 資料庫

```
mongod --dbpath /Users/[user]/mongodb-data --bind_ip 127.0.0.1
```

再開啟另一個終端機(Terminal)，`Clone` 這個專案，完成後會顯示 Done 訊息

```
git clone <URL>
```

從終端機導入目標檔案，並下載工具包

```
npm install
```

依序匯入種子檔案，並用 `ctrl + c` 結束每次匯入

```
node ./models/seeds/usersSeeder.js
node ./models/seeds/todoSeeder.js
```

開啟本地伺服器。

```
node app.js
```

成功連結後，瀏覽器輸入 http://localhost:3000
網頁即可運行並執行動作。

## Register & Login

###### 有帳號後方可使用網頁功能

- 可進行一般帳密註冊，也可用 Facebook 快速註冊
- 帳號或密碼錯誤時會出現警告
- Login or Logout 皆會有提示

## Features

###### 功能特點

- 可瀏覽全部備忘事項
- 點擊 `Create` 可添加重要事項
- 點擊 `detail` 可單獨瀏覽事項
- 點擊 `edit` 可修改事項的資料
- 點擊 `delete` 可移除事項的內容

## Contributor

[馬振壹 Wanaka](https://github.com/asd8116)
