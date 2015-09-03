<?php	
	// Your Email
	$recipient = ""; // PLEASE SET YOUR EMAIL ADDRESS
	
	// Check $recipient
	if($recipient === '') {
		returnAndExitAjaxResponse(
			constructAjaxResponseArray(
				FALSE,
				'RECIPIENT_IS_NOT_SET',
				array('error_message'=> 'RECIPIENT email address is not set. Please configure the script.')
			)
		);
	}

	// Check for empty required field
	if(!isset($_POST["email"]) || !isset($_POST["fname"]) || !isset($_POST["message"])) {
		returnAndExitAjaxResponse(
			constructAjaxResponseArray(
				FALSE,
				'MISSING_REQUIRED_FIELDS',
				array('error_message'=> 'MISSING_REQUIRED_FIELDS should not be occurred.')
			)
		);
	}

	// Sanitize input
	$fname	= filter_var($_POST["fname"], FILTER_SANITIZE_STRING);
	$lname	= filter_var($_POST["lname"], FILTER_SANITIZE_EMAIL);
	$website = $_POST["website"];
	if (!preg_match("~^(?:f|ht)tps?://~i", $website)) $website = "http://" . $website;
	$website = filter_var($website, FILTER_VALIDATE_URL);
	$email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
	$message = filter_var($_POST["message"], FILTER_SANITIZE_STRING);

	// If non required fields are empty
	if ( empty($lname) ){
		$lname = "No last name entered.";
	}
	if ( empty($website) ){
		$website = "No website entered.";
	}

	// Headers
	$headers = 'From: '.$fname.' <'.$email.'>' . "\r\n";
	$headers .= 'Reply-To: '.$email.'' . "\r\n";
	$headers .= 'X-Mailer: PHP/' . phpversion();

	// Subject
	$subject = "New email from contact form";

	// Build Message
	$email_content = "First Name: $fname\n";
	$email_content .= "Last Name: $lname\n";
	$email_content .= "Website: $website\n";
	$email_content .= "Email: $email\n\n";
	$email_content .= "Message:\n$message\n\n\n";
	$email_content .= "CLIENT IP:\n".get_client_ip()."\n";
	$email_content .= "HOST IP:\n".$_SERVER['SERVER_ADDR']."\n";

// Check if sent
try {
	$sendmailResult = mail($recipient, $subject, $email_content, $headers);
	if( $sendmailResult === TRUE ) {
		returnAndExitAjaxResponse(
			constructAjaxResponseArray(
				TRUE
			)
		);
	} else {
		returnAndExitAjaxResponse(
			constructAjaxResponseArray(
				FALSE,
				'ERROR_AT_PHPMAIL',
				array('error_information'=> error_get_last() )
			)
		);
	}
} catch (Exception $_e) {
	returnAndExitAjaxResponse(
		constructAjaxResponseArray(
			TRUE,
			'ERROR_AT_PHPMAIL',
			array('error_message'=> $_e->getMessage())
		)
	);
}

/*
	Construct ajax response array
	Input: Result (bool), Message (optional), Data to be sent back in array
*/
function constructAjaxResponseArray ($_response, $_message = '', $_json = null) {
	$_responseArray = array();
	$_response = ( $_response === TRUE ) ? TRUE : FALSE;
	$_responseArray['response'] = $_response;
	if(isset($_message)) $_responseArray['message'] = $_message;
	if(isset($_json)) $_responseArray['json'] = $_json;

	return $_responseArray;
}
/*
	Returns in the Gframe ajax format.
	Input: data array processed by constructAjaxResponseArray ()
	Outputs as a html stream then exits.
*/
function returnAndExitAjaxResponse ($_ajaxResponse) {
	if(!$_ajaxResponse){
		$_ajaxResponse = array('response'=>false,'message'=>'Unknown error occurred.');
	}
	header("Content-Type: application/json; charset=utf-8");
	echo json_encode($_ajaxResponse);
	die();
}


// Function to get the client IP address
function get_client_ip() {
    $ipaddress = '';
    if (isset($_SERVER['HTTP_CLIENT_IP'])) {
        $ipaddress = $_SERVER['HTTP_CLIENT_IP'];
    } else if(isset($_SERVER['HTTP_X_FORWARDED_FOR'])) {
        $ipaddress = $_SERVER['HTTP_X_FORWARDED_FOR'];
    } else if(isset($_SERVER['HTTP_X_FORWARDED'])) {
        $ipaddress = $_SERVER['HTTP_X_FORWARDED'];
    } else if(isset($_SERVER['HTTP_FORWARDED_FOR'])) {
        $ipaddress = $_SERVER['HTTP_FORWARDED_FOR'];
    } else if(isset($_SERVER['HTTP_FORWARDED'])) {
        $ipaddress = $_SERVER['HTTP_FORWARDED'];
    } else if(isset($_SERVER['REMOTE_ADDR'])) {
        $ipaddress = $_SERVER['REMOTE_ADDR'];
    } else {
        $ipaddress = 'UNKNOWN';
    }
    return $ipaddress;
}