var $Model = Backbone.Model;
var $View = Backbone.View;
var $Collection = Backbone.Collection;

var Person = $Model.extend({

	defaults: {
		name: 'tea',
		age: 23,
		job: 'worker'
	}
});

var PeopleView = $View.extend({
	tagName : 'ul',
	render: function() {
		this.collection.each(function(person){
			var pv = new PersonView({model : person})
			this.$el.append(pv.render().el);
		},this);// NOTICE 传递上下文的this到闭包中
		return this;
	}

});

var PersonView = $View.extend({
	tagName : 'li',
	//className : 'person',
	initialize : function(){
		// if render() return this then commet
		//this.render();
	},

	templateId : '#personTemplate',

	render: function() {
		this.$el.html(this.renderTpl());
		return this;
	},

	renderTpl : function (){
		//this.model 不行
		return _.template($(this.templateId).html(), this.model.toJSON());
	}

});

var PersonList = $Collection.extend({
	//类名
	model : Person
});

var p = new Person(),
	p2 = new Person({name : 'macrotea'});


var plist2 = new PersonList(
	[	
		{
			age : 22,
			name : "name1"
		},
		{
			age : 23,
			name : "name2"
		},
		{
			age : 24,
			name : "name3"
		}
	]
);


var peopleView = new PeopleView({
	collection: plist2
});

//变成了Model对象
//var model = plist2.at(0);

//plist2.toJSON();

$(document.body).html(peopleView.render().el);

