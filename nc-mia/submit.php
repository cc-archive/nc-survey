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
$date = $_SERVER['REQUEST_TIME'];
$canned_sql = $conn->prepare('INSERT INTO formresults (xmlpath, question, answer, date, uid) VALUES(?, ?, ?, ?, ?)');

// Stage 3: Perform queries
// For each element in _POST, submit it:
foreach ($_POST as $key => $value) {
  $conn->execute($canned_sql, array($xmlpath, $key, $value, $date, $form_submission_id));
}

// Stage 4: Get out of here based on if the queries worked or not


exit;

?>
