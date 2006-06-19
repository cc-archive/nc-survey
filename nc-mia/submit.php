<?php

print_r($_POST);

// Configuration:
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
$form_submission_id = md5(uniqid(rand(), true)); // http://www.php.net/uniqid
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
    echo $res->getMessage();
}

}

// Stage 4: Get out of here based on if the queries worked or not

exit;

?>
