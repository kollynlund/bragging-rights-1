<?
$client_id = "7ec855512bdc532";

$photos = '';
for ($i = 0; $i < count($_FILES); $i++) {
	$img = $_FILES["photo-upload-".($i+1)]);
	if ($img['tmp_name'] == ''){continue;}
	else {
		$photo = $img['tmp_name'];
		$handle = fopen($photo, "r");
		$data = fread($handle, filesize($filename));
		$pvars = array('image' => base64_encode($data));
		$timeout = 30;
		$curl = curl_init();
		curl_setopt($curl, CURLOPT_URL, 'https://api.imgur.com/3/image.json');
		curl_setopt($curl, CURLOPT_TIMEOUT, $timeout);
		curl_setopt($curl, CURLOPT_HTTPHEADER, array('Authorization: Client-ID ' . $client_id));
		curl_setopt($curl, CURLOPT_POST, 1);
		curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($curl, CURLOPT_POSTFIELDS, $pvars);
		$out = curl_exec($curl);
		curl_close($curl);
		$pms = json_decode($out,true);
		$url = $pms['data']['link'];
		$photos .= $url.',';
	}
}
$photos = rtrim($photos, ',');

$new_event[] = array('Name'=>$_POST['name-input'], 'Discipline'=>$_POST['discipline-input'], 'City'=>$_POST['city-input'].', '.$_POST['state-input'], 'Country'=>$_POST['country-input'], 'Longitude'=>$_POST['long'], 'Trick'=> $_POST['trick-input'], 'Latitude'=>$_POST['lat'], 'Video'=>$_POST['video-input'], 'Pictures'=>$photos, 'Date'=>$_POST['month-input'].' '.$_POST['day-input'].', '.$_POST['year-input'], 'Additional Information'=>$_POST['details-input']);

$events_file = file_get_contents('test_events.json');

$events_file = substr($events_file, 0, -2);

$new_data = substr(json_encode($new_event),1,-1);

$with_added_event = $events_file.','.$new_data."]}";

file_put_contents("test_events.json", $with_added_event);

print_r($_FILES);




/*
$data[] = $_POST['data'];
file_put_contents('results.json', json_encode($data);
>>>>>>> Stashed changes

/*


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
*/

?>