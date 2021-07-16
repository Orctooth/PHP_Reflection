<?php
    include 'connection.php';
    function submitEnquiry($name, $email, $phone, $subject, $message, $timestamp){
        try{
            $query = "INSERT INTO enquiries (`name`, `email`, `phone`, `subject`, `message`, `timestamp`) VALUES (`:name`, `:email`, `:phone`, `:subject`, `:message`, `:timestamp`)";
            $stmt = $db->prepare($query);
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
?>