function hideDiv(id) {
   var div;
   if ( div = document.getElementById(id) ) { div.style.display = "none"; return true; }
   else { return false; }
}

function showDiv(id) {
   var div;
   if ( div = document.getElementById(id) ) { div.style.display = "block"; return true; }
   else { return false; }
}

function checkInputs(name) {

   value = false;
   inputs = document.getElementsByTagName('input');
   if (inputs.length < 1) { alert('input not found: ' + name); return false; }
   for (i=0; i < inputs.length; i++) {
     if (inputs.item(i).name == name) {
       value = checkInput(inputs.item(i));
       if (value) { return value; }
     }
   }
   return value;
}
function checkInput(input) {

   var value = false;
   switch (input.type) {
   
      case 'text':

         if ( input.value.length > 0 ) { value = input.value; }
         break;

      case 'radio':
      case 'checkbox':

         if ( input.checked ) { value = input.value; }
         break;

      case 'default':

         alert('Unhandled input type: ' + input.type);
         break;
   }

   return value;

}

function checkRadio ( radios ) {

   var value = false;
   for (var i = 0; i<radios.length; i++) {
      var radio;
      if ( radios.constructor == Array ) { radio = radios[i]; }
      else { radio = radios.item(i); }

      var rval = checkInput(radio);
      if (rval) { value = rval; }
   }

   return value;

}

function isInteger (s) {
   var i;
   for (i = 0; i < s.length; i++){   
      // Check that current character is number.
      var c = s.charAt(i);
      if (((c < "0") || (c > "9"))) return false;
   }
   // All characters are numbers.
   return true;
}

function daysInFeb (year) {
   return ((year % 4 == 0) ? 29 : 28 );
}

function daysInMonth (month,year) {
   if (month==4 || month==6 || month==9 || month==11) { return 30; }
   else if (month==2) { return daysInFeb(year); }
   else { return 31; }
}

function checkDate (mm,dd,yyyy) {
   var today = new Date();
   if (!isInteger(mm) || !isInteger(dd) || !isInteger(yyyy)) { return false; }
   else if (mm.length != 2 || dd.length != 2 || yyyy.length != 4) { return false; }
   else if (mm < 1 || mm > 12) { return false; }
   else if (dd < 1 || dd > daysInMonth(mm,yyyy)) { return false; }
   else if (yyyy < 1 || yyyy > today.getFullYear() || ((yyyy == today.getFullYear()) && ((mm > (today.getMonth()+1))) || ((yyyy == today.getFullYear()) && (mm == (today.getMonth()+1)) && (dd > today.getDate()))) ) { return false; }
   else { return new Date(yyyy,mm-1 ,dd); }
}

function nextElement (node, type) {
   while( node.nextSibling ) {
      node = node.nextSibling;
      if( node.nodeName.toLowerCase() == type.toLowerCase() ) {
         return node;
      }
   }
   // alert("Couldn't find a next element of type '" + type + "'");
   return false;
}

function previousElement (node, type) {
   while(node.previousSibling) {
      node = node.previousSibling;
      if( node.nodeName.toLowerCase() == type.toLowerCase() ) {
         return node;
      }
   }
   return false;
}

function check_errors (vtable) {

   var ok = true;

   // loop through our error check vector table
   for(var check in vtable) {

      // skip unless check is a function (this isn't exactly right...)
      if ( vtable[check] == null ) {
        continue;
      }

      // check functions return false if there is an error
      if ( !vtable[check]() ) {

         // If there is an error, then display error message
         document.getElementById(check + '-error').style.display = 'inline';

         // update our error variable - if any of the error checks fail, we wont submit form
         if (ok) {
            ok = false;
         }

      } else {
         // if there is no error, hide error message
         document.getElementById(check + '-error').style.display = 'none';
      }
   }
   return ok;
}

function nextDateField (element,event,chars) {
   chars = (chars) ? chars : 2;
   var ch = (event.charCode) ? event.charCode : ((event.keyCode) ? event.keyCode : ((event.which) ? event.which : 0));
   if (ch > 31 && element.value.length == chars) {
      //alert('Element: ' + element + '\nTagName: ' + element.tagName + '\nConstructor: ' + element.constructor + '\nnodeName: ' + element.nodeName)
      nextElement(element, 'input').focus();
   }
}

// Use these to go back and forth between divs in the filter/gather pages
function back_list() {
  if ( !window._back_list ) { window._back_list = new Array; }
  return window._back_list;
}

function back (node) {

   var last_id;
   if ( last_id = back_list().pop() ) {
     /*
     node.parentNode.style.display='none';
     document.getElementById(last_id).style.display = 'block';
     */
     var current = node;
     while(!current.id && current.parentNode) {
       current = current.parentNode;
     }
     unselectNode(current);
     selectNode(document.getElementById(last_id));
   } else if (!previousElement(node.parentNode, 'div')) {
     // global back because we're at the first screen...
     window.name = 'back-stale';
     history.back();
   } else {
     /*
     node.parentNode.style.display='none';
     previousElement(node.parentNode, 'div').style.display = 'block';
     */
     alert("at the beginning");
   }
}

function clearNode (node) {
   // alert('Clearing node: ' + node.id + ' (' + node + ')' + "\n" + 'has children: ' + node.hasChildNodes() + "\n" + 'Children: ' + node.childNodes.length);
   if ( !node.hasChildNodes() || node.childNodes.length == 0 ) {
      return;
   } else {
      // Check all child nodes
      while (node.childNodes.length) {
         var child = node.childNodes.item(0);
         clearNode(child);
         node.removeChild(child);
      }
   }
}

function newErrorChecker (input) {

   // assume that if it isn't an INPUT tag, its an array of radios
   if (input.tagName != 'INPUT') {
      return function () { return checkRadio(input); }
   }
   return function () { return checkInput(input); }

}

function getDeceasedChildren( children ) {

   var deceased_children = new Array;

   for(var i = 0; i < children.childNodes.length; i++) {
      var child = children.childNodes.item(i);
      var inputs = child.getElementsByTagName('input');
      for(var j = 0; j < inputs.length; j++) {
         var input = inputs.item(j);
         if( input.name.match(/alive/) && input.value == 'No' && input.checked ) {
            deceased_children.push( child );
            break;
         }
      }
   }

   // return array of deceased children nodes
   return deceased_children;

}

function noLivingGrandchildren( num_children_container ) {

   var nlg = true;
   for( var i = 0; i < num_children_container.childNodes.length; i++ ) {
      var children = num_children_container.childNodes.item(i);
      var inputs = children.getElementsByTagName('input');
      for(var j = 0; j < inputs.length; j++) {
         var input = inputs.item(j);
         if( input.name.match(/num_children/) && input.value > 0 ) {
            nlg = false;
            break;
         }
      }
   }

   return nlg;
}

// Clone child node
function addChild ( replace_tag, vtable, add_to_node, clone_node ) {

   // defaults - these are probably broken now... skip them
   if (0) {
   vtable      = vtable      ?  vtable      : error_checks.children;
   add_to_node = add_to_node ?  add_to_node : document.getElementById('children-container');
   clone_node  = clone_node  ?  clone_node  : document.getElementById('childX');
   }

   // clone node
   var child = clone_node.cloneNode(true);

   // update element id's
   child.id = child.id.replace(/childX/, replace_tag);
 
   // replace childX in <input> and <span> (<input> first)
   var inputs = child.getElementsByTagName('input');
   var radios = [];
   for (var i = 0; i < inputs.length; i++) {

      var input = inputs[i];

      // only match tags that have a 'childX' name
      if ( input.name.match(/childX/) ) {

         input.id = input.id.replace(/childX/,replace_tag);
         input.name = input.name.replace(/childX/,replace_tag);

         // assign error check functions
         if ( input.type == 'text' ) {
            vtable[input.name] = newErrorChecker(input);
         } else if ( input.type == 'radio' ) {
            radios.push(input);
         } else if ( input.type == 'checkbox' ) {
            radios.push(input);
         }

      } // else not a childX input

   } // end <input> tag loop

   // handle our radio inputs
   if (radios.length > 0) {

      // one error check entry for the set
      vtable[radios[0].name] = newErrorChecker(radios);

      // give checkboxes a radio ui
      radios[0].onclick = newUnchecker(radios[1]);
      radios[1].onclick = newUnchecker(radios[0]);
   }


   // fixing spans is pretty easy...
   var spans = child.getElementsByTagName('span');
   for (var i = 0; i < spans.length; i++) {
      spans[i].id = spans[i].id.replace(/childX/,replace_tag);
   }

   // add child node to children div
   // assert(document.getElementById('childX') != undefined, "Before append");
   add_to_node.appendChild(child);
   // assert(document.getElementById('childX') != undefined, "After append");

   // make child visible
   child.style.display = 'block';

}

function assert(val,error) {
   if (!val) {
      alert("Assert Failed!" + error);
   }
}

function newUnchecker(input) {
   return function() { input.checked = false; }
}

function showFirstScreen(screens) {
   if (!screens) {
      screens = document.getElementById('screens');
   }
   nodes = screens.childNodes;
   for ( var i = 0, selected = false; i < nodes.length; i++ ) {
      if ( nodes.item(i).nodeName == 'DIV' || nodes.item(i).nodeName == 'div' ) {
	 if(!selected) { selectNode(nodes.item(i)); selected = true; }
	 else { deselectNode(nodes.item(i)); }
      } else if ( nodes.item(i).nodeName == 'FORM' || nodes.item(i).nodeName == 'form' ) {
         showFirstScreen(nodes.item(i));
      }
   }
}

function selectNode(node) {

  node.className = 'selected';
  Effect.SlideDown(node);
  for(i=0;i<node.childNodes.length;i++) {
    if (node.childNodes.item(i).getAttribute) {
      if(node.childNodes.item(i).getAttribute('showOn') == 'select') {
        node.childNodes.item(i).style.display = 'block';
		//Effect.Appear ($(node.childNodes.item(i)));
      } else if (node.childNodes.item(i).getAttribute('showOn') == 'deselect') {
        //node.childNodes.item(i).style.display = 'none';
        Effect.Fade ($(node.childNodes.item(i)));
      }
    }
  }
}
function deselectNode(node) {
  //Effect.SlideUp(node);
  node.className = 'deselected';
  for(i=0;i<node.childNodes.length;i++) {
    if (node.childNodes.item(i).getAttribute) {
      if(node.childNodes.item(i).getAttribute('showOn') == 'select') {
        node.childNodes.item(i).style.display = 'none';
        //Effect.Fade ($(node.childNodes.item(i)));
      } else if (node.childNodes.item(i).getAttribute('showOn') == 'deselect') {
        //node.childNodes.item(i).style.display = 'block';
        Effect.Appear ($(node.childNodes.item(i)));
        //Effect.toggle ($(node.childNodes.item(i)), appear);
      }
    }
  }
}
function unselectNode(node) {
  //for(i=0;i<node.childNodes.length;i++) {
  Effect.SlideUp (node);
  //}
  //node.className = 'unselected';
}

function getForm(node) {
   do {
      if (node.form) {
         return node.form;
      } else if (node.nodeName == 'FORM') {
         return node;
      }
   } while (node = node.parentNode);

   alert("No Form element found!");
}

/* This one is mine. -- Asheesh. */
String.prototype.begins_with = function(s) {
    var len = s.length;
    var hope = this.substring(0, len);
    return hope == s;
}

/* These three string functions come from:
 * Source: http://www.codingforums.com/showthread.php?s=7d47022d2b81ab7d46d3fe9e8473eef4&p=178098#post178098 */

String.prototype.trim=function(){
    var halfway = this.replace(/^\s*|\s*$/g,'');
    return halfway.replace(/\s+/g, " ");
}

String.prototype.ltrim=function(){
    return this.replace(/^\s*/g,'');
}

String.prototype.rtrim=function(){
    return this.replace(/\s*$/g,'');
}
    
/** My own invention. */
    function escape_quotes(s) {
	return s.replace(/\"/g, "\\\"");
    }

/**
 * From http://tag-strategia.com/blog/archives/2006/02/ie-dom-bugs/
 */
function createElement(element_type, name, type) {
    name = escape_quotes(name);
    type = escape_quotes(type);
    
    var element = null;
    
    try {
	// First try the IE way; if this fails then use the standard way
	element = document.createElement('<'+element_type+
					 ' type="'+type+'"' + 
					 ' name="'+name+'">');
    } catch (e) {
	// Probably failed because we're not running on IE
    }
    if (!element) {
	element = document.createElement(element_type);
	element.name = name;
	element.type = type;
    }
    return element;
}

/** Input: a node
 * output: a string with all text children appended
 */
function allText(node) {
    var childs = node.childNodes;
    var ret = "";

    for (var i = 0 ; i < childs.length ; i++) {
	var child = childs[i];

	if (child.nodeType == 3 || child.nodeType == 4) { // 3 == Text, 4 == CDATA
	    ret += child.nodeValue;
	}
    }
    
    return ret;
}

function getElementsByTagAndClassName(node, className, elName) {
    var ells = node.getElementsByTagName(elName);
    
    var ret = new Array();
    for (var i = 0 ; i < ells.length ; i++) {
	var ell = ells[i];
	if (ell.className == className) {
	    ret.push(ell);
	}
    }
    return ret;
}

function array_contains(ra, thing) {
    for (var i = 0 ; i < ra.length; ra++) {
	if (ra[i] == thing) {
	    return true;
	}
    }
    return false;
}