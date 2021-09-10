<?php
session_start();
include "../conndb.php";
error_reporting(E_ERROR | E_PARSE); 

$fullname= $_POST['pfullname'];
$email   = $_POST['pemail'];
$avatar  = $_POST['pavatar'];
$pass    = $_POST['ppass'];
$token   = $_POST['ptoken'];
$action  = $_POST['paction'];
$go      = false;

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
  $result1 = null;

  if ($_SERVER['REQUEST_METHOD'] == 'POST')
  {
    $con1 = AbrirDB();

    if ($action=='sGog'){  
      $result1 = mysqli_query($con1, "call paccess('".strtoupper($fullname)."','".strtoupper($email)."','$avatar','',1,1)");
    
      if (mysqli_error($con1)){
        header("HTTP/1.1 500 INTERNAL SERVER ERROR");
        echo json_encode('INTERNAL SERVER ERROR');
      }else{
        $data1 = mysqli_fetch_assoc($result1);
        header("HTTP/1.1 200 OK"); /*si ejecutó hasta acá, siempre es OK*/

        if (isset($data1)){   
          $_SESSION["sSESS"]  =$data1['id'];
          $_SESSION["sFULL"]  =$data1['fullname'];
          $_SESSION["sAVATAR"]=$data1['avatar'];
          $_SESSION["sPROFILE"]=$data1['profile'];

          $arr = array('res' => 'OK');
          echo json_encode($arr);
        }else{
          $arr = array('res' => 'NO');
          echo json_encode($arr);
        }
      }
    }
    
    if ($action=='sReg'){  
      $result1 = mysqli_query($con1, "call paccess('".strtoupper($fullname)."','".strtoupper($email)."','$avatar','".Enc($pass,"13473C")."',0,0)");
    
      if (mysqli_error($con1)){
        header("HTTP/1.1 500 INTERNAL SERVER ERROR");
        echo json_encode('INTERNAL SERVER ERROR');
      }else{
        $data1 = mysqli_fetch_assoc($result1);

        if (isset($data1)){
          header("HTTP/1.1 200 OK");
          if (SendMailReg($email,$fullname)){
            $arr = array('res' => 'OK');
          }else{
            $arr = array('res' => 'NO');
          }
          echo json_encode($arr);
        }else{
          header("HTTP/1.1 404 NOT FOUND");
          echo json_encode("SIN RESULTADOS");
        }
      }
    }

    if ($action=='vSend'){  
      header("HTTP/1.1 200 OK");
      if (SendMailForgot($email)){
        $arr = array('res' => 'OK');
      }else{
        $arr = array('res' => 'NO');
      }
      echo json_encode($arr);
    }

    if ($action=='vLog'){  
      $result1 = mysqli_query($con1, "call paccesslog('".strtoupper($email)."','".Enc($pass,"13473C")."')");
    
      if (mysqli_error($con1)){
        header("HTTP/1.1 500 INTERNAL SERVER ERROR");
        echo json_encode('INTERNAL SERVER ERROR');
      }else{
        $data1 = mysqli_fetch_assoc($result1);
        
        header("HTTP/1.1 200 OK");

        if (isset($data1)){
          $_SESSION["sSESS"]  =$data1['id'];
          $_SESSION["sFULL"]  =$data1['fullname'];
          $_SESSION["sAVATAR"]=$data1['avatar'];
          $_SESSION["sPROFILE"]=$data1['profile'];

          $arr = array('res' => 'OK');
          echo json_encode($arr);
        }else{
          $arr = array('res' => 'NO');
          echo json_encode($arr);
        }
      }
    }

    if ($action=='vMail'){  
      $result1 = mysqli_query($con1, "select fverifymail('$email') as res");
    
      if (mysqli_error($con1)){
        header("HTTP/1.1 500 INTERNAL SERVER ERROR");
        echo json_encode('INTERNAL SERVER ERROR');
      }else{
        $data1 = mysqli_fetch_assoc($result1);

        if (isset($data1)){
          header("HTTP/1.1 200 OK");
          echo json_encode($data1);
        }else{
          header("HTTP/1.1 200 OK");
          echo json_encode("SIN RESULTADOS");
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
  //En caso de que ninguna de las opciones anteriores se haya ejecutado
  header("HTTP/1.1 401 UNAUTHORIZED");
}

?>