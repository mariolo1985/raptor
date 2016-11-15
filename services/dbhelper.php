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
    function insertToPendingElements($_mysqli,$setId,$date,$status){          

        try{
            // DECLARE CLASS SESSION VARIABLES 
            $stmt = $_mysqli->prepare('SET @_setid := ?');//set id 
            $stmt->bind_param('s', $setId);
            $stmt->execute();

            $stmt = $_mysqli->prepare('SET @_date := ?');// upload date 
            $stmt->bind_param('s',$date);
            $stmt->execute();

            $stmt = $_mysqli->prepare('SET @_wfstatus := ?');// WF STATUS
            $stmt->bind_param('s',$status);
            $stmt->execute();

            $result = $_mysqli->query('CALL pInsertNewElement(@_setid,@_date,@_wfstatus)');
            echo $result ? "TRUE" : "FALSE";
            $result->free();

        }catch(Exception $e){
            echo $e->getMessage();
        }

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