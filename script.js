var equalsPressed = false;
var onStatus = true;
var binaryPressed = false;

$(document).ready(function() {
	$('#topLine').text('\xa0');
	var spaces = Array(26).join("\xa0");
    $('#name').text(spaces + 'TI-100');
    $('.button').mouseenter(function() {
        $(this).fadeTo('fast',0.5);
    });
    $('.button').mouseleave(function() {
        $(this).fadeTo('fast', 1);
    });
	$('.number').click(function() {
		if (!onStatus || $('#display').text().length > 10) {
			return;
		}
		var displayText = '';
		if (!($('#display').text() === '0' || binaryPressed)) {
			displayText = $('#display').text();
		}
		var text = $(this).text();
		text = displayText.trim() + text.trim();
		$('#display').text(text);
		binaryPressed = false;
	});
	$('#AC').click(function() {
		if (!onStatus) {
			return;
		}
		$('#display').text('0');
		$('#topLine').text('\xa0');
	});
	$('#OFF').click(function() {
		onStatus = false;
		$('#display').text('');
		$('#topLine').text('\xa0');
	});
	$('#ON').click(function() {
		onStatus = true;
		$('#display').text('0');
		$('#topLine').text('\xa0');
	});
	$('.binary').click(function() {
		if (!onStatus || $('#display').text().length > 10) {
			return;
		}
		var display = $('#display').text();
		var op = $(this).text();
		display = display.trim() + op.trim();
		if (equalsPressed) {
			$('#topLine').text(display);
		}
		else {
			$('#topLine').append(display);
		}
		binaryPressed = true;
		equalsPressed = false;
	});
	$('#equals').click(function() {
		if (!onStatus || $('#display').text().length > 10) {
			return;
		}
		var displayText = $('#display').text();
		$('#topLine').append(displayText);
		var result = parseCalc();
		result = result.toString().substring(0,10);
		$('#display').text(result);
		equalsPressed = true;
		binaryPressed = false;
		$('#topLine').text('\xa0');
	});
	$('#sqrt').click(function() {
		if (!onStatus || $('#display').text().length > 10) {
			return;
		}
		var display = $('#display').text();
		var result = Math.sqrt(display);
		result = result.toString().substring(0,10);
		$('#display').text(result);
		display = '\u221A' + display;
		$('#topLine').text(display);
	});
});

var parseCalc = function() {
	var calc = $('#topLine').text();
	var lastChar = calc.charAt(calc.length - 1);
	if (lastChar === '+' || lastChar === '-' || lastChar === 'x') {
		return "ERROR";
	} 
	else {
		var splitOn = new RegExp('[(\xF7)x+-]');
		var computation = calc.split(splitOn);
		var result = parseFloat(computation[0]);
		var opIndex = computation[0].length;
		for (var i = 1; i < computation.length; i++) {
			op = calc[opIndex];
			opIndex += 1 + computation[i].length;
			switch (op) {
				case '+':
					result += parseFloat(computation[i]);
					break;
				case '-':
					result -= parseFloat(computation[i]);
					break;
				case 'x':
					result *= parseFloat(computation[i]);
					break;
				case '\xF7':
					result /= parseFloat(computation[i]);
					break;
			}
		}
		return result;
	}
};
