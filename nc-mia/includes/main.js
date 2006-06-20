/* GLOBALS */
var req; // this is for the XmlHttpRequest

var debugging = 0;

var authors = new Array;
var author_index = 0;
var grantors = new Array;

var jump_points = new Array();
var final_screens = new Array();

/**
 * turn the <title> in the <question> into a big XHTML tree
 * or at least a <p> tag
 */
function xmlquestiontitle2xhtml(title) {
    var text = allText(title);
   
    // if there's < and > in this text, let's guess it's supposed to
    // be an HTML fragment

    if ( (text.search('<') > -1) &&
	 (text.search('>') > -1) ) {
	return text;
    }

    // otherwise, wrap it in a <p>
    return "<p>" + text + "</p>";
}


/* This function is poorly-named.  I'm sorry.
 *
 * It takes a screen number as input, and returns another HTML element
 * as output.  Unless it returns null because it found nothing.
 */
function determine_jump_or_not(screen_num) {
    
    // Grab the current screen, then look at its inputs, and see if any are selected
    // FIXME: I wonder if this works with non-radio buttons
    
    var this_screen = document.getElementById("screen_" + screen_num);
    
    var this_answer_map = jump_points[screen_num]; // I hope!  Either strip or don't!
    
    // For each *checked* input, for each mention in jump_points, see if it matches
    var inputs = this_screen.getElementsByTagName('input');
    
    for (var i = 0 ; i < inputs.length; i++) {
	var input = inputs[i];
	var clean_name = input.value.trim();
	if (input.checked) {
	    for (answer in this_answer_map) {
		if (clean_name == answer.trim()) {
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
	var h2_text = allText(h2).trim();
	h2_text = h2_text.trim();
	
	if (h2_text.begins_with(s)) {
	    var screen_number = getScreenID(h2);
	    if (screen_number != null) {
		return document.getElementById(screen_number);
	    }
	}
	
    }
    
    // Third try: question
    var paragraphs = getElementsByTagAndClassName(document, 'question-text', 'div');
    for (var i = 0 ; i < paragraphs.length ; i++) {
	var paragraph = paragraphs[i];
	var paragraph_text = allText(paragraph).trim();
	
	paragraph_text = paragraph_text.trim();
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
    alert("You should not get to this code.  Please consult webmaster@creativecommons.org or your local support group.");
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
    options_outer_div = question.getElementsByTagName('div')[1];
    assert(options_outer_div.className == 'question-options');
    
    return options_outer_div;
}    

function turnXMLIntoScreens (xmlDoc) {
    var ret = new Array();
    var template = document.getElementById("screen_template");
    var xml_screens = xmlDoc.getElementsByTagName("screen");
    
    for (var i = 0 ; i < xml_screens.length ; i++) {
	var data = xml_screens[i];

	// If it's a final screen, make a note.
	var is_final = 0;
	for (var attr_num = 0 ; attr_num < data.attributes.length; attr_num++) {
	    var attr = data.attributes[attr_num];
	    if (( attr.name == 'isfinal') &&(attr.value == 'yes')) {
		is_final = 1;
		final_screens.push("screen_" + i);
	    }
	}

	var copy = template.cloneNode(true); // deep clone = true
	
	// I'm going to use lots of temporary variables for clarity's sake.
	
	var screen_title = allText(data.getElementsByTagName('title')[0]).trim();
	// HACK: Only guaranteed correct if each <screen> has exactly one <question>
	// UNHACK: Replace this with a loop of sorts.
	var question = data.getElementsByTagName('question')[0];
	var question_title = allText(question.getElementsByTagName('title')[0]).trim();
	
	// Now populate the template
	copy.id = "screen_" + i;
	copy.className = "unselected";
	copy.getElementsByTagName('h2')[0].firstChild.nodeValue = screen_title;
	var question_div = copy.getElementsByTagName('div')[0];
	getElementsByTagAndClassName(question_div, 'question-text', 'div')[0].innerHTML = question_title;
	
	// Handle options
	// FIXME: Hard-coded options stuff ignores options template.  Oh, well.
	
	var options = question.getElementsByTagName('option');
	
	var options_div = document.createElement("div");
	options_div.className = "question-options";

	for (var j = 0 ; j < options.length ; j++) {
	    var option_text = allText(options[j]).trim();
	    
	    var this_option = document.createElement("div");
	    this_option.className = "option";
	    
	    var form_div = document.createElement("div");
	    form_div.className = "option-input";
	    
	    var input = createElement("input", question_title, "");
	    input.type = "radio"; // FIXME: slurp from the option in question
	    input.onclick = "hideDiv('error');";
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

	// Finally, if it was a isfinal=true screen, change the title of the first button
	if (is_final) {
	    var next_button = copy.getElementsByTagName('button')[0];
	    next_button.replaceChild(document.createTextNode("Stubmit"), next_button.firstChild);

	    /*
	    var stumbit_button = createElement("button", "", "submit");
	    stumbit_button.appendChild(document.createTextNode("Submit"));
	    stumbit_button.className = "button-continue";
	    next_button.parentNode.replaceChild(stumbit_button, next_button);
	    //stumbit_button.firstChild.nodeValue = 'Submit';
	    //stumbit_button.onclick = '';
	    //	    stumbit_button.type = 'submit';
	    */
	}
	
	
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

	    // Finally, notify the user:
	    var first = document.getElementById('screen_-1');
	    var question = getElementsByTagAndClassName(first, 'question', 'div')[0];
	    var qtext = getElementsByTagAndClassName(question, 'question-text', 'div')[0];
	    qtext.firstChild.nodeValue = 'Please click "Next" to begin the survey.';
	}
	else {
            alert("There was a problem retrieving the XML data:\n" + req.statusText);
        }
    }
}

/**
 * This gets called on page load.
 * It selectNode()s screen_-1 and it also starts the XML loading.
 */
function initApp() {
    // async means this should be enough
    selectNode(document.getElementById('screen_-1') );
    loadXMLDoc(document.getElementsByTagName('form')[0].elements['xmlpath'].value);
}


/**
 * This is what gets called every update to the slick DHTML thing.
 * QUALITY: There are repeated calls to extract_screen_id.  That could be cleaned up.
 */
function next(node) {
    var screen_id = getScreenID(node);

    // By default, the transition is serial, one to the next
    if (typeof(screen_id) == 'string') {

	// But we simply can't proceed if the user selected nothing.
	// if the screen ID is a number >= 0, then we check that at least one <input> is checked
	var can_continue = true;
	var screen_number = extract_screen_id(screen_id);
	var screen = document.getElementById(screen_id);

	if (array_contains(final_screens, screen_id))
	    {
		// Let's prepare the form for submission
		return; // Get out of here quick if this was final.
	    }

	if (screen_number > -1) {
	    can_continue = false;
	    var inputs = screen.getElementsByTagName('input');
	    for (var k = 0 ; k < inputs.length; k++) {
		if ( ! can_continue) {
		    var input = inputs[k];
		    if (input.checked) {
			can_continue = true;
		    }
		}
	    }
	    
	}
       
	if (! can_continue) {
	    var error = getElementsByTagAndClassName(screen, "question-error", 'div')[0];
	    var invisibles = getElementsByTagAndClassName(error, "invisible", 'span');
	    for (var k = 0 ; k < invisibles.length; k++) {
		invisibles[k].className = "";
	    }
	    return;
	}
    

	var screen_num = extract_screen_id(screen_id);
	
	// Set a backtrail...
	back_list().push(screen_id);
	
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
	deselectNode(screen);
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
    // jump_points is an Array() that maps numbers (screen number) onto
    // an Array() of ["Yes" => "...", "No" => "..."
    
    // To generate it, we loop through the questions then.
    var questions =  xmlDoc.getElementsByTagName('question');
    
    for (var i = 0 ; i < questions.length ; i++) {
	var question = questions[i];
	
	var answer_map = Array();
	var options = question.getElementsByTagName("option");
	for (var j = 0 ; j < options.length; j++) {
	    var option = options[j];
	    var option_text = allText(options[j]).trim();
	    
	    if (option.attributes.getNamedItem('onselect')) {
		var attrib_value = option.attributes.getNamedItem('onselect').value.trim();
		answer_map[option_text] = attrib_value;
	    }
	}
	
	// FIXME: only add answer_map if it's not empty
	jump_points[i] = answer_map;
    } // end for each question
}
