<!DOCTYPE html>
<head lang="es">
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <link rel="SHORTCUT ICON" href="../img/ext/dr_ne.png">
  <title>Cambio de Clave</title>
  <link href="../vendor/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css">
  <link href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i" rel="stylesheet">
  <link href="../css/sb-admin-2.css" rel="stylesheet"> 
</head>
<body class='text-center'>

<div id="content-wrapper" class="w-50 pt-5 d-inline-flex flex-column">
<div class="container-fluid">
  <div class='card shadow mb-4'>
	<div class='card-header py-3'>
	  <h6 id='email' id="email" class='m-0 font-weight-bold text-primary'><?php echo $_GET['pmail'] ?></h6>
	</div>
	<div class='card-body'>
	  <div class='text-center'>
		<img class='img-fluid px-3 px-sm-4 mt-3 mb-4' style='width: 20rem;' src='../img/ext/forgot.png' alt=''>
	  </div>
      
      <form class="user">
        <div class="form-group row">
            <div id="inP" class="col-sm-6 mb-3 mb-sm-0">
              <input type="password" class="form-control form-control-user" id="regInputPassword" onblur="validarPass(this);" placeholder="Contraseña: 2 Núm, 2 Mayús, 1 !@#$&*">
              <span class="eyes btn-warning" onclick="Showme('inP');"><i class="fa fa-eye-slash"></i></span>
            </div>
            <div id="reP" class="col-sm-6">
              <input type="password" class="form-control form-control-user" id="regRepeatPassword" onblur="validarRepass(this);" placeholder="Confirme: 2 Núm, 2 Mayús, 1 !@#$&*">
              <span class="eyes btn-warning" onclick="Showme('reP');"><i class="fa fa-eye-slash"></i></span>
            </div>
        </div>
        <div class="progress progress-sm mb-2">
            <div class="progress-bar bg-primary" role="progressbar" style="width:0%" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
        <button type="button" id="myFor" class="btn btn-primary btn-user btn-block">Enviar</button>
        <p id='linkdr' class='font-weight-bold pt-3'></p>
    </form><br/>
    <div id="alertMsg" class="alert alert-warning" role="alert" >
        <h5 class="alert-heading">Atencion: <small id="msjAlert"></small></h5>
    </div>

     <div class='sidebar-brand-icon rotate-n-15'>
            <br/>
            <img src='../img/ext/dr_ne.png' alt='Dulce Rocío' width='150' >
     </div>
	  
	</div>
  </div>
</div>
</div>
	
<script src="../vendor/jquery/jquery.min.js"></script>
<script src="../vendor/bootstrap/js/bootstrap.bundle.min.js"></script> 
<script src="../vendor/jquery-easing/jquery.easing.min.js"></script>
<script src="js/md5-min.js"></script>
<script src="https://www.google.com/recaptcha/api.js?render=6Lda6qgZAAAAALn9v-hwpZoxT13r039X2ON36H10"></script>
<script src="js/vsend.js"></script>

</body>
</html>