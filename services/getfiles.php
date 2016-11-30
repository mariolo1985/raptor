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

            $conn->close();
            break;

        case "BY_SETS":
            include "filehelper.php";
            $_filehelper = new FileHelper();
            $sets = $_GET['Sets'];
            $result = $_filehelper->getPendingFilesMetadata($sets);
            echo json_encode($result);

            break;

        case "BY_SETID":
            include "dbhelper.php";
            include "filehelper.php";

            $_dbhelper = new DbHelper();
            $conn = $_dbhelper->getDefaultConnected();
            
            $setid = $_GET['SetId'];            
            $result = $_dbhelper->getPendingElementsById($conn,$setid);   

            // GET THE REST (COMMENTS, METADATA)
            $_filehelper = new FileHelper();
            $result = $_filehelper->getPendingFilesMetadata($result);
            echo json_encode($result);
            
            $conn->close();
            break;

            
        case "BY_PENDING_ELEMENTS":
            include "dbhelper.php";
            include "filehelper.php";

            $_dbhelper = new DbHelper();
            $conn = $_dbhelper->getDefaultConnected();
            $pendingElements = $_dbhelper->getPendingElements($conn);
            
            $_filehelper = new FileHelper(); 
            $result = $_filehelper->getPendingFilesMetadata($pendingElements);
            echo json_encode($result);

            $conn->close();
            break;

        case "BY_ELEMENT_VERSION":
            include "dbhelper.php";
            $_dbhelper = new DbHelper();
            $conn = $_dbhelper->getDefaultConnected();

            $setResult = $_dbhelper->getSetVersionNumber($conn);

            include "filehelper.php";
            $_filehelper = new FileHelper();

            $impResult = $_filehelper->getSetMetadata($setResult);
            echo json_encode($impResult);

            $conn->close();

            break;

        default:
            break;
    }
}


?>