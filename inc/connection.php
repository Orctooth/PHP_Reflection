<?php
require __DIR__ . '/../vendor/autoload.php';
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();
$conn;

//open a session
$session = new \Symfony\Component\HttpFoundation\Session\Session();
$session->start();

//remove before finishing
ini_set('display_errors', 'On');

function OpenCon()
{
    //load environment variables
 $dbhost = getenv('HTTP_HOST');
 $database = $_ENV['MY_DATABASE'];
 $port = getenv('MYSQL_TCP_PORT');
 $dbuser = $_ENV['MY_USER'];
 $password = $_ENV['MY_PASSWORD'];

    //create database object
 $conn = new PDO('mysql:'. "host=" .$dbhost. ";dbname=" . $database . ';port=' .$port, $dbuser, $password);
 $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
 return $conn;

}


//load error messages and display on screen
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

//load submission success confirmation
function display_notice(){
    global $session;
    if(!$session->getFlashBag()->has('success')){
        return;
    }
    $messages = $session->getFlashBag()->get('success');
    $response = '<div class="alert alert-notice alert-dismissable">';
    foreach($messages as $message){
        $response .= "{$message}<br />";
    }
    $response .= '</div>';

    return $response;
}
