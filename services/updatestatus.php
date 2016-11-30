<?php

if (isset($_POST['SetId'])){
    include "dbhelper.php";

    $_dbhelper = new DbHelper();
    $conn = $_dbhelper->getDefaultConnected();

    $setid = $_POST['SetId'];
    $status = $_POST['Status'];

    $updatedPendingElement = $_dbhelper->updatePendingElementStatus($conn, $setid,$status);
    if (($updatedPendingElement) && ($status == 'IMPLEMENTED')){
        // ELEMETS HAVE BEEN IMPLEMENTED INTO CURRENT PATTERNS

        include "filehelper.php";
        $_filehelper = new FileHelper();
        $result = $_filehelper->moveImplementedFiles($setid); // MOVE FILES FROM [SETID] DIRECTORY

        // INCREMENT MINOR VERSION
        $conn->next_result();
        $curVersionNum = $_dbhelper->getMainVersionNumber($conn);// current version 
        $newVersionNum = floatval($curVersionNum) + 0.01;

        $conn->next_result();
        $isSet = $_dbhelper->insertSetVersion($conn, $setid,$newVersionNum, date("Y-m-d H:i:s"));
        if ($isSet){
            // SUCCESSFULLY INCREMENTED
            $conn->next_result();
            $updateSuccess = $_dbhelper->updateVersionNumber($conn,$newVersionNum);
        }

    }

    echo $updatedPendingElement ? 'TRUE':'FALSE';

    $conn->close();
}

?>