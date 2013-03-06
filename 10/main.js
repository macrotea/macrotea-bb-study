(function() {

	window.App = {
		Models: {},
		Views: {},
		Collections: {},
		Router : {}
	}

	var $Model = Backbone.Model,
		$View = Backbone.View,
		$Collection = Backbone.Collection,
		$Router = Backbone.Router,
		$History = Backbone.history;

	var vent = _.extend({} , Backbone.Events);

	App.Views.Book = $View.extend({

		initialize : function(){
		    vent.on('book:show', this.showBook , this);
		},

		showBook: function(id) {
			console.log("showBook - "  + id);
		}
	});

	App.Router = $Router.extend({

		routes: {
			'': 'index',
			'show': 'show',
			'upload/:id' : 'upload',
			'download/:type/:id' : 'download', //#download/book/33
			'book/:id' : 'showBook',
			'*other' : 'default' //放在最后
		},

		index : function(){
			console.log("index");
		},

		show: function() {
			console.log("show");
		},

		upload: function(id) {
			console.log("upload - "  + id);
		},

		download: function(mytype,myid) {//按照顺序
			console.log("download - " + mytype + ' - ' + myid);
		},

		showBook: function(id) {
			vent.trigger('book:show', id);
		},

		default: function() {//按照顺序
			console.log("default");
		}
	});

	new App.Views.Book;
	new App.Router;
	$History.start();

})();