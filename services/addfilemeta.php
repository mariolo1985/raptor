<?php
include "dbhelper.php";

if (isset($_POST['SetId'])){
    $_dbhelper = new DbHelper;
    $conn = $_dbhelper->getDefaultConnected();

    $postSetId = $_POST['SetId'];
    $postStatus = $_POST['Status'];

    $result = $_dbhelper->insertToPendingElements($conn,$postSetId, date("Y-m-d H:i:s"),$postStatus);
    echo $result;
}

?>