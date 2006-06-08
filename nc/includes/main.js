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

function tot(node) {

  var screen = getScreenID(node);

  // Asheesh is just doing a serial survey
  // Empty response sets are allowed
  // We'll simply create nodes with ID screen1, screen2, etc.

  assert(screen.substr(0,7) == "screen_");
  var screen_num = screen.substr(7) * 1; // times one to typecast

  /* employee should be Yes/No/false */
  employee = checkRadio(node.form.employee);

  // Set a backtrail...
  back_list().push(screen);
  // ... and then jump ahead:
  selectNode(document.getElementById('screen_' + (screen_num + 1)));

  // FIXME!  There's no end case now.

  // FIXME!  We should store the data somewhere!
 
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
/*  if (!node) { return false; }
  testr = node;
  do {
    testr = testr.parentNode;
  } while (testr.parentNode.id != 'screens'); */
  if (node && node.getAttribute) { return node.getAttribute('totID'); }
  else { /* alert('couldnt find screen id!'); */ return false; }
}