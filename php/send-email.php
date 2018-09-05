<?php
require 'php-mailer/PHPMailerAutoload.php';

$post = (! empty($_POST)) ? true : false;
$recaptcha = $_POST['g-recaptcha-response'];
$error = '';

if(! empty($recaptcha)):

    // Your Google Recaptcha secret key
    $secret = 'secret_key';

    // Verifiy recaptcha code validity
    $verifyResponse = file_get_contents('https://www.google.com/recaptcha/api/siteverify?secret='.$secret.'&response='.$recaptcha);
    $responseData = json_decode($verifyResponse);

    if($responseData->success):
        if($post):
            // POST variables
            $name = stripslashes($_POST['name']);
            $phone = stripslashes($_POST['phone']);
            $email = trim($_POST['email']);
            $phone = stripslashes($_POST['phone']);
            $website = stripslashes($_POST['website']);
            $message = stripslashes($_POST['message']);

            // Mail subject
            $subject = "New message from your website";

            // Mail body
            $body  = "You received an email from your website with the following data:<br><br>";
            $body .= '<table>';
            $body .= '<tbody>';
            $body .= '<tr><td>Name: </td><td><strong>'.$name.'</strong></td></tr>';
            $body .= '<tr><td>Email</td><td>'. $email .'</td></tr>';
            $body .= '<tr><td>Phone</td><td>'. $phone .'</td></tr>';
            $body .= '<tr><td>Website</td><td>'. $website .'</td></tr>';
            $body .= '<tr><td>Message</td><td>'. $message .'</td></tr>';
            $body .= '</tbody>';
            $body .= '</table>';

            // Add you server side validation here and use the $error variable in order to verify the input states
            // ...
            // End: Validaton

            // Sending mail function
            if(! $error):
                // Initiate PHP Mailer
                $mail = new PHPMailer;

                //$mail->SMTPDebug = 3;                                 // Enable verbose debug output

                // SMTP account settings
                $mail->isSMTP();                                        // Set mailer to use SMTP
                $mail->Host = 'smtp.mail.com';                          // Specify main and backup SMTP servers
                $mail->SMTPAuth = true;                                 // Enable SMTP authentication
                $mail->Username = 'Your Username';                      // SMTP username
                $mail->Password = 'Your SMTP Password';                 // SMTP password
                $mail->SMTPSecure = 'tls';                              // Enable TLS encryption, `ssl` also accepted
                $mail->Port = 2525;                                      // TCP port to connect to

                $mail->setFrom('office@example.com', 'Your Company Name');                  // From email address
                $mail->addAddress('name@example.com', 'Recipient Name');                    // Add a recipient
                $mail->addAddress('secondary@example.com', 'Secondary Recipient Name');     // Add another (optional) recipient
                $mail->addReplyTo($email, $name);                                           // Add a reply-to email address
                $mail->isHTML(true);                                                        // Set email format to HTML

                // Setting up mail
                $mail->Subject = $subject;
                $mail->Body    = $message;
                $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

                // Send mail and get response
                if(! $mail->send()) {
                    $status = array(
                        'status' => 'error',
                        'notify_title' => '',
                        'notify_message' => 'The message could not be sent! Please, try again.',
                        'notify_type' => 'danger'
                    );
                } else {
                    $status = array(
                        'status' => 'success',
                        'notify_title' => '',
                        'notify_message' => 'Your message was sent successfully!',
                        'notify_type' => 'success'
                    );
                }
            else:
                $status = array(
                    'status' => 'error',
                    'notify_title' => '',
                    'notify_message' => 'There are some errors in your form! Please verify and try again.',
                    'notify_type' => 'danger'
                );
            endif;
        endif;
    endif;
else:
    $status = array(
        'status' => 'recaptcha',
        'notify_title' => '',
        'notify_message' => 'The recaptcha field is required.',
        'notify_type' => 'danger'
    );
endif;

echo json_encode($status);

?>
