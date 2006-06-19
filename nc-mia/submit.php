<?php

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

$all_is_well = 1;

// Configuration
$xmlpath = "../file-formats/is-it-nc.xml";
// FIXME: Should be in the HTML and passed to us by GET or something?

// Stage 0: Requirements
require_once('DB.php'); // PEAR DB.  Don't leave home without it.

// Stage 1: Get access to the MySQL database
$dsn = "mysql://root:@localhost/cc";
$conn =& DB::connect ($dsn);
if (DB::isError ($conn))
  die ("Cannot connect: " . $conn->getMessage () . "\n");

// Stage 2: Create and prepare queries
$form_submission_id = uuid(); // http://www.php.net/uniqid
$date = time();
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
  echo("Location: http://www.disney.com/");
  exit;
 }
 else {
   echo "<p>Something went wrong in submitting your information.  Please contact support@creativecommons.org with the <strong>full</strong> contents of this page.</p>";
   exit;
 }

?>
