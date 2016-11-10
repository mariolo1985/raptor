<?php

if (isset($_POST['SetId'])){
    include "filehelper.php";

    $setid = $_POST['SetId'];
    $comments = $_POST['Comments'];

    $_fileHelper = new FileHelper();
    $result = $_fileHelper->putCheckInComments($setid,$comments);
    echo $result ? 'TRUE': 'FALSE';
}


?>