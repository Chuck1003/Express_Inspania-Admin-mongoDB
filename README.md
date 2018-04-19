基于Node.js，Express起服务；

数据库使用MongoDB，使用mongoose中间件；

登录使用express-session中间件，数据存在MongoDB中；

Inspania-Admin 做Web框架的一套后台系统；

样式使用了bootstrap、前端脚本使用Vue、组件使用了toastr/sweetalert等；

注意点（一些收获和感悟）：

1、中间件，所有的中间件都需要在引用router前use，碰到一个问题就是确认了session中间件引用和启动后在req下面还是找不到这个对象，后面思考后在app.js里
把路由的引用放在所有的中间件后面成功解决这个问题；

2、MongoDB设置为系统服务，搞了将近两个小时，可以启动MongoDB服务，但就是不能作为系统服务自启，一直报1053的错误；Google找了很多解决方案都行不通，最
后在后端同事的帮助下找到了解决方法：把mongod.cfg文件改成：

    ##数据文件
    dbpath=D:\MongoDB\data
    ##日志文件
    logpath=D:\MongoDB\logs\mongodb.log
    ##错误日志采用追加模式，配置这个选项后mongodb的日志会追加到现有的日志文件，而不是从新创建一个新文件
    logappend=true
    
  就成功解决了这个问题；具体原因不详！有大神知道的指教一下！！！
