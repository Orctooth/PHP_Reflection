<?php
require __DIR__ . '/../vendor/autoload.php';
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();
$conn;

//remove before finishing
ini_set('display_errors', 'On');

function OpenCon()
{
    
 $dbhost = getenv('HTTP_HOST');
 $database = "php_reflection";
 $port = 3306;
 $dbuser = "Orctooth";
 $password = "HniN!szAV9aYfWn";
//  $db = "newscards_php_reflection";
 $conn = new PDO('mysql:'. "host=" .$dbhost. ";dbname=" . $database . ';port=' .$port, $dbuser, $password);
 $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
 return $conn;

}
