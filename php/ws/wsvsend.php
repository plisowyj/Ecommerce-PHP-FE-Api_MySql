<?php
include "../conndb.php";
error_reporting(E_ERROR | E_PARSE); 

$mail  = strtoupper($_POST['pmail']);
$pass  = $_POST['ppass'];
$token = $_POST['ptoken'];
$action= $_POST['paction'];
$go    = false;

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
    $con1 = AbrirDB();

    $result1 = mysqli_query($con1, "call psendpass('".strtoupper($mail)."','".Enc($pass,"13473C")."')");

    if (mysqli_error($con1)){
        header("HTTP/1.1 500 INTERNAL SERVER ERROR");
        echo json_encode('INTERNAL SERVER ERROR');
    }else{
        $data1 = mysqli_fetch_assoc($result1);
        header("HTTP/1.1 200 OK");

        if (isset($data1)){
            $arr = array('res' => 'OK');
            echo json_encode($arr);
        }else{
            $arr = array('res' => 'NO');
            echo json_encode($arr);
        }
    }
    if (isset($result1)){
        mysqli_free_result($result1);
    }
    CerrarDB($con1);
}else{
    //En caso de que ninguna de las opciones anteriores se haya ejecutado
    header("HTTP/1.1 401 UNAUTHORIZED");
}
?>