/* GLOBALS */
var req; // this is for the XmlHttpRequest

var xmlsource = "../file-format/is-it-nc.xml";
var debugging = 1;

var template_ran = 0;

var authors = new Array;
var author_index = 0;
var grantors = new Array;

var jump_points = new Array();



/* This function is poorly-named.  I'm sorry.
 *
 * It takes a screen number as input, and returns another HTML element
 * as output.  Unless it returns null because it found nothing.
 */
function determine_jump_or_not(screen_num) {
    
    // Grab the current screen, then look at its inputs, and see if any are selected
    // FIXME: I wonder if this works with non-radio buttons
    var this_screen = document.getElementById("screen_" + screen_num);

    var question_title = this_screen.getElementsByTagName('p')[0].firstChild.nodeValue;

    var this_answer_map = jump_points[question_title.strip()]; // I hope!  Either strip or don't!

    // For each *checked* input, for each mention in jump_points, see if it matches
    var inputs = this_screen.getElementsByTagName('input');
    
    for (var i = 0 ; i < inputs.length; i++) {
	var input = inputs[i];
	var clean_name = input.value.strip();
	if (input.checked) {
		for (answer in this_answer_map) {
		    if (clean_name == answer.strip()) {
			return this_answer_map[answer];
		    }
		}
	}
    }
}

/* Asheesh likes assertions */
function assert(fact) {
     if (!fact) {
          alert("Assert failure!");
     }
}

/** Given a string s, try to find a div that matches in this order:
 * (a) look for an exactly-matching ID
 * (b) look for a <screen> with a case-sensitive whitespace-stripping-agnostic string-prefix-matching <title>
 * (c) look for a <question> whose <title> matches the same way
 * In the case of ambiguity, pick the earlier choice
 * returns a div that can be enable()d or disable()d
 */
function findJumpPoint(s) {
    debug("Trying to find jump point for " + s);
    s = s.trim(); // Just in case...?

    // First, ID
    var hope;
    hope = document.getElementById(s);
    if (hope != null) {
	return hope;
    }

    // Second try: screen
    var h2s = document.getElementsByTagName('h2');
    for (var i = 0 ; i < h2s.length ; i++) {
	var h2 = h2s[i];
	var h2_text = h2.firstChild.nodeValue;
	h2_text = h2_text.strip();

	if (h2_text.begins_with(s)) {
	    var screen_number = getScreenID(h2);
	    if (screen_number != null) {
		return document.getElementById(screen_number);
	    }
	}
	
    }

    // Third try: question
    var paragraphs = document.getElementsByTagName('p');
    for (var i = 0 ; i < paragraphs.length ; i++) {
	var paragraph = paragraphs[i];
	var paragraph_text = paragraph.firstChild.nodeValue;

	paragraph_text = paragraph_text.strip();
	if (paragraph_text.begins_with(s)) {
	    var screen_number = getScreenID(paragraph);
	    if (screen_number != null) {
		return document.getElementById(screen_number);
	    }
	    // FIXME: Could be fused with above code perhaps?
	    // Yeah, by just making a master list that is h2s + paragraphs
	    // The internal code is element-agnostic.
	}
    }

    // Else, be very confused.
    assert("You should not get to this code.");
}

function debug(statement) {
    if (debugging) {
	alert("DEBUG: " + statement);
    }
}

function extract_screen_id(s) {
    if (s.substr(0, 7) == "screen_") {
	return (s.substr(7) * 1); // times one to typecast
    }
    return null;
}


function getScreenID (node) {
    var indicator = "";
    while (node && node.parentNode) {
	indicator = extract_screen_id(node.parentNode.id);
	if (indicator != null) {
	    return node.parentNode.id;
	}
	node = node.parentNode;
    }
    return null;
}

function findOptionTemplate(template) {
    assert(template.id.substr(0,7) == "screen_");
    question = template.getElementsByTagName('div')[0];
    assert(question.className == 'question');
    options_outer_div = question.getElementsByTagName('div')[0];
    assert(options_outer_div.className == 'question-options');
    
    return options_outer_div;
}    

function turnXMLIntoScreens (xmlDoc) {
    var ret = new Array();
    var template = document.getElementById("screen_template");
    var xml_screens = xmlDoc.getElementsByTagName("screen");

    for (var i = 0 ; i < xml_screens.length ; i++) {
	var data = xml_screens[i];
	var copy = template.cloneNode(true); // deep clone = true

	// I'm going to use lots of temporary variables for clarity's sake.

	var screen_title = data.getElementsByTagName('title')[0].firstChild.nodeValue;
	// HACK: Only guaranteed correct if each <screen> has exactly one <question>
	// UNHACK: Replace this with a loop of sorts.
	var question = data.getElementsByTagName('question')[0];
	var question_title = question.getElementsByTagName('title')[0].firstChild.nodeValue;

	// Now populate the template
	copy.id = "screen_" + i;
	copy.className = "unselected";
	copy.getElementsByTagName('h2')[0].firstChild.nodeValue = screen_title;
	question_div = copy.getElementsByTagName('div')[0];
	question_div.getElementsByTagName('p')[0].firstChild.nodeValue = question_title;

	// Handle options
	// FIXME: Hard-coded options stuff ignores options template.  Oh, well.

	var options = question.getElementsByTagName('option');

	var options_div = document.createElement("div");
	options_div.className = "question-options";

	for (var j = 0 ; j < options.length ; j++) {
	    var option_text = options[j].firstChild.nodeValue;

	    var this_option = document.createElement("div");
	    this_option.className = "option";
	    
	    var form_div = document.createElement("div");
	    form_div.className = "option-input";

	    var input = document.createElement("input");
	    input.type = "radio"; // FIXME: slurp from the option in question
	    input.onclick = "hideDiv('error');";
	    input.name = question_title;
	    input.value = option_text;

	    form_div.appendChild(input);
	    this_option.appendChild(form_div);

	    var text_div = document.createElement('div');
	    text_div.className = 'option-text';
	    text_div.appendChild(document.createTextNode(option_text));

	    this_option.appendChild(text_div);
	    options_div.appendChild(this_option);
	}

	// Now, let's find the original options_div in copy and replace it with this sucka
	replace_me = findOptionTemplate(copy);
	question_div.replaceChild(options_div, replace_me);

	// Now append it to the list of things for returning
	ret.push(copy);
    }
    return ret;
}

/* source: http://www.xml.com/pub/a/2005/02/09/xml-http-request.html */
function loadXMLDoc(uri) 
{
    // branch for native XMLHttpRequest object
    if (window.XMLHttpRequest) {
        req = new XMLHttpRequest();
        req.onreadystatechange = processReqChange;
        req.open("GET", uri, true);
        req.send(null);
    }
    // branch for IE/Windows ActiveX version
    else if (window.ActiveXObject) {
        req = new ActiveXObject("Microsoft.XMLHTTP");
        if (req) {
            req.onreadystatechange = processReqChange;
            req.open("GET", uri, true);
            req.send();
        }
    }
}

function processReqChange() 
{
    // only if req shows "complete"
    if (req.readyState == 4) {
        // only if "OK"
        if (req.status == 200) {
	    // Finally!
	    var screens = document.getElementById('screens');
	    var xmlDoc = req.responseXML.documentElement;
	    var add_this = turnXMLIntoScreens(xmlDoc);
	    
	    for (var i = 0 ; i < add_this.length; i++) {
		screens.appendChild(add_this[i]);
	    }
	    // And...
	    populateJumpPoints(req.responseXML.documentElement);
	}
	else {
            alert("There was a problem retrieving the XML data:\n" + req.statusText);
        }
    }
}

/**
 * This is what gets called every update to the slick DHTML thing.
 */
function tot(node) {

    // When do we bother initializing the XML?
    // On the first call to tot().
   
    // async means this should be enough
    if (template_ran == 0) {
	selectNode(document.getElementById('screen_-1') );
	loadXMLDoc(xmlsource);
	template_ran = 1;
    }
    
    var screen = getScreenID(node);
    
    // By default, the transition is serial, one to the next
    if (typeof(screen) == 'string') {
	var screen_num = extract_screen_id(screen);
	
	// Set a backtrail...
	back_list().push(screen);

	// Desetination:
	var next;

	// If the option specified an "onselect", then we should honor that
	var hope = determine_jump_or_not(screen_num);
	debug("first hope is " + hope);
	if (hope != null) {
	    next = findJumpPoint(hope);
	}
	else {
	    next = document.getElementById('screen_' + (screen_num + 1));
	}
	// Now, is there a next screen?  If not, look for the "submit" div.
	if (next == null) { next = document.getElementById('submit'); }
	// ... and then jump ahead:
	selectNode(next);
	deselectNode(document.getElementById(screen));
    }
}

function getScreenID (node) {
    var indicator = "";
    while (node && node.parentNode) {
	indicator = extract_screen_id(node.parentNode.id);
	if (indicator != null) {
	    return node.parentNode.id;
	}
	node = node.parentNode;
    }
    return null;
}

function populateJumpPoints(xmlDoc) {
    // jump_points is an Array() that maps strings (question titles) onto
    // an Array() of ["Yes" => "...", "No" => "..."

    // To generate it, we loop through the questions then.
    var questions =  xmlDoc.getElementsByTagName('question');

    for (var i = 0 ; i < questions.length ; i++) {
	var question = questions[i];
	var question_text = question.getElementsByTagName('title')[0].firstChild.nodeValue;

	var answer_map = Array();
	var options = question.getElementsByTagName("option");
	for (var j = 0 ; j < options.length; j++) {
	    var option = options[j];
	    var option_text = options[j].firstChild.nodeValue;

	    if (option.attributes.getNamedItem('onselect')) {
		var attrib_value = option.attributes.getNamedItem('onselect').value.strip();
		answer_map[option_text] = attrib_value;
	    }
	}
	
	// FIXME: only add answer_map if it's not empty
	jump_points[question_text.strip()] = answer_map;
    } // end for each question
}
