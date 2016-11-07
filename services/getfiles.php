<?php

    header('Content-Type: application/json');

if (isset($_GET['Filter'])){
    $filter = $_GET['Filter'];
    switch ($filter){
        case "PENDING_ELEMENTS":
            include "dbhelper.php";
            $_dbhelper = new DbHelper();
            $conn = $_dbhelper->getDefaultConnected();
            $result = $_dbhelper->getPendingElements($conn);
            echo json_encode($result);
        break;

        case "BY_SETID":
            include "filehelper.php";
            $_filehelper = new FileHelper();
            $sets = $_GET['Sets'];
            $result = $_filehelper->getPendingFilesMetadata($sets);
            echo json_encode($result);
            
        break;

        default:
        break;
    }
}


?>