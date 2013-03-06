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
		}
	});

	App.Views.PeopleView = $View.extend({
		tagName: 'ul',
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
			// if render() return this then commet
			//this.render();
		},

		templateId: '#personTemplate',

		render: function() {
			this.$el.html(this.renderTpl());
			return this;
		},

		renderTpl: function() {
			//this.model 不行
			return _.template($(this.templateId).html(), this.model.toJSON());
		}

	});

	App.Collections.PersonList = $Collection.extend({
		//类名
		model: App.Models.Person
	});

	//test

	var peopleView = new App.Views.PeopleView({
		collection: new App.Collections.PersonList(
			[
				new App.Models.Person({
					name: 'macrotea'
				}), 
				new App.Models.Person({
					name: 'chaye'
				})
			]
		)
	});

	$(document.body).html(peopleView.render().el);

})();