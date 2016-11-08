<?php

class FileHelper
{
    function __construct(){

    }

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

        file_put_contents($moveToPath.'metadata.json',json_encode($combineFiles));// add metadata file

        return $guid;
    }

    // GET PENDING FILE NAMES BY SET
    function getPendingFilesBySetId($setId){
        $path = '../pending_elements/' . $setId;
        $filePath = $path . '/metadata.json';
        if (file_exists($filePath)){
            $fileContent = file_get_contents($filePath);
            return $fileContent;
        }else{
            return null;
        }
    }

    function getPendingFilesMetadata($sets){
        $PendingSets = array();

        foreach ($sets as $key => $set){            
            $setId = $set['setId'];
            $uploadDate = $set['UploadDate'];
            $tmp = json_decode($this->getPendingFilesBySetId($setId),true);
            
            // INCLUDE SET ID 
            $tmp[] = array(
                'SetId'=>$setId
            );
            // INCLUDE UPLOAD DATE TO DATA
            $tmp[] = array(
                'Upload Date'=>$uploadDate
            );
            $PendingSets[]=json_encode($tmp);                     
        }

        return $PendingSets;
    }
}

?>