<!DOCTYPE html>
<html lang="en">
    <head>
    <title>Netmatters | Full Service Digital Agency | Norwich, Norfolk | Netmatters</title>
        <link rel="stylesheet" href="../css/styles.css">
        <link rel="stylesheet" href="../css/contact.css">
        <link rel="stylesheet" href="../css/slick.css">
        <link rel="stylesheet" href="../css/slick-theme.css">
        <link rel="stylesheet" href="../css/mmenu.css">
        <link rel="stylesheet" href="../css/mmenu-followup.css">
        <link rel="preconnect" href="https://fonts.gstatic.com">
        <link href="https://fonts.googleapis.com/css2?family=Poppins&display=swap" rel="stylesheet">
        <link rel="icon" href="../img/netmatters-ltd.webp">
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=0">
        <script src="https://kit.fontawesome.com/466cf648a7.js" crossorigin="anonymous"></script>
        <script src ="../js/jquery.js"></script>
    </head>
    <body>
        <?php
        include 'connection.php';

        
        function submitEnquiry($name, $email, $phone, $subject, $message, $timestamp){
            try{
                $conn = OpenCon();
                $query = "INSERT INTO enquiries (`name`, `email`, `telephone`, `subject`, `message`, `time_stamp`) VALUES (`:name`, `:email`, `:phone`, `:subject`, `:message`, `:timestamp`)";
                $stmt = $conn->prepare($query);
                $stmt->bindParam(':name', $name);
                $stmt->bindParam(':email', $email);
                $stmt->bindParam(':phone', $phone);
                $stmt->bindParam(':subject', $subject);
                $stmt->bindParam(':message', $message);
                $stmt->bindParam(':timestamp', $timestamp);
                return $stmt->execute();
            }catch(Exception $e){
                throw $e;
            }
        }

        
        $conn = OpenCon();
        
        // $name =  $_REQUEST['name'];
        // $email = $_REQUEST['email'];
        // $phone =  $_REQUEST['phone'];
        // $subject = $_REQUEST['subject'];
        // $message = $_REQUEST['message'];
        $timestamp = date('Y-m-d H:i:s');
        $name = $email = $phone = $subject = $message = "";

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

        
        // $old_subs = $conn->query("DELETE * FROM enquiries WHERE DATEDIFF(NOW(), time_stamp)>3");
        // if($query){
        //     echo "<h3>Submission successful! We'll process your enquiry within 2 working days.</h3>";
        //     header('Location: /HTML-and-CSS-Reflection/index.php');
        //     exit();
        // }
        if(empty($name)){
            $session->getFlashBag()->add('error', 'Please enter your name');
            header('Location: /HTML-and-CSS-Reflection/html/contact.php');
        }
        if(empty($email)){
            $session->getFlashBag()->add('error', 'Please enter your email');
            header('Location:/HTML-and-CSS-Reflection/html/contact.php');
        }
        if(empty($phone)){
            $session->getFlashBag()->add('error', 'Please enter your phone number');
            header('Location:/HTML-and-CSS-Reflection/html/contact.php');
        }

        if(empty($subject)){
            $session->getFlashBag()->add('error', 'Please enter a message subject');
            header('Location:/HTML-and-CSS-Reflection/html/contact.php');
        }

        if(empty($message)){
            $session->getFlashBag()->add('error', 'Please enter your message to us');
            header('Location:/HTML-and-CSS-Reflection/html/contact.php');
        }
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $session->getFlashBag()->add('error', 'Invalid email');
            header('Location:/HTML-and-CSS-Reflection/html/contact.php');
        }
        
        



        $query = $conn->query("INSERT INTO enquiries (`name`, `email`, `telephone`, `subject`, `message`, `time_stamp`) VALUES ('$name', '$email', '$phone', '$subject', '$message', '$timestamp')");   
        ?>

        <?php include 'footer.php'; ?>
        
        <script src="//cdn.polyfill.io/v2/polyfill.min.js"></script>
        <!-- <script src="js/mhead-dist.js"></script> -->
        <script src="../js/mmenu-dist.js"></script>
        <script src="../js/mmenu.polyfills.js"></script>
        <script src="../js/Modernizr.js"></script>  
        <script src="../js/app-dist-contact.js"></script>

    </body>
</html>
