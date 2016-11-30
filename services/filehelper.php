<?php

class FileHelper
{
    function __construct(){

    }

    //  UPLOAD FILES TO DIRECTORY AND ADD METADATA.JSON
    function putFile($files){   
        $guid = uniqid("raptor_");     
        $moveToPath = '../pending_elements/' . $guid . '/';
        
        $combineFiles=array();// used to hold the different types of files

        foreach ($files as $key => $value){
            $_name = $files[$key]['name'];
            $_size = $files[$key]['size'];
            $_tmpname = $files[$key]['tmp_name'];      
                 
            $combineFiles[] = array(
                    'filename' => $_name
            );
            
            // CHCK IF DIRECTORY EXIST
            if (!is_dir($moveToPath)){
                mkdir($moveToPath);
            }
            $result = move_uploaded_file($_tmpname,$moveToPath . $_name);
            if (!$result){
                // MOVED ERROR
                $guid = null;
            }
        }// end foreach

        file_put_contents($moveToPath .'metadata.json',json_encode($combineFiles));// add metadata file

        return $guid;
    }

    function moveImplementedFiles($setId){
        $origPath = '../pending_elements/' . $setId;
        $movePath = '../implemented_elements/' . $setId;

        if (!file_exists($movePath)){
            mkdir('../implemented_elements');
        }
        $result = rename($origPath,$movePath);
        return $result;
    }

    // UPLOAD COMMENTS TO DIRECTORY 
    function putCheckInComments($setId,$commentsHtml){
        $moveToPath = '../pending_elements/' . $setId . '/';
        if(file_put_contents($moveToPath . 'comments.txt',$commentsHtml)){
            return true;
        }else{
            return false;
        }
    }

    // GET PENDING FILE NAMES BY SET
    function getMetadataBySetId($setId, $isPendingSet){
        if ($isPendingSet){
            $path = '../pending_elements/' . $setId;
        }else{
            $path = '../implemented_elements/' . $setId;
        }
        
        $filePath = $path . '/metadata.json';
        if (file_exists($filePath)){
            $fileContent = file_get_contents($filePath);
            return $fileContent;
        }else{
            return null;
        }
    }

    // GETS COMMENT FILE AND CONTENT
    function getCommentsBySetId($setId, $isPendingSet){
        if ($isPendingSet){
            $path = '../pending_elements/' . $setId;    
        }else{
            $path = '../implemented_elements/' . $setId;
        }
        
        $filePath = $path . '/comments.txt';
        if (file_exists($filePath)){
            $fileContent = file_get_contents($filePath);
            return $fileContent;
        }else{
            return null;
        }
    }


    function getPendingFilesMetadata($sets){        
        $PendingSets = [];

        foreach ($sets as $key => $set){        
            $tmp = [];            
            $setId = $set['SetId'];
            $uploadDate = $set['UploadDate'];
            $wfStatus = $set['WorkflowStatus'];

            $fileSets = $this->getMetadataBySetId($setId, true);
            $comments = $this->getCommentsBySetId($setId, true);

            // INCLUDE SET ID 
            $tmp[] = array(
                'SetId'=>$setId,
                'WorkflowStatus'=>$wfStatus,
                'UploadDate'=>$uploadDate,
                'Filenames'=>json_decode($fileSets),
                'Comments'=>$comments  
            );
            
            $PendingSets[]=json_encode($tmp);                     
        }

        return $PendingSets;
    }

    // GET IMPLEMENTED FILE METADATA
    function getSetMetadata($sets){

        $implementedSets = [];
        foreach ($sets as $set){
            $tmp = [];
            $setid = $set['SetId'];
            $versionNum = $set['VersionNumber'];
            $versionDate = $set['VersionDate'];

            $fileSets = $this->getMetadataBySetId($setid,false);
            $comments = $this->getCommentsBySetId($setid,false);


            $tmp[] = array(
                'SetId'=>$setid,
                'VersionNum'=> $versionNum,
                'VersionDate'=>$versionDate,
                'Filenames'=>json_decode($fileSets),
                'Comments' => $comments
            );

            $implementedSets[] = json_encode($tmp);
        }

        return $implementedSets;
    }// end getImplementedSetMetadata
}

?>