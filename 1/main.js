var Person = function(config){
	this.age = config.age;
	this.name = config.name;
	this.job = config.job;
};

//在原型链上添加方法
Person.prototype.work= function(){
	return this.name +' is working!';
};