<?php
include("func/funcs.php");
error_reporting(E_ERROR | E_WARNING | E_PARSE); 

function AbrirDB() 
{       
  /*Dev*/ $aux_c=mysqli_connect("localhost","lz0",Dec("qJ+nmamjtZqWmWdk","13473C"),"l4zar0");
  //Prod  $aux_c=mysqli_connect("localhost","u760273147_lz0",Dec("hbHR2dvj052Yc6E=","popote47C"),"u760273147_l4zar0");
  
  $aux_c->set_charset("utf8");
  
  return $aux_c; 
}

function CerrarDB($con) 
{ 
    mysqli_close($con);
}


?> 