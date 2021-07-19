<?php
require __DIR__ . '/../vendor/autoload.php';
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();
$conn;

$session = new \Symfony\Component\HttpFoundation\Session\Session();
$session->start();

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

function display_errors(){
    global $session;
    if(!$session->getFlashBag()->has('error')){
        return;
    }
    $messages = $session->getFlashBag()->get('error');
    $response = '<div class="alert alert-danger alert-dismissable">';
    foreach($messages as $message){
        $response .= "{$message}<br />";
    }
    $response .= '</div>';

    return $response;
}
