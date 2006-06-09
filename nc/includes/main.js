/* GLOBALS */
var authors = new Array;
var author_index = 0;
var grantors = new Array;

/* Asheesh likes assertions */
function assert(fact) {
     if (!fact) {
          alert("Assert failure!");
     }
}

function extract_screen_id(s) {
   if (s.substr(0, 7) == "screen_") {
       return (s.substr(7) * 1); // times one to typecast
    }
    return null;
}

function tot(node) {
  
  var screen = getScreenID(node);
  
  if (typeof(screen) == typeof("lol")) {
  // Asheesh is just doing a serial survey
  // Empty response sets are allowed; there are no errors!  So no error checking on form data.
  // We'll simply create nodes with ID screen_1, screen_2, etc.
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

function submit (node) {
	alert("Uh, no submission yet.");
}