/*global $, alert*/
/*eslint-env browser*/
/*jshint esversion: 6*/

var app = (function() {
	let contact = [
		{
			name: "Emmanuel Ayoolamilekan",
			number: "09056345232"
		},
		{
			name: "Bolanle",
			number: "07089660117"
		}
	];

	//cache dom
	let $el = $("#contactModule"),
		$input = $el.find("input"),
		$nameForm = $el.find("#nameForm"),
		$numberForm = $el.find("#numberForm"),
		$button = $el.find("button"),
		$container = $el.find("#container"),
		$template = $el.find("#contactTemplate").html();

	//bind events
	$input.on("keypress", preSave);
	$button.on("click", preSave);
	$container.on("click", "span.delete", deletePerson);

	//render
	function render() {
		var data = { card: contact };
		$container.html(Mustache.render($template, data));
	}

	//init
	render();

	//functionalities
	function preSave(event) {
		if ($nameForm.val() != "" && $numberForm.val() != "") {
			if (event.which == 13 || event.type == "click") addPerson();
		}
	}

	function addPerson() {
		let nameInp = $nameForm.val(),
			numberInp = parseInt($numberForm.val());

		if (isNaN(numberInp)) {
			alert("Enter a valid phone number");
			$input.val("");
		} else {
			let entry = { name: nameInp, number: numberInp };
			contact.push(entry);
			render();
			$input.val("");
		}
	}

	function deletePerson(event) {
		var $remove = $(event.target).closest("div.wrapper"),
			i = $container.find(".wrapper").index($remove);
		contact.splice(i, 1);
		render();
	}

	// return {
	// 	addPerson: addPerson,
	// 	deletePerson: deletePerson
	// };
})();
