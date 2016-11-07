<?php
/*
* THIS IS A WEB SERVICE TO PUT A FILE IN DIRECTORY
* VIA HELPER CLASS
*/

require 'filehelper.php';
header("Content-type: text/plain");

$_fileHelper = new FileHelper();
$guid = $_fileHelper->putFile($_FILES);
echo $guid;


?>