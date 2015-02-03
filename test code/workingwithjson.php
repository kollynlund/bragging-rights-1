<?php
/*
$json = file_get_contents('test_events.json');

$json = substr($json, 0, -2);

$new_data = json_encode();

$with_added_event = $json.','.$new_data."]}";

file_put_contents("test_events.json", $with_added_event);
*/


$client_id = "7ec855512bdc532";
$img=$_FILES['fileToUpload'];

if($img['name']==''){  
	echo "<h2>An Image Please.</h2>";
	}else{
	$filename = $img['tmp_name'];
	$handle = fopen($filename, "r");
	$data = fread($handle, filesize($filename));
	$pvars   = array('image' => base64_encode($data));
	$timeout = 30;
	$curl = curl_init();
	curl_setopt($curl, CURLOPT_URL, 'https://api.imgur.com/3/image.json');
	curl_setopt($curl, CURLOPT_TIMEOUT, $timeout);
	curl_setopt($curl, CURLOPT_HTTPHEADER, array('Authorization: Client-ID ' . $client_id));
	curl_setopt($curl, CURLOPT_POST, 1);
	curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($curl, CURLOPT_POSTFIELDS, $pvars);
	$out = curl_exec($curl);
	curl_close ($curl);
	$pms = json_decode($out,true);
	$url=$pms['data']['link'];
	if($url!=""){
	echo $url;
	echo "<img src='$url'/>";
	}else{
	echo "<h2>There's a Problem</h2>";
	echo $pms['data']['error'];  
	} 
}





?>