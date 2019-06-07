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
	$input.on("keypress", _preSave);
	$button.on("click", _preSave);
	$container.on("click", "span.delete", deletePerson);

	//_render
	function _render() {
		var data = { card: contact };
		$container.html(Mustache.render($template, data));
	}

	//init
	_render();

	//functionalities
	function _preSave(event) {
		if ($nameForm.val() != "" && $numberForm.val() != "") {
			if (event.which == 13 || event.type == "click") addPerson();
		}
	}

	function addPerson(value) {
		if (typeof value === "object") {
			(nameInp = value.name), (numberInp = value.number);
		} else {
			(nameInp = $nameForm.val()),
				(numberInp = parseInt($numberForm.val()));
		}

		if (isNaN(numberInp)) {
			alert("Enter a valid phone number");
			$input.val("");
		} else {
			let entry = { name: nameInp, number: numberInp };
			contact.push(entry);
			_render();
			$input.val("");
		}
	}

	function deletePerson(event) {
		let i;
		if (typeof event === "number") {
			i = event - 1;
		} else {
			var $remove = $(event.target).closest("div.wrapper");
			i = $container.find(".wrapper").index($remove);
		}
		contact.splice(i, 1);
		_render();
	}

	console.log(`TO ADD CONTACT
	Create an object with two properties "name" and "number", then call app.addPerson(<name of object>)


	TO DELETE CONTACT
	Run app.deletePerson(<serial number of the contact>) eg app.deletePerson(2)`);

	return {
		addPerson: addPerson,
		deletePerson: deletePerson
	};
})();
