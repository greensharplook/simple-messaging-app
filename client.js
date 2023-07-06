let counter = 0;

function poll() {
	$.getJSON(`/poll/${Number(counter)}`, (res) => {
		let output = $('#output');
		counter = res.counter;
		output.text(output.text() + res.append);

		setTimeout(() => {
			poll();
		}, 3000);
	});	
}

poll();