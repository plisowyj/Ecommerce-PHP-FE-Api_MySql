<?php
session_start();
include "../conndb.php";
error_reporting(E_ERROR | E_PARSE); 

$token = $_GET['ptoken'];
$action = $_GET['paction'];
$go = false;

if (isset($token)&&isset($action)){
  define("RECAPTCHA_V3_SECRET_KEY", '6Lda6qgZAAAAAJHLc3BLTxnFl02LO_OUVeIBSlUN');

  $ch = curl_init();
  curl_setopt($ch, CURLOPT_URL,"https://www.google.com/recaptcha/api/siteverify");
  curl_setopt($ch, CURLOPT_POST, 1);
  curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query(array('secret' => RECAPTCHA_V3_SECRET_KEY, 'response' => $token)));
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  $response = curl_exec($ch);
  curl_close($ch);
  $arrResponse = json_decode($response, true);
  
  if($arrResponse["success"] == '1' && $arrResponse["action"] == $action && $arrResponse["score"] >= 0.5) {
    $go = true;
  }
}

if ($go){

  if ($_SERVER['REQUEST_METHOD'] == 'GET')
  {
    header("HTTP/1.1 200 OK");
    if (isset($_SESSION["sSESS"])){
      $vSess = array('SESS' => $_SESSION["sSESS"], 'FULL' => $_SESSION["sFULL"], 'AVATAR' => $_SESSION["sAVATAR"], 'PROF' => $_SESSION["sPROFILE"]);
    }else {
      $vSess = array('SESS' => '');
    }
    echo json_encode($vSess);
  }

}else{
  header("HTTP/1.1 401 UNAUTHORIZED");
}

?>