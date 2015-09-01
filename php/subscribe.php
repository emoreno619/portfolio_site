<?php
// Your Account API & List ID
$api_key = ""; // YOUR-API-KEY-HERE
$list_id = ""; // YOUR-LIST-ID-HERE

// Check $recipient
if($recipient === '' || $list_id === '' ) {
	returnAndExitAjaxResponse(
		constructAjaxResponseArray(
			FALSE,
			'APIDATA_IS_NOT_SET',
			array('error_message'=> 'API KEY / LIST ID is not set. Please configure the script.')
		)
	);
}

 // Include PHP wrapper
include_once('Mailchimp.php');

$MailChimp = new MailChimp($api_key);

try {
	$result = $MailChimp->call('lists/subscribe', array(
	    'id'                => $list_id,
	    'email'             => array( 'email' => $_POST['email']),
	    'merge_vars'        => array('FNAME' => $_POST['fname']),
	    'double_optin'      => false,
	    'update_existing'   => false,
	    'replace_interests' => false,
	    'send_welcome'      => true,
	));
	returnAndExitAjaxResponse(
		constructAjaxResponseArray(
			TRUE
		)
	);
} catch (Exception $_e) {
	returnAndExitAjaxResponse(
		constructAjaxResponseArray(
			FALSE,
			'ERROR_AT_MAILCHIMP',
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