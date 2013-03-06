(function() {

	window.App = {
		Models: {},
		Views: {},
		Collections: {}
	}

	var $Model = Backbone.Model,
		$View = Backbone.View,
		$Collection = Backbone.Collection;

	App.Models.Person = $Model.extend({

		defaults: {
			name: 'tea',
			age: 23,
			job: 'worker'
		},

		//注册当校验有误时的处理
		initialize : function(){
		    this.on("invalid",function(model,error){
		        alert("出错了:  " + error);
		    });
		},

		//真正的校验逻辑
		validate: function(attrs, options) {
			if (!$.trim(attrs.name)) {
				return "名字不能为空";
			}
			if (attrs.name.length>5) {
				return "名字长度太长";
			}
			if (attrs.age<0) {
				return "年龄不能为负数";
			}
		}
	});

	App.Views.PeopleView = $View.extend({
		tagName: 'ul',

		initialize : function(){
			//注意addOne的参数
			this.collection.on('add', this.addOne, this );
		},

		render: function() {
			this.collection.each(this.addOne, this); // NOTICE 传递上下文的this到闭包中
			return this;
		},

		addOne: function(person) {
			var pv = new App.Views.PersonView({
				model: person
			})
			this.$el.append(pv.render().el);
		}

	});

	App.Views.PersonView = $View.extend({
		tagName: 'li',
		initialize: function() {
			this.model.on('change',this.render,this);
			this.model.on('destroy',this.remove,this);
		},

		events : {
			'click .edit' : 'editPerson',
			'click .delete' : 'deletePerson'
		},

		editPerson : function(){
			console.log("editPerson");
			var newName = prompt("plz new name" , this.model.get('name'));
			/*
			//not best
			if(!newName){
				return;
			}*/
			this.model.set({name:newName},{validate: true});
		},

		deletePerson : function(){
			console.log("deletePerson");
			//处理数据
			this.model.destroy();
		},

		remove : function(){
			console.log("removePerson");
			//处理显示
			this.$el.remove();
		},

		template: $('#personTemplate').html(),

		render: function() {
			this.$el.html(this.renderTpl());
			return this;
		},

		renderTpl: function() {
			return _.template(this.template, this.model.toJSON());
		}

	});

	App.Views.AddPersonView = $View.extend({
		el: '#personForm',

		initialize: function() {
			console.log(this.el.innerHTML);
		},

		events : {
			'submit' : 'submit'
		},

		submit : function(e){
			e.preventDefault();

			var newName  = $(e.currentTarget).find('input[type=text]').val();

			var newPerson = new App.Models.Person( {name : newName});

			this.collection.add(newPerson);
		}
	});

	App.Collections.PersonList = $Collection.extend({
		//类名
		model: App.Models.Person
	});

	//test

	var personList = new App.Collections.PersonList(
		[
			new App.Models.Person({
				name: 'macrotea'
			}), 
			new App.Models.Person({
				name: 'chaye'
			})
		]
	);


	var peopleView = new App.Views.PeopleView({
		collection: personList
	});

	var addPersonView = new App.Views.AddPersonView({
		collection: personList
	});

	//$(document.body).html(peopleView.render().el);
	$('#main').html(peopleView.render().el);

})();