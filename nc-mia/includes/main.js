/* GLOBALS */
var authors = new Array;
var author_index = 0;
var grantors = new Array;

function tot(node) {

  var screen = getScreenID(node);

  switch( screen ) {

    case 'employee':

      /* employee should be Yes/No/false */
      employee = checkRadio(node.form.employee);

      /* nothing selected or unexpected return value */
      if (!employee || (employee != 'Yes' && employee != 'No')) {
        document.getElementById('employee-error').style.display = 'inline';
        break;
      }

      document.getElementById('employee-error').style.display = 'none';
      document.getElementById('h-wfh-emp-ans').innerHTML = employee;
      selectNode(document.getElementById('history'));
      selectNode(document.getElementById('h-wfh-emp'));
      deselectNode(document.getElementById('employee'));
      back_list().push('employee');

      if (employee == 'Yes') {
        node.form.work_for_hire.value='Yes';
        selectNode(document.getElementById('error-scope_of_employment'));

      } else if (employee == 'No')  {
        selectNode(document.getElementById('commissioned'));
      }
      break;

    case 'commissioned':

      /* commissioned should be Yes/No/false */
      commissioned = checkRadio(node.form.commissioned);

      /* nothing selected or unexpected return value */
      if (!commissioned || (commissioned != 'Yes' && commissioned != 'No')) {
        document.getElementById('commissioned-error').style.display = 'inline';
        break;
      }

      document.getElementById('commissioned-error').style.display = 'none';
      document.getElementById('h-wfh-com-ans').innerHTML = commissioned;
      selectNode(document.getElementById('h-wfh-com'));
      deselectNode(document.getElementById('commissioned'));
      back_list().push('commissioned');

      if (commissioned == 'No')  {
        node.form.work_for_hire.value='No';
        selectNode(document.getElementById('copyright_date'));

      } else if (commissioned == 'Yes')  {
        selectNode(document.getElementById('pre1978'));
      }
      break;

    case 'pre1978':

      /* pre1978 should be Yes/No/false */
      pre1978 = checkRadio(node.form.pre1978);

      /* nothing selected or unexpected return value */
      if (!pre1978 || (pre1978 != 'Yes' && pre1978 != 'No')) {
        document.getElementById('pre1978-error').style.display = 'inline';
        break;
      }

      document.getElementById('pre1978-error').style.display = 'none';
      document.getElementById('h-wfh-pre-ans').innerHTML = pre1978;
      selectNode(document.getElementById('h-wfh-pre'));
      deselectNode(document.getElementById('pre1978'));
      back_list().push('pre1978');

      if (pre1978 == 'Yes')  {
        node.form.work_for_hire.value='Yes';
        selectNode(document.getElementById('error-commissioned-pre1978'));

      } else if (pre1978 == 'No')  {
        selectNode(document.getElementById('written_agreement'));
      }
      break;

    case 'written_agreement':
    
      /* written should be Yes/No/false */
      written = checkRadio(node.form.written);

      /* nothing selected or unexpected return value */
      if (!written || (written != 'Yes' && written != 'No')) {
        document.getElementById('written-error').style.display = 'inline';
        break;
      }

      document.getElementById('written-error').style.display = 'none';
      document.getElementById('h-wfh-wri-ans').innerHTML = written;
      selectNode(document.getElementById('h-wfh-wri'));
      deselectNode(document.getElementById('written_agreement'));
      back_list().push('written_agreement');

      if (written == 'No')  {
        node.form.work_for_hire.value='No';
        selectNode(document.getElementById('copyright_date'));

      } else if (written == 'Yes')  {
        selectNode(document.getElementById('categoryA'));
      }
      break;

    case 'categoryA':

      /* categoryA should be Yes/No/false */
      categoryA = checkRadio(node.form.categoryA);

      /* nothing selected or unexpected return value */
      if (!categoryA || (categoryA != 'Yes' && categoryA != 'No')) {
        document.getElementById('categoryA-error').style.display = 'inline';
        break;
      }

      document.getElementById('categoryA-error').style.display = 'none';
      document.getElementById('h-wfh-catA-ans').innerHTML = categoryA;
      selectNode(document.getElementById('h-wfh-catA'));
      deselectNode(document.getElementById('categoryA'));
      back_list().push('categoryA');

      if (categoryA == 'Yes')  {
        node.form.work_for_hire.value='Yes';
        selectNode(document.getElementById('error-commissioned-categoryA'));

      } else if (categoryA == 'No')  {
        selectNode(document.getElementById('categoryB'));
      }
      break;

    case 'categoryB':

      /* categoryB should be Yes/No/false */
      categoryB = checkRadio(node.form.categoryB);

      /* nothing selected or unexpected return value */
      if (!categoryB || (categoryB != 'Yes' && categoryB != 'No')) {
        document.getElementById('categoryB-error').style.display = 'inline';
        break;
      }

      document.getElementById('categoryB-error').style.display = 'none';
      document.getElementById('h-wfh-catB-ans').innerHTML = categoryB;
      selectNode(document.getElementById('h-wfh-catB'));
      deselectNode(document.getElementById('categoryB'));
      back_list().push('categoryB');

      if (categoryB == 'Yes')  {
        node.form.work_for_hire.value='Yes';
        selectNode(document.getElementById('error-commissioned-categoryB'));

      } else if (categoryB == 'No')  {
        selectNode(document.getElementById('categoryC'));
      }
      break;

    case 'categoryC':

      /* categoryC should be Yes/No/false */
      categoryC = checkRadio(node.form.categoryC);

      /* nothing selected or unexpected return value */
      if (!categoryC || (categoryC != 'Yes' && categoryC != 'No')) {
        document.getElementById('categoryC-error').style.display = 'inline';
        break;
      }

      document.getElementById('categoryC-error').style.display = 'none';
      document.getElementById('h-wfh-catC-ans').innerHTML = categoryC;
      selectNode(document.getElementById('h-wfh-catC'));
      deselectNode(document.getElementById('categoryC'));
      back_list().push('categoryC');

      if (categoryC == 'Yes') {
        node.form.work_for_hire.value='Yes';
        selectNode(document.getElementById('error-commissioned-categoryC'));

      } else if (categoryC == 'No')  {
        selectNode(document.getElementById('copyright_date'));
      }
      break;

    case 'copyright_date':

      cdate = checkDate(
        document.getElementById('cmonth').value,
        document.getElementById('cday').value,
        document.getElementById('cyear').value );

      if (!cdate) {
        document.getElementById('cdate-error').style.display = 'inline';
      } else {
        node.form.cdate.raw = cdate;
        document.getElementById('cdate-error').style.display = 'none';
        document.getElementById('h-cdate-ans').innerHTML = cdate.getFullYear() + '/' + (cdate.getMonth() + 1) + '/' + cdate.getDate();
        selectNode(document.getElementById('h-cdate'));

        deselectNode(document.getElementById('copyright_date'));
        selectNode(document.getElementById('grant_date'));
        back_list().push('copyright_date');
      }

      break;

    case 'grant_date':

      gdate = checkDate(
        document.getElementById('gmonth').value,
        document.getElementById('gday').value,
        document.getElementById('gyear').value );

      if (!gdate) {
        document.getElementById('gdate-error').style.display = 'inline';

      } else {
        /* No Input Error - clean up */
        node.form.gdate.raw = gdate;
        document.getElementById('gdate-error').style.display = 'none';
        document.getElementById('h-gdate-ans').innerHTML = gdate.getFullYear() + '/' + (gdate.getMonth() + 1) + '/' + gdate.getDate();
        selectNode(document.getElementById('h-gdate'));

        /* Determine Notice and Termination Windows */
        if (gdate.getFullYear() >= 1978) {
          node.form.termtype.value = '203';

          /*
          ## ***This is not entirely accurate*** ##
          ## This is an estimation that ignores publication date
          ## which is needed to calculate the actual Notice/Termination windows
          ##
          ## For simplicity, we make all 203 terminations overinclusive (none are underinclusive)
          ## depending on publication date, the termination window could open anywhere from
          ## 35 to 40 years after the grant date, and could close somewhere between 40 and 45 years
          ## after the grant date.  To accommodate all possible terminations without using publication
          ## date, we give all 203 terminations a 35-45 termination window (which is 5 years to big in all cases)
          ## The notice requirements are the same, regardless of publication, so we'll use a notice window
          ## of 25-43 years (termination requires between 10 and 2 years notice).
          */

          /* (approx) Termination window is 35-45 years after grant date */
          node.form.twopen.raw  = new Date(gdate.getFullYear() + 35, gdate.getMonth(), gdate.getDate());
          node.form.twclose.raw = new Date(gdate.getFullYear() + 45, gdate.getMonth(), gdate.getDate());

          /* (approx) Notice window is 25-43 years after grant date */
          node.form.nwopen.raw  = new Date(gdate.getFullYear() + 25, gdate.getMonth(), gdate.getDate());
          node.form.nwclose.raw = new Date(gdate.getFullYear() + 43, gdate.getMonth(), gdate.getDate());

        /*
        ## If the grant is before 1978, then we look for either 304(c) or 304(d) termination
        ##  304(d) came about under the Sonny Bono Copyright Term Extension Act, and sets a hard deadline
        ##  at Oct 27, 1939 ( 59 years before the effective date of the CTEA - when notice windows closed )
        */

        /* So if the copyright date is on or after 10/27/1939 , we're in 304(c) land */
        } else if ( node.form.cdate.raw >= new Date(1939, (10 - 1), 27) ) {

          node.form.termtype.value = '304(c)';

          /* Termination window is 56-61 years after the copyright date */
          node.form.twopen.raw  = new Date(cdate.getFullYear() + 56, cdate.getMonth(), cdate.getDate());
          node.form.twclose.raw = new Date(cdate.getFullYear() + 61, cdate.getMonth(), cdate.getDate());

          /* Notice window is 46-59 years after the copyright date */
          node.form.nwopen.raw  = new Date(cdate.getFullYear() + 46, cdate.getMonth(), cdate.getDate());
          node.form.nwclose.raw = new Date(cdate.getFullYear() + 59, cdate.getMonth(), cdate.getDate());


        /*
        ## The grant is before 1978 and the copyright is on or before 10/26/1939
        ## so this has to be a 304(d) termination
        ## Should add check for >=1923 (and <=1969, but that check is redundant)
        */
        } else {

          node.form.termtype.value = '304(d)'

          /* Termination windown is 75-80 years after the copyright date */
          node.form.twopen.raw  = new Date(cdate.getFullYear() + 75, cdate.getMonth(), cdate.getDate());
          node.form.twclose.raw = new Date(cdate.getFullYear() + 80, cdate.getMonth(), cdate.getDate());

          /* Notice window is 65-78 years after the copyright date */
          node.form.nwopen.raw  = new Date(cdate.getFullYear() + 65, cdate.getMonth(), cdate.getDate());
          node.form.nwclose.raw = new Date(cdate.getFullYear() + 78, cdate.getMonth(), cdate.getDate());

        }

        /* If we're before the notice window... */
        var today = new Date();
        if (today < node.form.nwopen.raw) {
          document.getElementById('error-before_window-notice_window_open').innerHTML = node.form.nwopen.raw.getFullYear();
          deselectNode(document.getElementById('grant_date'));
          selectNode(document.getElementById('error-before_window'));

        /* If the notice window has expired... */
        } else if (today > node.form.nwclose.raw) {
          deselectNode(document.getElementById('grant_date'));
          selectNode(document.getElementById('error-after_window'));

        } else {

          /* Otherwise, we're good - continue */
          deselectNode(document.getElementById('grant_date'));
          selectNode(document.getElementById('author_names'));
          back_list().push('grant_date');
        }
      }

      break;

    case 'author_names':

      var author_nodes = document.getElementById('authors_container').getElementsByTagName('input');

      /* Check for errors */
      if (author_nodes.length <= 0 ) {
        document.getElementById('author_name0-error').style.display = 'inline';
        break;
      } else {
        var error = false;
        for (var i=0; i<author_nodes.length; i++) {
          if (!author_nodes[i].value || !author_nodes[i].value.length) {
            error = true;
            document.getElementById('author_name' + (i+1) + '-error').style.display = 'inline';
          } else {
            document.getElementById('author_name' + (i+1) + '-error').style.display = 'none';
          }
        }
        if (error) {
          break;
        }
      }

      /* Save in Global and Fill in deselect span */
      node.form.num_authors.value = author_nodes.length;
      var author_answer = document.getElementById('h-names-ans');
      author_answer.innerHTML = '';
      while(authors.pop());
      for (var i=0; i<author_nodes.length; i++) {

        var author = new Array;
        author.name = author_nodes[i].value;
        authors.push(author);

        if (i>0) {
          author_answer.innerHTML += ", ";
        }
        author_answer.innerHTML += author_nodes[i].value;
      }

      /* move to next screen */
      selectNode(document.getElementById('h-names'));
      deselectNode(document.getElementById('author_names'));
      selectNode(document.getElementById('basic'));
      back_list().push('author_names');
      break;

    case 'basic':

      /* check inputs */
      var errors = false;
      if (document.getElementById('title').value.length <= 0) {
        errors = true;
        document.getElementById('title-error').style.display = 'inline';
      } else {
        document.getElementById('title-error').style.display = 'none';
      }

      if (document.getElementById('ocn').value.length <= 0) {
        errors = true;
        document.getElementById('ocn-error').style.display = 'inline';
      } else {
        document.getElementById('ocn-error').style.display = 'none';
      }

      if (document.getElementById('grantee').value.length <= 0) {
        errors = true;
        document.getElementById('grantee-error').style.display = 'inline';
      } else {
        document.getElementById('grantee-error').style.display = 'none';
      }

      if (document.getElementById('grantname').value.length <= 0) {
        errors = true;
        document.getElementById('grantname-error').style.display = 'inline';
      } else {
        document.getElementById('grantname-error').style.display = 'none';
      }

      if (!errors) {

        document.getElementById('h-basic-title').innerHTML = document.getElementById('title').value;
        document.getElementById('h-basic-ocn').innerHTML = document.getElementById('ocn').value;
        document.getElementById('h-basic-grantee').innerHTML = document.getElementById('grantee').value;
        document.getElementById('h-basic-desc').innerHTML = document.getElementById('grantname').value;

        /* move to next screen */
        selectNode(document.getElementById('h-basic'));
        deselectNode(document.getElementById('basic'));
        selectNode(document.getElementById('author_grant'));
        back_list().push('basic');

      }

      break;

    case 'author_grant':

      /* author_grant should be Yes/No/false */
      var author_grant = checkRadio(node.form.author_grant);

      /* nothing selected */
      if (!author_grant) {
        document.getElementById('author_grant-error').style.display = 'inline';

      } else {
        document.getElementById('author_grant-error').style.display = 'none';
        document.getElementById('h-agrant-ans').innerHTML = author_grant;

        if (author_grant == 'Yes') {

          // deal with joint authorship - which authors were grantors?
          if ( authors.length > 1 ) {
            var container = document.getElementById('grantor-container');
            while(container.childNodes.length) {
              container.removeChild(container.lastChild);
            }
            for (var i=0; i < authors.length; i++) {
              document.getElementById('grantor-name').innerHTML = authors[i].name;
              document.getElementById('grantor-container').appendChild(
                strip_ids(document.getElementById('grantor-template').cloneNode(true))
              );
            }
            selectNode(document.getElementById('h-agrant'));
            deselectNode(document.getElementById('author_grant'));
            selectNode(document.getElementById('grantors'));
            back_list().push('author_grant');


          // Single author - he/she was the grantor
          } else {
            document.getElementById('h-auth-info-ans').innerHTML = authors[author_index].name;
            selectNode(document.getElementById('h-auth-info'));
            selectNode(document.getElementById('h-agrant'));
            deselectNode(document.getElementById('author_grant'));
            author_index = 0;
            document.getElementById('author_alive-name').innerHTML = authors[author_index].name;
            selectNode(document.getElementById('author_alive'));
            back_list().push('author_grant');
          }

        /* If not an Author Grant, 203 termination => error, 304 termination => successor check */
        } else if (author_grant == 'No')  {

          // Check for successor grants
          if ( node.form.termtype.value == '203' ) {
            // only author grants allowed for 203 terminations (post-1978 grants)
            selectNode(document.getElementById('h-agrant'));
            deselectNode(document.getElementById('author_grant'));
            selectNode(document.getElementById('error-invalid_grantor-203'));
          } else {
            selectNode(document.getElementById('h-agrant'));
            deselectNode(document.getElementById('author_grant'));
            selectNode(document.getElementById('successor_grant'));
            back_list().push('author_grant');
          }

        } else {
          /* Unknown return val. This shouldn't happen.. */
          alert('Unknown return val from checkRadio');
        }
      }

      break;

    case 'grantor':

      var at_least_one_grantor = false;
      var grantor_inputs = document.getElementById('grantor-container').getElementsByTagName('input');
      for(var i=0; i<authors.length; i++) {
        if (grantor_inputs[i].checked) {
          if (at_least_one_grantor) {
            document.getElementById('h-grantors-ans').innerHTML += ', ' + authors[i].name;
          } else {
            document.getElementById('h-grantors-ans').innerHTML = authors[i].name;
          }
          at_least_one_grantor = true;
          authors[i].grantor = true;
          // alert(authors[i].name + ": YES!");
        } else {
          authors[i].grantor = false;
          // alert(authors[i].name + ": NO...");
        }
      }

      if (!at_least_one_grantor) {
        document.getElementById('grantor-error').style.display = 'inline';
      } else {
        document.getElementById('grantor-error').style.display = 'none';
        deselectNode(document.getElementById('grantors'));
        selectNode(document.getElementById('h-grantors'));
        author_index = -1;
        author_alive_next(node);
        document.getElementById('h-auth-info-ans').innerHTML = authors[author_index].name;
        selectNode(document.getElementById('h-auth-info'));
        selectNode(document.getElementById('author_alive'));
        back_list().push('grantor');
      }

      break;

    case 'successor_grant':

      /* successor_grant should be Yes/No/false */
      var successor_grant = checkRadio(node.form.successor_grant);

      /* nothing selected */
      if (!successor_grant) {
        document.getElementById('successor_grant-error').style.display = 'inline';

      } else {
        document.getElementById('successor_grant-error').style.display = 'none';
        document.getElementById('successor_grant-answer').innerHTML = successor_grant;

        if (successor_grant == 'Yes') {

          deselectNode(document.getElementById('successor_grant'));
          alert("end of the line for now - should head to 06_successor_grant.html");

        /* Assumption: we only ask this question if Author Grant is No, and its a 304 termination */
        } else if (successor_grant == 'No')  {

          deselectNode(document.getElementById('successor_grant'));
          selectNode(document.getElementById('error-invalid_grantor-304'));

        } else {
          /* Unknown return val. This shouldn't happen.. */
          alert('Unknown return val from checkRadio');
        }
      }

      break;

    case 'author_alive':

      /* should be Yes/No/false */
      var author_alive = checkRadio(node.form.author_alive);

      /* nothing selected */
      if (!author_alive) {
        document.getElementById('author_alive-error').style.display = 'inline';

      } else {
        document.getElementById('author_alive-error').style.display = 'none';

        authors[author_index].alive = author_alive; /* Yes or No */
        document.getElementById('h-auth-info-alive-ans').innerHTML = authors[author_index].alive;
        selectNode(document.getElementById('h-auth-info-alive'));
/*        deselectNode(
          document.getElementById('author_alive-container').appendChild(
            strip_ids(document.getElementById('author_alive-deselect-template').cloneNode(true))
          )
        );
*/
        if (author_alive == 'Yes') {

          var nxt = author_alive_next(node);
          if (!nxt) { alert("we're done!"); }

        } else if (author_alive == 'No')  {

          /* On to Spouse Info */
          document.getElementById('author_spouse_info-name1').innerHTML = authors[author_index].name;
          document.getElementById('author_spouse_info-name2').innerHTML = authors[author_index].name;
          deselectNode(document.getElementById('author_alive'));
          selectNode(document.getElementById('author_spouse_info'));

        } else {
          /* Unknown return val. This shouldn't happen.. */
          alert('Unknown return val from checkRadio');
        }
      }

      break;

    case 'author_alive-back':

      // var container = document.getElementById('author_alive-container');
      // container.removeChild(container.lastChild);
      author_alive_prev(node);

      break;

    case 'author_spouse_info':

      /* should be Yes/No/false */
      var author_spouse_alive = checkRadio(node.form.author_spouse_alive);
      var author_spouse_name = document.getElementById('author_spouse_name').value;
      var author_num_children = document.getElementById('author_num_children').value;

      if (author_spouse_alive && author_spouse_name && author_num_children) {

        document.getElementById('author_spouse_alive-error').style.display = 'none';
        document.getElementById('author_spouse_name-error').style.display = 'none';
        document.getElementById('author_num_children-error').style.display = 'none';

        authors[author_index].spouse_alive = author_spouse_alive; /* Yes or No */
        authors[author_index].spouse_name = author_spouse_name; /* Yes or No */
        authors[author_index].num_children = author_num_children; /* Yes or No */

        document.getElementById('h-auth-info-spouse-name').innerHTML = authors[author_index].spouse_name;
        document.getElementById('h-auth-info-spouse-alive').innerHTML = authors[author_index].spouse_alive;
        document.getElementById('h-auth-info-num-children').innerHTML = authors[author_index].num_children;
        selectNode(document.getElementById('h-auth-info-spouse'));
        deselectNode(document.getElementById('author_spouse_info'));

        if (author_num_children == 0) {
          author_alive_next(node);
          selectNode(document.getElementById('author_alive'));
          back_list().push('author_spouse_info');
        } else {
          
        }
      }


      break;

    case 'author_spouse_info-back':

      var container = document.getElementById('author_alive-container');
      container.removeChild(container.lastChild);
      unselectNode(document.getElementById('author_spouse_info'));
      selectNode(document.getElementById('author_alive'));
      break;

    default:
      selectNode(document.getElementById('employee') );
      var container = document.getElementById('author_alive-container');
      while(container.childNodes.length) {
        container.removeChild(container.lastChild);
      }
      break;

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
/*  if (!node) { return false; }
  testr = node;
  do {
    testr = testr.parentNode;
  } while (testr.parentNode.id != 'screens'); */
  if (node && node.getAttribute) { return node.getAttribute('totID'); }
  else { /* alert('couldnt find screen id!'); */ return false; }
}