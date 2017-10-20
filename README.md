# shopping-mall-server
shopping-mall的服务端,通过express建立
# Installation
```
$ npm install -g express-generator
```
# Quick Start
初始化文件
```
express shopping-mall-server
```
install dependencies:
```
$ cd shopping-mall-server && npm install
```
Start your Express.js app at http://localhost:3000/
```
npm start
```
ejs Installation
```
$ npm install ejs
```
# 使用的网址
* [http://localhost:3000/](http://localhost:3000/)
* [http://localhost:3000/users/](http://localhost:3000/users/)
* [http://localhost:3000/users/test](http://localhost:3000/users/test)

# 安装mongoose
```
npm install mongoose --save
npm install cookie-parser
```
# 分页测试用例
```$xslt
http://localhost:3000/goods?page=1&pageSize=8&sort=1
```
# mongoHub查询方法
```$xslt
#query
{"salePrice":{$gte:500,$lte:1000}}
```