<?php
include "dbhelper.php";

$postSetId = $_POST['SetId'];

if (isset($_POST['SetId'])){
    $_dbhelper = new DbHelper;
    $conn = $_dbhelper->getDefaultConnected();
    $result = $_dbhelper->insertToPendingElements($conn,$postSetId, date("Y-m-d H:i:s"));
    echo $result;
}

?>