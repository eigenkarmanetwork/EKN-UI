<?php

$json = file_get_contents("php://input");
$data = json_decode($json, true);

$data["service_name"] = "ETN";
$data["service_key"] = getenv("ETN_SERVICE_KEY");

$postdata = json_encode($data);
$ch = curl_init("http://www.eigentrust.net:31415/vote");
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $postdata);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, array("Content-type: application/json"));
$result = curl_exec($ch);
http_response_code(curl_getinfo($ch, CURLINFO_RESPONSE_CODE));
curl_close($ch);

echo $result;

?>
