<?php
include 'connection.php';

//connect to db
$conn = OpenCon();
global $success;
//grab time stamp
$timestamp = date('Y-m-d H:i:s');
$name = $email = $phone = $subject = $message = "";

//filter inputs
if ($_SERVER["REQUEST_METHOD"] == "POST") {
$name = test_input($_POST["name"]);
$email = test_input($_POST["email"]);
$phone = test_input($_POST["phone"]);
$subject = test_input($_POST["subject"]);
$message = test_input($_POST["message"]);
}

function test_input($data) {
$data = trim($data);
$data = stripslashes($data);
$data = htmlspecialchars($data);
return $data;
}


//test for user errors

if(empty($name)){
    $session->getFlashBag()->add('error', 'Please enter your name');
    header('Location: /HTML-and-CSS-Reflection/html/contact.php');
    exit();
}
if(empty($email)){
    $session->getFlashBag()->add('error', 'Please enter your email');
    header('Location:/HTML-and-CSS-Reflection/html/contact.php');
    exit();
}
if(empty($phone)){
    $session->getFlashBag()->add('error', 'Please enter your phone number');
    header('Location:/HTML-and-CSS-Reflection/html/contact.php');
    exit();
}

if(empty($subject)){
    $session->getFlashBag()->add('error', 'Please enter a message subject');
    header('Location:/HTML-and-CSS-Reflection/html/contact.php');
    exit();
}

if(empty($message)){
    $session->getFlashBag()->add('error', 'Please enter your message to us');
    header('Location:/HTML-and-CSS-Reflection/html/contact.php');
    exit();
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $session->getFlashBag()->add('error', 'Invalid email');
    header('Location:/HTML-and-CSS-Reflection/html/contact.php');
    exit();
}
if(!filter_var($phone, FILTER_VALIDATE_INT)){
    $session->getFlashBag()->add('error', 'Invalid phone number');
    header('Location:/HTML-and-CSS-Reflection/html/contact.php');
    exit();
}



//attempt insertion
try{
    $query = $conn->query("INSERT INTO enquiries (`name`, `email`, `telephone`, `subject`, `message`, `time_stamp`) VALUES ('$name', '$email', '$phone', '$subject', '$message', '$timestamp')");
    if($query){
        $session->getFlashBag()->add("success", "Submission successful! We'll process your enquiry within 2 working days.");
        header('Location:/HTML-and-CSS-Reflection/html/contact.php');
    }
}catch(Exception $e){
    throw $e;
}

?>