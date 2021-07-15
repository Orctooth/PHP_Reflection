<?php

$conn;

//remove before finishing
ini_set('display_errors', 'On');

function OpenCon()
{
    
 $dbhost = "localhost";
 $database = "php_reflection";
 $port = "127.0.0.1";
 $dbuser = "Orctooth";
 $password = null;
//  $db = "newscards_php_reflection";
 $conn = new PDO('sqlite:'.$database . ":host=" .$dbhost . ';port=' .$port, $dbuser, $password);
 $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
 return $conn;

}

function writeTag(){
    
}


