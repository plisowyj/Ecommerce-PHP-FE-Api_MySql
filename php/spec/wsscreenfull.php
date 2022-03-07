<?php
session_start();
include "../conndb.php";
error_reporting(E_ERROR | E_PARSE); 

$id     = $_POST['pid'];
$token  = $_POST['ptoken'];
$action = $_POST['paction'];
$go = false;

if (isset($token)&&isset($action)){
  define("RECAPTCHA_V3_SECRET_KEY", '6LeawrYeAAAAALX5Icqx-bLOqPCufBo_0EScOGn9');

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
  $result1 = null;

  if ($_SERVER['REQUEST_METHOD'] == 'POST')
  {
    $con1 = AbrirDB();

    if ($action=='gUsr'){  
      $result1 = mysqli_query($con1, "call pusersget($id)");
    
      if (mysqli_error($con1)){
        header("HTTP/1.1 500 INTERNAL SERVER ERROR");
        echo json_encode('INTERNAL SERVER ERROR');
      }else{
        header("HTTP/1.1 200 OK");

        $row = mysqli_num_rows($result1);

        while ($data1 = mysqli_fetch_assoc($result1)){
            $arreglo["data"][]=$data1;
        }
        
        if ($row==0){
            echo '{ "data": [] }';
        }else{
            echo json_encode($arreglo);
        }
      }
    }
    mysqli_free_result($result1);
    CerrarDB($con1);
    exit();
  }

  //En caso de que ninguna de las opciones anteriores se haya ejecutado
  header("HTTP/1.1 400 BAD REQUEST");

}else{
  header("HTTP/1.1 401 UNAUTHORIZED");
}

?>