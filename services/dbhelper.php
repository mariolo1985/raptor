<?php

class DbHelper{
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
            return $result;
            $result->free();

        }catch(Exception $e){
            echo $e->getMessage();
        }             
    }

    // UPDATE PENDING ELEMENT STATUS
    function updatePendingElementStatus($_mysqli, $setId, $status){
        try{
            // PREPARE VARIABLES
            $stmt = $_mysqli->prepare('SET @_setId := ?');// SET ID
            $stmt->bind_param('s',$setId);
            $stmt->execute();

            $stmt = $_mysqli->prepare('SET @_wfstatus := ?');//WORKFLOW STATUS
            $stmt->bind_param('s',$status);
            $stmt->execute();

            $result = $_mysqli->query('CALL pUpdatePendingElementStatus(@_setId, @_wfstatus)');            
            return $result;
            
            $result->free();
        }catch(Exception $e){
            echo $e->getMessage();
        }

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

        return $rows;
        $results->free();// free result
    }

    // GET PENDING ELEMENT BY ID
    function getPendingElementsById($_mysqli,$setId){
        try{            
            // PREPARE VARIABLE
            $stmt = $_mysqli->prepare('SET @_setId := ?');// SET ID
            $stmt->bind_param('s',$setId);
            $stmt->execute();

            if (!$result = $_mysqli->query('CALL pSelectPendingElementsBySetId(@_setId)')){
                return json_encode(array());
            }
            
            $rows = array();
            if ($result->num_rows===0){
                // no results
            }else{
                while ($r = $result->fetch_assoc()){
                    $rows[]=$r;
                }
            }

            return $rows;
            $result->free();

            
        }catch(Exception $e){
            echo $e->getMessage();
        }
    }

    // INSERT SET VERSION FOR HISTORY TRACKING
    function insertSetVersion($_mysqli,$setId,$num,$upDate){
        
        try{
            // DECLARE VARIABLES
            $stmt = $_mysqli->prepare('SET @__setid := ?');
            $result = $stmt->bind_param('s',$setId);
            $stmt->execute();

            $stmt = $_mysqli->prepare('SET @__versionNum := ?');
            $stmt->bind_param('s', $num);
            $stmt->execute();
 
            $stmt = $_mysqli->prepare('SET @__versionDate := ?');
            $stmt->bind_param('s',$upDate);
            $stmt->execute();

            $result = $_mysqli->query('CALL pInsertSetVersion(@__setid, @__versionNum, @__versionDate)');
            return $result;
            $result->free();
        }catch(Exception $e){
            echo 'error';
            echo $e->getMessage();
        }
    }

    // GET PATTERNS VERSION NUMBER
    function getMainVersionNumber($_mysqli){
      
        try{
            if (!$result = $_mysqli->query('CALL pGetMainVersionNumber()')){
                return false;
            }

            $rows = array();
            if ($result->num_rows===0){                
                // no results
            }else{
                while($r = $result->fetch_assoc()){
                    $rows[] = $r;
                }
                $verionNum = $rows[0]['VersionNumber'];
                return $verionNum;
            }

            $result->free();
        }catch(Exception $e){
            echo $e->getMessage();
        }
    }

    // UPDATE MAIN VERSION NUMBER
    function updateVersionNumber($_mysqli, $versionNum){
        try{
            $stmt = $_mysqli->prepare('SET @_versionNum := ?');
            $stmt->bind_param('s',$versionNum);
            $stmt->execute();

            $result = $_mysqli->query('CALL pUpdateMainVersionNum(@_versionNum)');
            return $result;
            $result->free();
        }catch(Exception $e){

        }
    }// end updateversionnum

    // GET ELEMENT SET VERSION NUMBER
    function getSetVersionNumber($conn){
        try{
            if (!$result = $conn->query('CALL pGetElementVersions()')){
                return false;
            }

            $rows = array();
            if ($result->num_rows === 0){
                // NO RESULTS
                return $rows;
            }else{
                while ($r = $result->fetch_assoc()){
                    $rows[] = $r;
                }
                return $rows;
            }

        }catch(Exception $e){
            echo $e->getMessage();            
        }

    }// end getSetVersionNumber
}

?>