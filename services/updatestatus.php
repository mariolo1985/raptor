<?php

if (isset($_POST['SetId'])){
    include "dbhelper.php";

    $_dbHelper = new DbHelper();
    $conn = $_dbHelper->getDefaultConnected();

    $setid = $_POST['SetId'];
    $status = $_POST['Status'];

    $updatedPendingElement = $_dbHelper->updatePendingElementStatus($conn, $setid,$status);
    if (($updatedPendingElement) && ($status == 'IMPLEMENTED')){
        include "filehelper.php";
        $_filehelper = new FileHelper();
        $result = $_filehelper->moveImplementedFiles($setid);
    }
    echo $updatedPendingElement ? 'TRUE':'FALSE';
    
}

?>