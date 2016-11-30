<?php
/*
* THIS IS A WEB SERVICE TO PUT A FILE IN DIRECTORY
* VIA HELPER CLASS
*/
    header("Content-type: text/plain");

    // upload files
    include 'filehelper.php';    
    $_fileHelper = new FileHelper();
    $guid = $_fileHelper->putFile($_FILES);// RETURNS SETID

    // add metadata 
    include "dbhelper.php";
    $_dbhelper = new DbHelper;
    $conn = $_dbhelper->getDefaultConnected();
    $result = $_dbhelper->insertToPendingElements($conn,$guid, date("Y-m-d H:i:s"),"PENDING");// returns true/false

    echo $guid;

    $conn->close();
?>