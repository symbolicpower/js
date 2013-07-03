var equalsPressed = false;
var onStatus = true;
var displayLength = 0;
var binaryPressed = false;

$(document).ready(function() {
    $('.button').mouseenter(function() {
        $(this).fadeTo('fast',0.5);
    });
    $('.button').mouseleave(function() {
        $(this).fadeTo('fast', 1);
    });
	$('.number').click(function() {
		if (!onStatus || displayLength > 10) {
			return;
		}
		if ($('#display').text() === '0' || binaryPressed) {
			var display = '';
		}
		else {
			var display = $('#display').text();
		}
		var text = $(this).text();
		text = display.trim() + text.trim();
		$('#display').text(text);
		displayLength++;
	});
	$('#AC').click(function() {
		if (!onStatus) {
			return;
		}
		$('#display').text('0');
		$('#topLine').text('\xa0');
		displayLength = 0;
	});
	$('#OFF').click(function() {
		onStatus = false;
		$('#display').text('');
		$('#topLine').text('\xa0');
		displayLength = 0;
	});
	$('#ON').click(function() {
		onStatus = true;
		$('#display').text('0');
		$('#topLine').text('\xa0');
		displayLength = 0;
	});
	$('.binary').click(function() {
		if (!onStatus || displayLength > 10) {
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
	});
	$('#equals').click(function() {
		if (!onStatus) {
			return;
		}
		var display = $('#display').text();
		$('#topLine').append(display);
		var result = parseCalc();
		$('#display').text(result);
		equalsPressed = true;
	});
	$('#sqrt').click(function() {
		if (!onStatus) {
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
