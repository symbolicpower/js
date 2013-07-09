var equalsPressed = false;
var onStatus = true;
var binaryPressed = false;
var memory = '0';

$(document).ready(function() {
    $('#topLine').text('\xa0');
	var spaces = Array(25).join("\xa0");
    $('#name').text(spaces + 'TI-100');
    $('.button').mouseenter(function() {
        $(this).fadeTo('fast',0.5);
    });
    $('.button').mouseleave(function() {
        $(this).fadeTo('fast', 1);
    });
	$('.number').click(function() {
		numEntry($(this).text());
	});
	$('#ac').click(function() {
		allClear();
	});
	$('#off').click(function() {
		switchOff();
	});
	$('#on').click(function() {
		switchOn();
	});
	$('#del').click(function() {
		backspace();
	});
    $('#mplus').click(function() {
		addToMemory();
	});
    $('#mminus').click(function() {
        removeFromMemory();
	});
    $('#mr').click(function() {
        recallFromMemory();
	});
	$('.binary').click(function() {
		binaryOp($(this).text());
	});
	$('#equals').click(function() {
		equalsOp();
	});
	$('#sqrt').click(function(){
		squareroot();
	});
	$(document).keydown(function(key) {
		if (!onStatus || $('#display').text().length > 10) {
			return;
		}
		var displayText = '';
		if (!($('#display').text() === '0' || binaryPressed)) {
			displayText = $('#display').text();
		}
		var text = '';
		var keyUnicode = key.keyCode? key.keyCode : key.charCode;
		var digit = 0;
		if (keyUnicode >= 48 && keyUnicode <= 57) {
			digit = keyUnicode - 48;
			numEntry('' + digit);
		}
		else if (keyUnicode >= 96 && keyUnicode <= 105) {
			digit = keyUnicode - 96;
			numEntry('' + digit);
		}
		else {
			switch(keyUnicode) {
				case 8:
					backspace();
					break;
				case 13: case 187:
					equalsOp();
					break;
				case 107: case 187:
					binaryOp('+');
					break;
				case 109: case 189:
					binaryOp('-');
					break;
				case 106: case 56: case 88:
					binaryOp('*');
					break;
				case 111: case 191:
					binaryOp('/');
					break;
			}
		}
		binaryPressed = false;
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
		if (result > 99999999999) {
			result = "OVERFLOW";
		}
		return result;
	}
};

var numEntry = function(text) {
		if (!onStatus || $('#display').text().length > 10) {
			return;
		}
		var displayText = '';
		if (!($('#display').text() === '0' || binaryPressed)) {
			displayText = $('#display').text();
		}
		text = displayText.trim() + text.trim();
		$('#display').text(text);
		binaryPressed = false;
};

var squareroot = function() {
		if (!onStatus) {
			return;
		}
		var display = $('#display').text();
		var result = Math.sqrt(display);
		result = result.toString().substring(0,10);
		$('#display').text(result);
		display = '\u221A' + display;
		$('#topLine').text(display);
};

var binaryOp = function(op) {
		if (!onStatus) {
			return;
		}
		var display = $('#display').text();
		display = display.trim() + op.trim();
		if (equalsPressed) {
			$('#topLine').text(display);
		}
		else {
			$('#topLine').append(display);
		}
		binaryPressed = true;
        equalsPressed = false;
};

var equalsOp = function() {
		if (!onStatus) {
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
};

var backspace = function() {
		var displayText = $('#display').text();
		displayText = displayText.substring(0, displayText.length - 1);
		$('#display').text(displayText);
};

var allClear = function() {
		if (!onStatus) {
			return;
		}
		$('#display').text('0');
		$('#topLine').text('\xa0');
};

var switchOff = function() {
		onStatus = false;
		$('#display').text('');
		$('#topLine').text('\xa0');
};

var switchOn = function() {
		onStatus = true;
		$('#display').text('0');
		$('#topLine').text('\xa0');
};

var addToMemory = function() {
		if (!onStatus) {
			return;
		}
        memory = $('#display').text();
};

var removeFromMemory = function() {
        if (!onStatus) {
			return;
		}
        memory = '0';
};

var recallFromMemory = function() {
        if (!onStatus) {
            return;
		}
        $('#display').text(memory);
};