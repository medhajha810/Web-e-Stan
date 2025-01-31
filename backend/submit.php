<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

require 'PHPMailer-master/src/PHPMailer.php';
require 'PHPMailer-master/src/SMTP.php';
require 'PHPMailer-master/src/Exception.php';
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];
    $phone = $_POST['phone'] ?? 'Not provided';
    $purpose = $_POST['purpose'] ?? 'Not specified';
    $preferredContact = $_POST['preferredContact'] ?? 'Not specified';

    // Send email notification
    try {
        // ✅ Gmail SMTP Settings
        $mail = new PHPMailer(true);
        $mail->isSMTP(); 
        $mail->SMTPDebug = 0;
        $mail->Debugoutput = 'html';
        
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'medhajha810@gmail.com';
        $mail->Password = 'hhgb bgfw qyxp jzns';
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        // ✅ Email Content
        $mail->setFrom('medhajha810@gmail.com', 'Sips & Bits');
        $mail->addAddress('medhajhaa1@gmail.com');
        $mail->Subject = "New Form Submission";
        $mail->isHTML(false);
        $mail->Body ="Name: $name\n" .
            "Email: $email\n" .
            "Phone: $phone\n" .
            "Purpose: $purpose\n" .
            "Preferred Contact: $preferredContact\n" .
            "Message: $message\n" .
            "Submitted at: " . date('Y-m-d H:i:s');

        if($mail->send()){
            echo json_encode(['success' => true, 'message' => 'Form submitted successfully and notification sent!']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Form submitted but notification could not be sent!']);
        }
    } catch (Exception $e) {
        echo json_encode(['success' => false, 'message' => "Message could not be sent. Error: {$mail->ErrorInfo}"]);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}
?>
