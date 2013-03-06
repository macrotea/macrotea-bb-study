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

var p = new Person(),
	p2 = new Person({name : 'macrotea'});

var pv = new PersonView({
	model: p
});

var pv2 = new PersonView({
	model: p2
});




