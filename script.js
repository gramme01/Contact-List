/*global $, alert*/
/*eslint-env browser*/
/*jshint esversion: 6*/

var app = {
	contact: [
		{
			name: "Emmanuel Ayoolamilekan",
			number: "09056345232"
		},
		{
			name: "Bolanle",
			number: "07089660117"
		}
	],

	init: function() {
		this.cacheDom();
		this.bindEvents();
		this.render();
	},

	cacheDom: function() {
		this.$el = $("#contactModule");
		this.$input = this.$el.find("input");
		this.$nameForm = this.$el.find("#nameForm");
		this.$numberForm = this.$el.find("#numberForm");
		this.$button = this.$el.find("button");
		this.$container = this.$el.find("#container");
		this.$template = this.$el.find("#contactTemplate").html();
	},

	bindEvents: function() {
		this.$input.on("keypress", this.preSave.bind(this));
		this.$button.on("click", this.preSave.bind(this));
		this.$container.on(
			"click",
			"span.delete",
			this.deletePerson.bind(this)
		);
	},

	render: function() {
		var data = { card: this.contact };
		this.$container.html(Mustache.render(this.$template, data));
	},

	preSave: function(event) {
		if (this.$nameForm.val() != "" && this.$numberForm.val() != "") {
			if (event.which == 13 || event.type == "click") this.addPerson();
		}
	},

	addPerson: function() {
		let nameInp = this.$nameForm.val(),
			numberInp = parseInt(this.$numberForm.val());
		console.log(typeof numberInp);

		if (isNaN(numberInp)) {
			alert("Enter a valid phone number");
			this.$input.val("");
		} else {
			let entry = { name: nameInp, number: numberInp };
			this.contact.push(entry);
			this.render();
		}
	},

	deletePerson: function(event) {
		var $remove = $(event.target).closest("div.wrapper"),
			i = this.$container.find(".wrapper").index($remove);
		this.contact.splice(i, 1);
		this.render();
	}
};

app.init();

// var contact = [{
// 	"name": "Emmanuel Ayoolamilekan",
// 	"number": "07032568182"
// }, {
// 	"name": "Bolanle",
// 	"number": "08162236680"
// }];

// var data = {
// 	card: contact
// };
// var templateContent = $("#contactTemplate").html();
// var result = Mustache.render(templateContent, data);
// $("#container").html(result);
