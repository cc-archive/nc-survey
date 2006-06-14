/* GLOBALS */
var xmlsource = "../file-format/is-it-nc.xml";
var debugging = 0;

var template_ran = 0;

var authors = new Array;
var author_index = 0;
var grantors = new Array;

/* Asheesh likes assertions */
function assert(fact) {
     if (!fact) {
          alert("Assert failure!");
     }
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
    debug("Entering turn...");
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
	// FIXME: Hard-coded options stuff ignores options template

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

var req;

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
		if (i == 0) {
		    debug("Doing appendChild for the first time.");
		}
		screens.appendChild(add_this[i]);
	    }
        } else {
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
	
	var next = document.getElementById('screen_' + (screen_num + 1));
	// Now, is there a next screen?  If not, look for the "submit" div.
	if (next == null) { next = document.getElementById('submit'); }
	// ... and then jump ahead:
	selectNode(next);
	deselectNode(document.getElementById(screen));
    }
}

function author_alive_next(node) {

  for(var i=author_index+1; i<authors.length; i++) {
    if(authors[i].grantor) {
      author_index = i;
      document.getElementById('author_alive-name').innerHTML = authors[author_index].name;
      document.getElementById('author_alive-error').style.display = 'none';
      var inputs = document.getElementById('author_alive').getElementsByTagName('input');
      inputs[0].checked = false;
      inputs[1].checked = false;
      return true;
    }
  }
  /* SUBMIT HERE OR NO? */
  return false;
}

function author_alive_prev(node) {

  for(var i=author_index-1; i >= 0; i--) {
    if(authors[i].grantor) {
      author_index = i;
      document.getElementById('author_alive-name').innerHTML = authors[author_index].name;
      document.getElementById('author_alive-error').style.display = 'none';
      var inputs = document.getElementById('author_alive').getElementsByTagName('input');
      inputs[0].checked = false;
      inputs[1].checked = false;
      return true;
    }
  }
  back(node);
}

function strip_ids (node) {

  // if (node.hasAttribute('id')) { node.removeAttribute('id'); }
  node.id = '';

  for(var i=0;i<node.childNodes.length;i++) {
    strip_ids(node.childNodes.item(i));
  }

  return node;
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