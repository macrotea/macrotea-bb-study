var $Model = Backbone.Model;
var Person = $Model.extend({

	//注册当校验有误时的处理
	initialize : function(){
	    this.on("invalid",function(model,error){
	        alert(model.get("name") + "出错了:  " + error);
	    });
	},
	defaults: {
		name: 'tea',
		age: 23,
		job: 'worker'
	},
	work: function() {
		return this.get('name') + ' is working!';
	},

	//真正的校验逻辑
	validate: function(attrs, options) {
		if (!attrs.name) {
			return "名字不能为空";
		}
		if (attrs.name.length>5) {
			return "名字长度太长";
		}
		if (attrs.age<0) {
			return "年龄不能为负数";
		}
		return true;
	}
});

var one = new Person({
  name : "Peter"
});

one.set({
  name: 'macrotea1',
  age:   -1
},{validate:true});// NOTICE , validate is called before save, but can also be called before set if {validate:true} is passed

one.save({
  name: 'mary',
  age:   -2
});
one.save({
  name: '',
  age:   20
});

//ok
one.save({
  name: 'may',
  age:   20
});

