<?php

class DbHelper{
//public $_mysqli;

    function __construct(){

    }
    function getDefaultConnected(){
        include ('../../creds/getcreds.php');
        $_credHelper = new CredHelper();
        $cred = $_credHelper->getDbCred();
     
        $_mysqli = @new mysqli("localhost:8889",$cred['un'],$cred['pw'],"raptor");

        if ($_mysqli->connect_error){
            echo "Connection Error #: " . $_mysqli->connect_errno . "\n";
            echo "Connection Error: " . $_mysqli->connect_error . "\n";
        }

        return $_mysqli;
    }

    // INSERT PENDING ELEMENTS
    function insertToPendingElements($_mysqli,$setId,$date){             
        
        $_mysqli->query(sprintf('SET @setId = "%"',$setId));
        $_mysqli->query(sprintf('SET @uploadDate = "%"',$date));
        if (!$result = $_mysqli->query('CALL pInsertNewElement("' . $setId . '","'. $date .'");')){
            echo false;            
        }
        echo true; 
        $results->free();// free result
        $_mysqli->close();// closes connection
                      
    }

    // GET PENDING ELEMENTS 
        function getPendingElements($_mysqli){
        if (!$result = $_mysqli->query("CALL pSelectPendingElementsByDesc()")){
            // return empty array
            return json_encode(array());
        }

        $rows = array();
        if ($result->num_rows===0){
            // no results
        }else{
            while($r = $result->fetch_assoc()){
                $rows[] = $r;
            }
        }

        echo json_encode($rows);
        $results->free();// free result
        $_mysqli->close();// closes connection
                       
    }


    
}

?>