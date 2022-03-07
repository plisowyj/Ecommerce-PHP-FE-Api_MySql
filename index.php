<?php
  header("Cache-Control: no-cache, must-revalidate"); 
  header("Expires: Sat, 1 Jul 2000 05:00:00 GMT"); 
?>
<!doctype html>
<html lang="es">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <link rel="SHORTCUT ICON" href="img/dr_ne.png">

    <link href="css/normalize.css" rel="stylesheet">
    <link href="vendor/datatables/dataTables.bootstrap4.min.css" rel="stylesheet">
    <link href="vendor/bootstrap/scss/bootstrap-datetimepicker.min.css" rel="stylesheet">
    <link href="css/sb-admin-2.css" rel="stylesheet">
    <link href="vendor/calendar/main.min.css" rel="stylesheet">
    <link href="js/bnotify/animate.min.css" rel="stylesheet">
    <link href="css/l4z4r0.css" rel="stylesheet">
    <link href="vendor/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css">
    <link href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i" rel="stylesheet">
  
    <title>Dulce Rocío</title>

  </head>
  <body id="page-top" onkeypress="enterKeyPressed(event);">
 
    <div id="wrapper">
      <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
        <a class="sidebar-brand d-flex align-items-center justify-content-center" href="index.php">
            <div class="sidebar-brand-icon rotate-n-15">
            <br/>
            <img src="img/dr_bl.png" alt="Dulce Rocío" width="70" >
            </div>
            <div class="sidebar-brand-text mx-3">Dulce Rocío</sup></div>
        </a><br/>
        <div class="text-center d-none d-md-inline">
            <button class="rounded-circle border-0" id="sidebarToggle"></button>
        </div>
        <hr class="sidebar-divider">
        <div id="accordionSidebarDIV"></div>
      </ul>

      <div id="content-wrapper" class="d-flex flex-column">
        <div id="content">
          <nav class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
            <button id="sidebarToggleTop" class="btn btn-link d-md-none rounded-circle mr-3">
              <i class="fa fa-bars"></i>
            </button>

            <form class="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
              <div class="input-group">
                <input type="text" class="form-control bg-light border-0 small" placeholder="Buscar..." aria-label="Search" aria-describedby="basic-addon2">
                <div class="input-group-append">
                  <button id="btn_finder" tabindex="0" class="btn btn-primary" type="button" data-container="body" data-toggle="popover" data-placement="bottom" data-content="Complete un criterio de búsqueda..." data-trigger="focus" title="ATENCIÓN:">
                    <i class="fas fa-search fa-sm"></i>
                  </button>
                </div>
              </div>
            </form>

            <ul class="navbar-nav ml-auto">
              <li class="nav-item dropdown no-arrow d-sm-none">
                <a class="nav-link dropdown-toggle" href="#" id="searchDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <i class="fas fa-search fa-fw text-gray-800"></i>
                </a>
                <div class="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in" aria-labelledby="searchDropdown">
                  <form class="form-inline mr-auto w-100 navbar-search">
                    <div class="input-group">
                      <input type="text" class="form-control bg-light border-0 small" placeholder="Buscar..." aria-label="Search" aria-describedby="basic-addon2">
                      <div class="input-group-append">
                        <button class="btn btn-primary" type="button">
                          <i class="fas fa-search fa-sm"></i>
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </li>

              <li id='heart' class="nav-item dropdown no-arrow mx-1 lzrhide">
                <a class="nav-link dropdown-toggle" href="#" id="alertsDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <i class="fa fa-heart fa-fw text-gray-800"></i>
                  <span class="badge badge-danger badge-counter"></span>
                </a>
                <div class="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="alertsDropdown">
                  <h6 class="dropdown-header">
                    Favoritos 
                  </h6>
                  <a class="dropdown-item text-center small text-gray-500" href="#">Ver todos...</a>
                </div>
              </li>
              <li id='bell' class="nav-item dropdown no-arrow mx-1 lzrhide">
                <a class="nav-link dropdown-toggle" href="#" id="alertsDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <i class="fas fa-bell fa-fw text-gray-800"></i>
                  <span class="badge badge-danger badge-counter"></span>
                </a>
                <div class="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="alertsDropdown">
                  <h6 class="dropdown-header">
                    Mensajes 
                  </h6>
                  <a class="dropdown-item text-center small text-gray-500" href="#">Ver todos...</a>
                </div>
              </li>

              <div class="topbar-divider d-none d-sm-block"></div>

              <li id="mAccess" class="nav-item dropdown no-arrow">
                <div class="spinner-grow text-primary mt-2" role="status"></div>
              </li>
            </ul>
          </nav>

          <div class="container-fluid">
            <div class="d-sm-flex align-items-center justify-content-between mb-4">
              <h1 id="title01" class="h3 mb-0 text-gray-800">Lo que conocíamos... Pero mas rico!</h1>
            </div>
            <div id="contentpageDIV"></div>
          </div>
        </div>

        <footer class="sticky-footer bg-white">
          <div class="container my-auto">
            <div class="copyright text-center my-auto">
              <span> &copy; L4 Zar° 2021</span>
            </div>
          </div>
        </footer>
      </div>
    </div>

    <a class="scroll-to-top rounded" href="#page-top">
      <i class="fas fa-angle-up"></i>
    </a>
    <div class="modal fade" id="usermodal" tabindex="-1" role="dialog" aria-labelledby="usertitle" aria-hidden="true">
      <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header alert alert-info">
            <h5 class="modal-title" id="usertitle"></h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div id="userbody" class="modal-body">
          </div>
        </div>
      </div>
    </div>
    
    <div id="preloader">
    <div id="loader"></div>
    
    <script src="vendor/jquery/jquery.min.js"></script>
    <script src="vendor/bootstrap/js/bootstrap.bundle.min.js"></script> 
    <script src="vendor/jquery-easing/jquery.easing.min.js"></script>
    <script src="js/popper.min.js"></script>
    <script src="js/sb-admin-2.js"></script>
    <script src="vendor/datatables/jquery.dataTables.min.js"></script>
    <script src="vendor/datatables/dataTables.bootstrap4.min.js"></script>
    <script src="vendor/datatables/moment.min.js"></script>
    <script src="js/md5-min.js"></script>
    <script src="js/bnotify/bootstrap-notify.min.js"></script>
    <script src="vendor/calendar/main.min.js"></script>
    <script src="vendor/calendar/locales-all.min.js"></script>
    <script src="https://www.google.com/recaptcha/api.js?render=6LeawrYeAAAAAJVWKM3xBssjuMpLX_gjdQHxjLfm"></script>
    <script src="https://accounts.google.com/gsi/client" async defer></script>
    <script src="js/l4z4r0.js"></script>
     
  </body>
</html>
