<?php 
$_SESSION["BaseUrl"]="https://www.dulcerocio.com.ar";
error_reporting(E_ERROR | E_PARSE); 

function Enc($string, $key) {
   $result = '';
   for($i=0; $i<strlen($string); $i++) {
      $char = substr($string, $i, 1);
      $keychar = substr($key, ($i % strlen($key))-1, 1);
      $char = chr(ord($char)+ord($keychar));
      $result.=$char;
   }
   return base64_encode($result);
}

function Dec($string, $key) {
   $result = '';
   $string = base64_decode($string);
   for($i=0; $i<strlen($string); $i++) {
      $char = substr($string, $i, 1);
      $keychar = substr($key, ($i % strlen($key))-1, 1);
      $char = chr(ord($char)-ord($keychar));
      $result.=$char;
   }
   return $result;
}

function SendMailReg($mail,$nombre){
   try {
      $urlBase=$_SESSION["BaseUrl"];
      $subject = "Hola $nombre - Bienvenido!";
      
      $message = "
      <head>
      </head>    
      <body marginheight=0 marginwidth=0 topmargin=0 leftmargin=0 !important; margin: 0; padding: 0;>    
      <center><br><br> 
      <div style='background-color:#8957FC;border-radius: 10px;width: 600px;border: 1px solid #8957FC'>
      <table style='background-color:#8957FC;border-radius: 10px;width: 600px;' cellspacing='1' cellpadding='0' border='0' >
      <tr>
         <td width='600px' valign='top' align='center'>     
         <span style='font-size: 12px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; line-height: 150%;'>DULCE </span><span style='font-size: 12px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; line-height: 150%;'><strong>ROCÍO</strong></span>
         </td>
      </tr>
      <tr style='border-radius: 10px;background-color:#ffffff;' ;>
         <td>
         <table width='100%' cellspacing='0' cellpadding='0' border='0'>
         <tr >
            <td align='center' style='border-collapse: collapse; padding: 10px;width: 150px;'>
            <img src='$urlBase/img/ext/dr_ne.png' style='max-width: 70px; display: block; width: 70px;' alt='' border='0'>
            </td>
            <td align='center'>
            <div><span style='font-size: 16px; font-family: Helvetica, Arial, sans-serif; color: #1e1e1e; line-height: 150%;'><strong>$nombre</strong></span></div>
            <div><span style='font-size: 14px; font-family: Helvetica, Arial, sans-serif; color: #929292; line-height: 150%;text-decoration:none;'>$mail</span></div>
            </td>
         </tr>
         </table>
         </td>
      </tr>  
      <tr style='background-color:#ffffff;border-top: 1px solid'>
         <td >
         </td>
      </tr>
      <tr style='background-color:#ffffff;border-radius: 10px;' >
         <td style='border-bottom-right-radius: 10px;border-bottom-left-radius: 10px;'>
            <table  cellspacing='0' cellpadding='0' border='0'  style='float: left;' width='250' align='left'>
            <tr>
            <td style='padding: 20px 0px 20px 20px; font-family: Arial, Helvetica, sans-serif; font-weight: normal; font-size: 14px; color: rgb(56, 56, 56); text-align: left;' valign='top' align='left' ><div style='line-height: 150%;'>
               <p style='font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: #1e1e1e; line-height: 150%;'><strong>Gracias por elegirnos</strong></p>
               <p style='font-size: 25px; font-family: Helvetica, Arial, sans-serif; color: #5B4EF7; line-height: 150%;'><em><strong>ADELANTE!</strong></em></p>
               <p style='font-size: 14px; font-family: Helvetica, Arial, sans-serif; color: #929292; line-height: 150%;'><strong>Sólo queda comenzar...</strong></p>    
               <table cellspacing='0' cellpadding='0' border='0'  align='left' style='margen-top:20px;border-collapse: separate;'>
               <tr><td style='border-radius: 20px; border: 0px none transparent; text-align: center; font-family: Arial, Helvetica, sans-serif; font-size: 14px; padding: 10px 40px; font-weight: bold; background-color: #5B4EF7;' ><span style='font-family: Helvetica, Arial, sans-serif; font-size: 14px; color: rgb(255, 255, 255);'>    
               <a style='color:#FFFFFF;text-decoration:none;' target='_blank' href='$urlBase/ext/vmail.php?pmail=$mail'>Valida tu registro</a></span>
               </td></tr>    
               </table>    
            </td>
            </tr>    
            </table> 
            <table cellspacing='0' cellpadding='0' border='0'  style='float: left; align='left' dimension='30%' >
            <tr>
            <td name='bmeImgHolder' style='padding:20px;' align='left' valign='top' >
               <img src='$urlBase/img/ext/send_mail.png' style='width: 250px; display: block;' alt='' border='0'>
            </td>
            </tr>    
            </table>
         </td>
      </tr>  
      </table>
      </div>
      </center>
      </body>    
      </html>  
      ";

      $headers  = "MIME-Version: 1.0" . "\r\n";
      $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
      $headers .= 'From: "Confirmación de Registro Dulce Rocío"<registro@dulcerocio.com.ar>' . "\r\n";

      mail($mail,$subject,$message,$headers);
      return true; 
   } catch (Exception $e) {
      return false;
  }
}

function SendMailForgot($mail){
   try {
      $urlBase=$_SESSION["BaseUrl"];
      $subject = "Hola! Te acercamos la forma de recuperar tu acceso";
      
      $message = "
      <head>
      </head>    
      <body marginheight=0 marginwidth=0 topmargin=0 leftmargin=0 !important; margin: 0; padding: 0;>    
      <center><br><br> 
      <div style='background-color:#8957FC;border-radius: 10px;width: 600px;border: 1px solid #8957FC'>
      <table style='background-color:#8957FC;border-radius: 10px;width: 600px;' cellspacing='1' cellpadding='0' border='0' >
      <tr>
         <td width='600px' valign='top' align='center'>     
         <span style='font-size: 12px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; line-height: 150%;'>DULCE </span><span style='font-size: 12px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; line-height: 150%;'><strong>ROCÍO</strong></span>
         </td>
      </tr>
      <tr style='border-radius: 10px;background-color:#ffffff;' ;>
         <td>
         <table width='100%' cellspacing='0' cellpadding='0' border='0'>
         <tr >
            <td align='center' style='border-collapse: collapse; padding: 10px;width: 150px;'>
            <img src='$urlBase/img/ext/dr_ne.png' style='max-width: 70px; display: block; width: 70px;' alt='' border='0'>
            </td>
            <td align='center'>
            <div><span style='font-size: 16px; font-family: Helvetica, Arial, sans-serif; color: #1e1e1e; line-height: 150%;'><strong>NOS ALEGRA QUE VUELVAS</strong></span></div>
            <div><span style='font-size: 14px; font-family: Helvetica, Arial, sans-serif; color: #929292; line-height: 150%;text-decoration:none;'>$mail</span></div>
            </td>
         </tr>
         </table>
         </td>
      </tr>  
      <tr style='background-color:#ffffff;border-top: 1px solid'>
         <td >
         </td>
      </tr>
      <tr style='background-color:#ffffff;border-radius: 10px;' >
         <td style='border-bottom-right-radius: 10px;border-bottom-left-radius: 10px;'>
            <table  cellspacing='0' cellpadding='0' border='0'  style='float: left;' width='250' align='left'>
            <tr>
            <td style='padding: 20px 0px 20px 20px; font-family: Arial, Helvetica, sans-serif; font-weight: normal; font-size: 14px; color: rgb(56, 56, 56); text-align: left;' valign='top' align='left' ><div style='line-height: 150%;'>
               <p style='font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: #1e1e1e; line-height: 150%;'><strong>Estas a un paso</strong></p>
               <p style='font-size: 25px; font-family: Helvetica, Arial, sans-serif; color: #5B4EF7; line-height: 150%;'><em><strong>CONTINUEMOS!</strong></em></p>
               <p style='font-size: 14px; font-family: Helvetica, Arial, sans-serif; color: #929292; line-height: 150%;'><strong>Te estamos esperando...</strong></p>    
               <table cellspacing='0' cellpadding='0' border='0'  align='left' style='margen-top:20px;border-collapse: separate;'>
               <tr><td style='border-radius: 20px; border: 0px none transparent; text-align: center; font-family: Arial, Helvetica, sans-serif; font-size: 14px; padding: 10px 40px; font-weight: bold; background-color: #5B4EF7;' ><span style='font-family: Helvetica, Arial, sans-serif; font-size: 14px; color: rgb(255, 255, 255);'>    
               <a style='color:#FFFFFF;text-decoration:none;' target='_blank' href='$urlBase/ext/vsend.php?pmail=$mail'>Recupera tu Acceso</a></span>
               </td></tr>    
               </table>    
            </td>
            </tr>    
            </table> 
            <table cellspacing='0' cellpadding='0' border='0'  style='float: left; align='left' dimension='30%' >
            <tr>
            <td name='bmeImgHolder' style='padding:20px;' align='left' valign='top' >
               <img src='$urlBase/img/ext/secure.png' style='width: 250px; display: block;' alt='' border='0'>
            </td>
            </tr>    
            </table>
         </td>
      </tr>  
      </table>
      </div>
      </center>
      </body>    
      </html>  
      ";

      $headers  = "MIME-Version: 1.0" . "\r\n";
      $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
      $headers .= 'From: "Recuperación de acceso Dulce Rocío"<recupero@dulcerocio.com.ar>' . "\r\n";

      mail($mail,$subject,$message,$headers);
      return true; 
   } catch (Exception $e) {
      return false;
  }
}

?>
