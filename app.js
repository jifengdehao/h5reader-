var koa = require('koa'); // koa 
var controller = require('koa-route'); // koa 路由
var querystring = require('querystring');
var app = koa();

var views = require('co-views'); //co-view
var render = views('./view', {
  map: { html: 'ejs' }  //匹配模式 html===>ejs
});
var koa_static = require('koa-static-server'); //静态资源文件访问

var service = require('./service/webAppService.js'); //服务文件数据访问

app.use(koa_static({
	rootDir: './static/',
	rootPath: '/static/',
	maxage: 0
}));

//测试路由
app.use(controller.get("/route_test",function *(){
	this.set('Cache-Control', 'no-cache'); //设置它不缓存
	this.body = 'Hello koa';
}));

//测试模板
app.use(controller.get('/ejs_test', function*(){
	this.set('Cache-Control', 'no-cache');
	this.body = yield render('test',{title:'title_test'});
}));

//测试api
app.use(controller.get('/api_test', function*(){
	this.set('Cache-Control', 'no-cache');
	this.body = service.get_test_data();
}));



//首页
app.use(controller.get('/', function*(){
	this.set('Cache-Control', 'no-cache');
	this.body = yield render('index',{title:'h5reader'});
}));
//个人中心
app.use(controller.get('/usercenter', function*(){
	this.set('Cache-Control', 'no-cache');
	this.body = yield render('usercenter',{title:'个人中心'});
}));
//男生频道
app.use(controller.get('/male', function*(){
	this.set('Cache-Control', 'no-cache');
	this.body = yield render('male',{title:'男生频道'});
}));
//女生频道
app.use(controller.get('/female', function*(){
	this.set('Cache-Control', 'no-cache');
	this.body = yield render('female',{title:'女生频道'});
}));
//搜索
app.use(controller.get('/search', function*(){
	this.set('Cache-Control', 'no-cache');
	this.body = yield render('search',{title:'搜索'});
}));

//分类
app.use(controller.get('/category', function*(){
	this.set('Cache-Control', 'no-cache');
	this.body = yield render('category',{title:'分类'});
}));
//排行
app.use(controller.get('/rank', function*(){
	this.set('Cache-Control', 'no-cache');
	this.body = yield render('rank',{title:'排行'});
}));
//书籍详情
app.use(controller.get('/book', function*(){
	this.set('Cache-Control', 'no-cache');
	this.body = yield render('book',{title:'书籍详情'});
}));




//index api
app.use(controller.get('/api_index', function*(){
	this.set('Cache-Control', 'no-cache');
	this.body = service.get_index_data();
}));

//male api
app.use(controller.get('/api_male', function*(){
	this.set('Cache-Control', 'no-cache');
	this.body = service.get_male_data();
}));

//female api
app.use(controller.get('/api_female', function*(){
	this.set('Cache-Control', 'no-cache');
	this.body = service.get_female_data();
}));
//categroy api
app.use(controller.get('/api_category', function*(){
	this.set('Cache-Control', 'no-cache');
	this.body = service.get_category_data();
}));
//rank api
app.use(controller.get('/api_rank', function*(){
	this.set('Cache-Control', 'no-cache');
	this.body = service.get_rank_data();
}));

//book api
app.use(controller.get('/api_book', function*(){
	this.set('Cache-Control', 'no-cache');
	var params = querystring.parse(this.req._parsedUrl.query);
	var id = params.id;
	if(!id){
	   id = "";
	}
	this.body = service.get_book_data(id);
}));





//search api
app.use(controller.get('/api_search', function*(){
	this.set('Cache-Control', 'no-cache');
	var _this = this;
	var start=0;
	var count=10;
	var params = querystring.parse(this.req._parsedUrl.query);//获取查询字符串
	if(params.start){
	   start = params.start;
	}
	if(params.count){
		count=params.count;
	}
	var keyword = params.keyword;
	this.body = yield service.get_search_data(start,count,keyword);
}));



//中间件
app.use(function *(){
  this.body = 'Hello World';
});




app.listen(3000);