<?php

$json = file_get_contents("php://input");
$data = json_decode($json, true);

$data["service_name"] = "ETN";
$data["service_key"] = getenv("ETN_SERVICE_KEY");

$postdata = json_encode($data);
$ch = curl_init("http://www.eigentrust.net:31415/get_vote_count");
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $postdata);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, array("Content-type: application/json"));
$result = curl_exec($ch);
curl_close($ch);

echo $result;

?>
