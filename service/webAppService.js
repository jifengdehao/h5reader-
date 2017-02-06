var fs=require("fs");
var http = require('http');
var qs = require('querystring');

//取静态资源文件
exports.get_test_data=function(){
	var content = fs.readFileSync("./mock/test.json","utf-8");
	return content;
}
//首页数据
exports.get_index_data=function(){
	var content = fs.readFileSync("./mock/home.json","utf-8");
	return content;
}
//获取搜索数据
exports.get_search_data = function(start, count, keyword) {	
	return function(cb) {		
		var data = {
			s: keyword,
			start: start,
			count: count
		}
		var content = qs.stringify(data);//序列化查询字符串
		console.log(content);
		var http_request = {
			hostname: 'dushu.xiaomi.com',
			port: 80,
			path: '/store/v0/lib/query/onebox?' + content,
			method: 'GET'
		};

		req_obj = http.request(http_request, function(_res) {
			var callback_content = '';
			var _this = this;
			var content='';
			_res.setEncoding('utf8');
			
			_res.on('data', function(chunk) {
				content += chunk;
			});

			_res.on('end', function(e) {
				cb(null,content);
			});

		});

		req_obj.on('error', function(e) {

		});
		

		req_obj.end();
	};
}
//获取男生频道的数据
exports.get_male_data=function(){
	var content = fs.readFileSync("./mock/male.json","utf-8");
	return content;
}
//获取女生频道的数据
exports.get_female_data=function(){
	var content = fs.readFileSync("./mock/female.json","utf-8");
	return content;
}
//获取分类的数据
exports.get_category_data=function(){
	var content = fs.readFileSync("./mock/category.json","utf-8");
	return content;
}
//获取排行的数据
exports.get_rank_data=function(){
	var content = fs.readFileSync("./mock/rank.json","utf-8");
	return content;
}

//获取书籍数据
exports.get_book_data=function(id){
	if (!id) {
		id = "18218";
	}
	if(fs.existsSync('./mock/book/' + id + '.json')){
	 	return fs.readFileSync('./mock/book/' + id + '.json', 'utf-8');
	}else{
		return fs.readFileSync('./mock/book/18218.json', 'utf-8');
	}
}


