<?php
  // Look, ma, only three configuration lines!
$MAIL_TO="paulproteus@localhost";
$MAIL_FROM="form@creativecommons.org";
$THANKS_TEXT = "Thanks for filling out our survey!";

/* Source: http://php.net/uniqid
 * Used with permission. */
function uuid() {
  
  // The field names refer to RFC 4122 section 4.1.2
  
  return sprintf('%04x%04x-%04x-%03x4-%04x-%04x%04x%04x',
		 mt_rand(0, 65535), mt_rand(0, 65535), // 32 bits for "time_low"
		 mt_rand(0, 65535), // 16 bits for "time_mid"
		 mt_rand(0, 4095),  // 12 bits before the 0100 of (version) 4 for "time_hi_and_version"
		 bindec(substr_replace(sprintf('%016b', mt_rand(0, 65535)), '01', 6, 2)),
		 // 8 bits, the last two of which (positions 6 and 7) are 01, for "clk_seq_hi_res"
		 // (hence, the 2nd hex digit after the 3rd hyphen can only be 1, 5, 9 or d)
		 // 8 bits for "clk_seq_low"
		 mt_rand(0, 65535), mt_rand(0, 65535), mt_rand(0, 65535) // 48 bits for "node" 
		 ); 
}

function form2email($data, $from, $to, $form_submission_id) {
  $recipients = array("To" => $to);
  $params['sendmail_path'] = '/usr/sbin/sendmail';
  $mailer = Mail::factory("sendmail", $params);
  $headers = array();
  $headers["From"] = $from;
  $headers["Subject"] = "Form submitted at " . $_SERVER['REQUEST_URI'];
  $headers["To"] = $to;
  
  $body = "This submission is available as UUID " . $form_submission_id . "\n\n";
  
  foreach ($data as $key => $value) {
    $key = str_replace("_", " ", $key);
    // Keys are INPUT NAMEs in HTML, which can be only alphanumeric or _
    // So be nice and turn _ into ' '

    // values should come in properly escaped.
      
    $body .= "Question: $key\n";
    $body .= "Provided answer: $value\n\n";	
  }
  
  $mailer->send($recipients, $headers, $body);
}

// Stage 0: Requirements
require_once('DB.php'); // PEAR DB.  Don't leave home without it.
require_once('Mail.php'); // PEAR Mail.  Because I don't want to be sending out spam.

// Stage 1: Get access to the MySQL database and set other state variables
$dsn = "mysql://root:@localhost/cc";
$conn =& DB::connect ($dsn);
if (DB::isError ($conn))
  die ("Cannot connect: " . $conn->getMessage () . "\n");
$all_is_well = 1;
$form_submission_id = uuid(); // http://www.php.net/uniqid
$date = time();

// Stage 1.25: Clean up $_POST
foreach ($_POST as $key => $value) {
    $nicekey = str_replace("_", " ", $key);
    // Keys are INPUT NAMEs in HTML, which can be only alphanumeric or _
    // So be nice and turn _ into ' '

    // values should come in properly escaped.
    unset($_POST[$key]);
    $_POST[$nicekey] = $value;
  }



// Stage 1.5: Send email
form2email($_POST, $MAIL_FROM, $MAIL_TO, $form_submission_id);

// Stage 2: Create and prepare queries
$xmlpath = $_POST['xmlpath'];
unset($_POST['xmlpath']);
$canned_sql = $conn->prepare('INSERT INTO formresults (xmlpath, question, answer, date, uid) VALUES(?, ?, ?, ?, ?)');

// Stage 3: Perform queries
// For each element in _POST, submit it:
foreach ($_POST as $key => $value) {
  $query = array();
  $query['xmlpath'] = $xmlpath;
  $query['question'] = $key;
  $query['answer'] = $value;
  $query['date'] = $date;
  $query['uid'] = $form_submission_id;
  $res = $conn->execute($canned_sql, $query);
  
  if (DB::isError($res)) {
    // get the portable error string
    $all_is_well = 0;
    echo "<p>Error in database submission.  Data:</p>";
    echo "<pre>";
    print_r($query);
    echo "</pre>";
    echo $res->getMessage();
  }
  
}

// Stage 4: If something broke, say so.  Otherwise, get out of here.
if ($all_is_well) {
  echo($THANKS_TEXT);
  exit;
 }
 else {
   echo "<p>Something went wrong in submitting your information.  Please contact support@creativecommons.org with the <strong>full</strong> contents of this page.</p>";
   exit;
 }

?>
