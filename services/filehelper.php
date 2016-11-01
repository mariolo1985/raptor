<?php

class FileHelper
{
    function __construct(){
        echo 'filehelper constructed';
    }

    function putFile($files){        
        foreach ($files as $key => $value){
            $_name = $files[$key]['name'];
            $_size = $files[$key]['size'];
            $_tmpname = $files[$key]['tmp_name'];
            $result = move_uploaded_file($_tmpname,'../pending_elements/' . $_name);
        }
    }
}

?>