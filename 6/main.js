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

var PersonView = $View.extend({
	tagName : 'div',
	//className : 'person',
	initialize : function(){
		this.render();
	},

	templateId : '#personTemplate',

	render: function() {
		this.$el.html(this.renderTpl());
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

var pv = new PersonView({
	model: p
});

var pv2 = new PersonView({
	model: p2
});

var plist = new PersonList();
plist.add(p);
plist.add(p2);

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

//变成了Model对象
//var model = plist2.at(0);

//plist2.toJSON();

