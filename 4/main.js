var $Model = Backbone.Model;
var $View = Backbone.View;

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
		console.log('init');
		this.render();
	},
	render : function(){
		// not pretty
		// this.$el.html('name: ' + this.model.get('name') + ' , age: ' + this.model.get('age'));

		this.$el.html(this.template(this.model.toJSON()));
	},

	//not pretty
	//template : _.template("<%= name %> - <%= age %> - <%= job %>")
	
	template : _.template("<%= name %> - <%= age %> - <%= job %>")
});

var p = new Person();

var pv = new PersonView({
	model: p
});

//pv.el
//pv.$el	// NOTICE lqy/2013-3-3 jq object

$('document.body').append(pv.el);
