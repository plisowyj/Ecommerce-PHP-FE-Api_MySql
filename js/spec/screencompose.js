var googleUser = {};
var arrRegPB = {'nom':0, 'mail':0, 'pass':0, 'repass':0};
var arrLog = {'mail':0, 'pass':0};
var arrFor = {'mail':0};
var sAuxP = '';

var startApp = function() {
    window.google.accounts.id.initialize({
        client_id: '784849944448-cp65v9p0ntjs0jdeagvu04n4ikm2qpgq.apps.googleusercontent.com',
        callback: handleCredentialResponse
      });

      window.google.accounts.id.prompt(
        (notification) => {
            if (notification.isNotDisplayed() || notification.isSkippedMoment()  ) { //|| notification.isDismissedMoment()
                msgNoti('INFORMACIÓN:','Puede ingresar con su cuenta Google desde "Acceso".','I');
                
                window.google.accounts.id.initialize({
                    client_id: '784849944448-cp65v9p0ntjs0jdeagvu04n4ikm2qpgq.apps.googleusercontent.com',
                    callback: handleCredentialResponse
                  });
                window.google.accounts.id.renderButton(g_id_onload, {
                    type:"standard",
                    shape:"pill",
                    theme:"filled_black",
                    size:"small",
                    logo_alignment:"left"
                  });
            }
          }
      );
};

function handleCredentialResponse(vg){
    var base64 = vg.credential.split('.')[1];
    var gu     = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    gdata = JSON.parse(gu);
    StartSess(gdata.name,gdata.email,gdata.picture,'','sGog');
}

$('#accordionSidebarDIV').html(
    '<li class="nav-item">'+
    '    <a class="nav-link" href="#">'+
    '    <i class="fa fa-search"></i>'+
    '    <span>Productos</span></a>'+
    '</li>'+            
    '<hr class="sidebar-divider">'+
    '<li id="cartmnu" class="nav-item">'+
    '    <a class="nav-link" href="#">'+
    '    <i class="fa fa-shopping-cart"></i>'+
    '    <span>Carrito</span></a>'+
    '</li>'
);

$("#contentpageDIV").html(
   '<div id="carouselMio" class="carousel slide" data-ride="carousel">'+
   ' <ol class="carousel-indicators">'+
   '   <li data-target="#carouselMio" data-slide-to="0" class="active"></li>'+
   '   <li data-target="#carouselMio" data-slide-to="1"></li>'+
   '   <li data-target="#carouselMio" data-slide-to="2"></li>'+
   '    </ol>'+
   ' <div class="carousel-inner">'+
   '   <div class="carousel-item active">'+
   '     <img class="d-block w-100" src="img/publicidad/p01.jpg" alt="First slide">'+
   '      </div>'+
   '   <div class="carousel-item">'+
   '        <img class="d-block w-100" src="img/publicidad/p02.jpg" alt="Second slide">'+
   '   </div>'+
   '  <div class="carousel-item">'+
   '    <img class="d-block w-100" src="img/publicidad/p03.jpg" alt="Third slide">'+
   '  </div>'+
   '</div>'+
   '<a class="carousel-control-prev" href="#carouselMio" role="button" data-slide="prev">'+
   '  <span class="carousel-control-prev-icon" aria-hidden="true"></span>'+
   '</a>'+
   '<a class="carousel-control-next" href="#carouselMio" role="button" data-slide="next">'+
   '  <span class="carousel-control-next-icon" aria-hidden="true"></span>'+
   '</a>'+
   '</div><br>'+
   '<div class="row">'+
   '<div class="col-xl-4 col-md-4 mb-4">'+
   '  <div class="card bg-danger text-white shadow h-100 py-2">'+
   '    <div class="card-body">'+
   '      <div class="row no-gutters align-items-center">'+
   '        <div class="col mr-2">'+
   '          <div class="text-md font-weight-bold text-white text-uppercase mb-1">CHOCOLATE</div>'+
   '          <div class="h6 mb-0 text-white">Bombones deliciosos.</div>'+
   '        </div>'+
   '        <div class="col-auto">'+
   '          <i class="fas fa-candy-cane fa-2x text-gray-300"></i>'+
   '        </div>'+
   '      </div>'+
   '    </div>'+
   '  </div>'+
   '</div>'+
   '<div class="col-xl-4 col-md-4 mb-4">'+
   '  <div class="card bg-info shadow h-100 py-2">'+
   '    <div class="card-body">'+
   '      <div class="row no-gutters align-items-center">'+
   '        <div class="col mr-2">'+
   '          <div class="text-md font-weight-bold text-white text-uppercase mb-1">PAN</div>'+
   '          <div class="h6 mb-0 text-white">Tostadas crocantes.</div>'+
   '        </div>'+
   '        <div class="col-auto">'+
   '          <i class="fas fa-bread-slice fa-2x text-gray-300"></i>'+
   '        </div>'+
   '      </div>'+
   '    </div>'+
   '  </div>'+
   '</div>'+
   '<div class="col-xl-4 col-md-4 mb-4">'+
   '  <div class="card bg-success shadow h-100 py-2">'+
   '    <div class="card-body">'+
   '      <div class="row no-gutters align-items-center">'+
   '        <div class="col mr-2">'+
   '          <div class="text-md font-weight-bold text-white text-uppercase mb-1">MERMELADA</div>'+
   '          <div class="h6 mb-0 text-white">Dulzura delicada.</div>'+
   '        </div>'+
   '        <div class="col-auto">'+
   '          <i class="fas fa-lemon fa-2x text-gray-300"></i>'+
   '        </div>'+
   '      </div>'+
   '    </div>'+
   '  </div> '+
   '</div>'+
   '</div>'
);

$('#carouselMio').carousel({
interval: 5000
});

$('#btn_finder').popover({
trigger: 'focus'
});
$('#cartmnu').on('click', function(){
    paction='get_sess';

    grecaptcha.execute('6LeawrYeAAAAAJVWKM3xBssjuMpLX_gjdQHxjLfm', {action: paction}).then(function(token) {
        var params = {
            "paction" : paction,
            "ptoken"  : token
        };
        $.ajax({
            data:  params,
            url:   'php/ws/wssess.php',
            type:  'get',
            beforeSend: function(){
                Pausa('SI');
            },
            complete: function(){
                Pausa('NO');
            },
            success:  function (response) {
                if (JSON.parse(response).SESS==''){
                    msgNoti('IMPORTANTE:','Para ver el Carrito: utilice "Acceso / Con mi Usuario o Con Google".','I');
                }else{
                    /* se cargara el carrito */
                }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) { 
                msgNoti('ERROR:',textStatus+": " + errorThrown,'R'); 
            }
        });    
    });; 
});

$('#heart').hide();
$('#bell').hide();

grecaptcha.ready(function() {
    paction='get_sess'; 
    
    grecaptcha.execute('6LeawrYeAAAAAJVWKM3xBssjuMpLX_gjdQHxjLfm', {action: paction}).then(function(token) {
        var params = {
            "paction" : paction,
            "ptoken"  : token
        };
        $.ajax({
            data:  params,
            url:   'php/ws/wssess.php',
            type:  'get',
            beforeSend: function(){
                Pausa('SI');
            },
            complete: function(){
                Pausa('NO');
            },
            success:  function (response) {
                if (JSON.parse(response).SESS==''){
                    $('#mAccess').html(
                        '<a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">'+
                        '    <span class="mr-2 d-none d-lg-inline text-gray-600 small">Acceso</span>'+
                        '    <img class="img-profile rounded-circle" src="img/avatar.png">'+
                        '</a>'+
                        '<div class="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">'+
                        '    <a id="userLogin" class="dropdown-item" href="#" data-toggle="modal">'+
                        '      <i class="fas fa-sign-in-alt fa-sm fa-fw mr-2 text-gray-800"></i>'+
                        '      Con mi usuario'+
                        '    </a>'+
                        '    <a id="userRegister" class="dropdown-item" href="#" data-toggle="modal">'+
                        '      <i class="fa fa-user-plus fa-sm fa-fw mr-2 text-gray-800"></i>'+
                        '      Registrarme'+
                        '    </a><hr class="sidebar-divider"><center>'+
                        '    <div id="g_id_onload"</div></center>'+
                        '</div>'
                    );

                    $('#userLogin').on('click', function(){
                        login();
                    });
                    $('#userRegister').on('click', function(){
                        register();
                    });

                    startApp();
                }else{
                    if (JSON.parse(response).AVATAR!=''){
                        sAvatar=JSON.parse(response).AVATAR;
                    }
                    else{
                        sAvatar="img/avatar.png";
                    }
                    $('#mAccess').html(
                        '<a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">'+
                        '    <span class="mr-2 d-none d-lg-inline text-gray-600 small">'+JSON.parse(response).FULL+'</span>'+
                        '    <img class="img-profile rounded-circle" src="'+sAvatar+'">'+
                        '</a>'+
                        '<div class="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">'+
                        '    <a id="userData" class="dropdown-item" href="#" data-toggle="modal" onclick="misDatos();">'+
                        '      <i class="fas fa-address-card fa-sm fa-fw mr-2 text-gray-800"></i>'+
                        '      Mis datos'+
                        '    </a>'+
                        '    <a id="userSess" class="dropdown-item" href="#" data-toggle="modal" onclick="Exit();">'+
                        '      <i class="fa fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-800"></i>'+
                        '      Cerrar sesión'+
                        '    </a>'+
                        '</div>'
                    );
                    OptionsMenu(JSON.parse(response).PROF);
                }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) { 
                msgNoti('ERROR:',textStatus+": " + errorThrown,'R'); 
            }
        });    
    });;
});

loadScriptSync("js/spec/screenfull.js");  

function enterKeyPressed(event) {
    if (event.keyCode == 13) {
        oFor=document.getElementById('myFor');
        oReg=document.getElementById('myReg');
        oLog=document.getElementById('myLog');
        if (oFor!=null){ if (!(oFor.disabled)){ $('#myFor').click(); } };
        if (oReg!=null){ if (!(oReg.disabled)){ $('#myReg').click(); } };
        if (oLog!=null){ if (!(oLog.disabled)){ $('#myLog').click(); } };
    } 
    
}

function Showme(sNombre){
    sAux=$(sNombre).attr('id');
    sCom=sAux.substring(2, sAux.length);
    if($('#'+sCom+' input').attr("type") == "text"){
        $('#'+sCom+' input').attr('type', 'password');
        $('#'+sCom+' i').addClass( "fa-eye-slash" );
        $('#'+sCom+' i').removeClass( "fa-eye" );
    }else if($('#'+sCom+' input').attr("type") == "password"){
        $('#'+sCom+' input').attr('type', 'text');
        $('#'+sCom+' i').removeClass( "fa-eye-slash" );
        $('#'+sCom+' i').addClass( "fa-eye" );
    }
    $('#'+sCom+' input').focus();
}

function uStarS(pfullname,pemail,pavatar,ppass,paction){
    var sResu='';
    grecaptcha.execute('6LeawrYeAAAAAJVWKM3xBssjuMpLX_gjdQHxjLfm', {action: paction}).then(function(token) {
        var params = {
            "pfullname": pfullname,
            "pemail"   : pemail,
            "pavatar"  : pavatar,
            "ppass"    : ppass,
            "paction"  : paction,
            "ptoken"   : token
        };
        $.ajax({
            data:  params,
            url:   'php/ws/wsusers.php',
            type:  'post',
            beforeSend: function(){
                Pausa('SI');
            },
            complete: function(){
                Pausa('NO');
            },
            success:  function (response) {
                    switch (JSON.parse(response).res){
                        case 'OK':
                            if (paction=='sGog'){
                                location.reload();
                            }else{
                                if (paction=='sReg'){
                                    $('#usermodal').modal('hide');
                                    msgNoti('IMPORTANTE:','Revisa tu correo y valida tu registro (bandeja principal o Spam).','I'); 
                                }
                            }
                            break;
                        case 'NO':
                            if (paction=='sGog'){
                                msgNoti('IMPORTANTE:','Para acceder como '+pemail.toUpperCase() +': utilice "Acceso / Con mi Usuario".','I');
                            }else{
                                if (paction=='sReg'){
                                    $('#usermodal').modal('hide');
                                    msgNoti('ATENCIÓN:','No se pudo enviar el correo de verificación.','R'); 
                                }
                            }
                            break;
                    }
                    
                    sResu = JSON.parse(response).res;
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) { 
                msgNoti('ERROR:',textStatus+": " + errorThrown,'R'); 
            }
        });    
    });;
    return sResu;
}

function StartSess(pfullname,pemail,pavatar,ppass,paction){
    grecaptcha.ready(function() {
        uStarS(pfullname,pemail,pavatar,ppass,paction)
    });
} 

function Exit(){
    $.ajax({url:   'php/func/exit.php',
            beforeSend: function(){
                Pausa('SI');
            },
            complete: function(){
                Pausa('NO');
            },
            success:  function (response) {
                    if(JSON.parse(response).res=='OK'){
                        location.reload();
                    }
            }
    }); 
}

function msgNoti(sTitulo,sTxt,stype){

    switch (stype) {
        case 'R':
            sValtoast='error';
            sIcon='fa fa-times-circle';
            stype='danger';
            break;
        case 'A':
            sValtoast='warning';
            sIcon='fa fa-exclamation-triangle';
            stype='warning';
            break;
        case 'V':
            sValtoast='success';
            sIcon='fa fa-check-circle';
            stype='success';
            break;
        default:
            sValtoast='info';
            sIcon='fa fa-info-circle';
            stype='info';
            break;
    }
    
    $.notify({
        // options
        icon: sIcon,
        title: '<strong>'+sTitulo+'</strong>',
        message: sTxt
        //url: '',
        //target: '_blank'
    },{
        // settings
        element: 'body',
        position: null,
        type: stype,
        allow_dismiss: true,
        newest_on_top: false,
        showProgressbar: true,
        placement: {
            from: "top",
            align: "right"
        },
        offset: {
            x: 20,
            y: 75
        },
        spacing: 10,
        z_index: 9090,
        delay: 7000,
        timer: 1000,
        url_target: '_blank',
        mouse_over: 'pause',
        animate: {
            enter: 'animated flipInY',
		    exit: 'animated flipOutX'
        },
        onShow: null,
        onShown: null,
        onClose: null,
        onClosed: null,
        icon_type: 'class',
        template: '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0}" role="alert">' +
            '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
            '<span data-notify="icon"></span> ' +
            '<span data-notify="title">{1}</span> ' +
            '<span data-notify="message">{2}</span>' +
            '<div class="progress" data-notify="progressbar" style="height: 2px;">' +
                '<div class="progress-bar bg-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
            '</div>' +
            '<a href="{3}" target="{4}" data-notify="url"></a>' +
        '</div>' 
    }); 
}

function forget(){
    arrFor = {
        'mail':0
    };
    $("#usertitle").html("Restablecer Contraseña");
    $("#userbody").html(
        '<div class="container">'+
        '    <div class="card o-hidden border-0 p-1">'+
        '                    <form class="user">'+
        '                        <input type="email" class="form-control form-control-user text-uppercase" id="InputEmail" onblur="validarEmail(this,3);" placeholder="Email"></br>'+
        '                        <div class="progress progress-sm mb-2">'+
        '                          <div class="progress-bar bg-primary" role="progressbar" style="width:0%" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>'+
        '                        </div>'+
        '                        <button type="button" id="myFor" class="btn btn-primary btn-user btn-block">Enviar</button>'+
        '                    </form>'+
        '                    <hr>'+
        '                    <div id="againUser" class="text-center">'+
        '                      <a class="small lzrfocus" href="#">Ingresar con mi usuario</a>'+
        '                    </div>'+
        '    </div>'+
        '</div>'
    );
    $('#InputEmail').trigger('focus')
    $('#againUser').on('click', function(){
        $('#usermodal').modal('hide');
        setTimeout(function() { 
            login(); 
        }, 80);
    });

    $('#usermodal').on('hidden', function () {
        $("#userbody").html('');
    });
    $('#myFor').on('click', function(){
        paction='vSend';
        grecaptcha.execute('6LeawrYeAAAAAJVWKM3xBssjuMpLX_gjdQHxjLfm', {action: paction}).then(function(token) {
            var params = {
                "pfullname": '_',
                "pemail"   : $('#InputEmail').val(),
                "pavatar"  : '_',
                "ppass"    : '_',
                "paction"  : paction,
                "ptoken"   : token
            };
            $.ajax({
                data:  params,
                url:   'php/ws/wsusers.php',
                type:  'post',
                beforeSend: function(){
                    Pausa('SI');
                },
                complete: function(){
                    Pausa('NO');
                },
                success:  function (response) {

                    if (JSON.parse(response).res=='OK'){
                        $('#usermodal').modal('hide');
                        msgNoti('AVISO:','Te enviamos un email. No olvides verificar tu Bandeja de Entrada o Spam.','V');
                    }else{
                        if (JSON.parse(response).res=='NO'){
                            msgNoti('ATENCIÓN:','No se pudo enviar el mail para restablecer contraseña.','A');
                        }
                    }
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) { 
                    msgNoti('ERROR:',textStatus+": " + errorThrown,'R'); 
                }
            });    
        });;
    });
    $('#myFor').attr('disabled','disabled');
    
}

function login(){
    arrLog = {
        'mail':0,
        'pass':0
    };
    
    $("#usertitle").html("Ingreso de Usuario");
    $("#userbody").html(
        '<div class="container">'+
        '    <div class="card o-hidden border-0 p-1">'+
        '                    <form class="user">'+
        '                        <div class="form-group">'+
        '                          <div><input type="email" class="form-control form-control-user text-uppercase" id="InputEmail" onblur="validarEmail(this,2);" placeholder="Email"></div></br>'+
        '                          <div id="inP">'+
        '                           <input type="password" class="form-control form-control-user" id="InputPassword" onblur="validarPass(this,2);" placeholder="Contraseña: 2 Núm, 2 Mayús, 1 !@#$&*">'+
        '                           <span id="s-inP" class="eyesApp btn-warning" onclick="Showme(this);"><i class="fa fa-eye-slash"></i></span>'+
        '                          </div>'+
        '                        </div></br>'+
        '                        <div class="progress progress-sm mb-2">'+
        '                          <div class="progress-bar bg-primary" role="progressbar" style="width:0%" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>'+
        '                        </div>'+
        '                        <button type="button" id="myLog" class="btn btn-primary btn-user btn-block">Ingresar</button>'+
        '                        <hr>'+
        '                        <div id="forget" class="text-center">'+
        '                            <a class="small lzrfocus" href="#">Olvidé mi contraseña</a>'+
        '                        </div>'+
        '                    </form><br/>'+
        '    </div>'+
        '</div>'
    );

    $('#usermodal').on('shown.bs.modal', function () {
        $('#InputEmail').trigger('focus')
    });
    $('#usermodal').on('hidden', function () {
        $("#userbody").html('');
    });
    $('#forget').on('click', function(){
        forget();
    });
    $('#myLog').on('click', function(){
        paction='vLog';
        grecaptcha.execute('6LeawrYeAAAAAJVWKM3xBssjuMpLX_gjdQHxjLfm', {action: paction}).then(function(token) {
            var params = {
                "pfullname": '_',
                "pemail"   : $('#InputEmail').val(),
                "pavatar"  : '_',
                "ppass"    : hex_md5($('#InputPassword').val()),
                "paction"  : paction,
                "ptoken"   : token
            };
            $.ajax({
                data:  params,
                url:   'php/ws/wsusers.php',
                type:  'post',
                beforeSend: function(){
                    Pausa('SI');
                },
                complete: function(){
                    Pausa('NO');
                },
                success:  function (response) {

                    if (JSON.parse(response).res=='OK'){
                        location.reload();
                    }else{
                        msgNoti('AVISO:',"Uno de los datos de Ingreso no es correcto!",'A'); 
                    }
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) { 
                    msgNoti('ERROR:',textStatus+": " + errorThrown,'R'); 
                }
            });    
        });;
    });
    $('#myLog').attr('disabled','disabled');
    $('#usermodal').modal('show');
}

function register(){
    arrRegPB = {
        'nom':0,
        'mail':0,
        'pass':0,
        'repass':0
    };

    $("#usertitle").html("Registro de Usuario");
    $("#userbody").html(
        '<div class="container">'+
        '    <div class="card o-hidden border-0 p-1">'+
        '                    <form class="user">'+
        '                       <div class="form-group">'+
        '                         <input type="text" class="form-control form-control-user text-uppercase" id="nomapeinput" onblur="validarNomApe(this);" placeholder="Nombre y Apellido">'+
        '                       </div>'+
        '                       <div class="form-group">'+
        '                         <input type="email" class="form-control form-control-user text-uppercase" id="regmailinput" onblur="validarEmail(this,1);" placeholder="Email">'+
        '                       </div>'+
        '                       <div class="form-group row">'+
        '                         <div id="inP" class="col-sm-6 mb-3 mb-sm-0">'+
        '                            <input type="password" class="form-control form-control-user" id="regInputPassword" onblur="validarPass(this,1);" placeholder="Contraseña: 2 Núm, 2 Mayús, 1 !@#$&*">'+
        '                            <span id="s-inP" class="eyesApp btn-warning" onclick="Showme(this);"><i class="fa fa-eye-slash"></i></span>'+
        '                         </div>'+
        '                         <div id="reinP" class="col-sm-6">'+
        '                            <input type="password" class="form-control form-control-user" id="regRepeatPassword" onblur="validarRepass(this);" placeholder="Confirme: 2 Núm, 2 Mayús, 1 !@#$&*">'+
        '                            <span id="s-reinP" class="eyesApp btn-warning" onclick="Showme(this);"><i class="fa fa-eye-slash"></i></span>'+
        '                         </div>'+
        '                       </div>'+
        '                       <div class="progress progress-sm mb-2">'+
        '                          <div class="progress-bar bg-primary" role="progressbar" style="width:0%" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>'+
        '                       </div>'+
        '                       <button type="button" id="myReg" class="btn btn-primary btn-user btn-block">Registrarme</button>'+
        '                    </form><br/>'+
        '    </div>'+
        '</div>'
    );
    
    $('#usermodal').on('shown.bs.modal', function () {
        $('#nomapeinput').trigger('focus')
    });
    $('#usermodal').on('hidden', function () {
        $("#userbody").html('');
    });
    $('#myReg').on('click', function(){
        paction='vMail';
        grecaptcha.execute('6LeawrYeAAAAAJVWKM3xBssjuMpLX_gjdQHxjLfm', {action: paction}).then(function(token) {
            var params = {
                "pfullname": '_',
                "pemail"   : $('#regmailinput').val(),
                "pavatar"  : '_',
                "ppass"    : '_',
                "paction"  : paction,
                "ptoken"   : token
            };
            $.ajax({
                data:  params,
                url:   'php/ws/wsusers.php',
                type:  'post',
                beforeSend: function(){
                    Pausa('SI');
                },
                complete: function(){
                    Pausa('NO');
                },
                success:  function (response) {
                    if (JSON.parse(response).res=='0'){
                        uStarS($('#nomapeinput').val(),$('#regmailinput').val(),'',hex_md5($('#regInputPassword').val()),'sReg');
                    }else{
                        arrRegPB.mail=0;
                        msgNoti('AVISO:',"El Email ya fue registrado!",'I');
                    }
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) { 
                    msgNoti('ERROR:',textStatus+": " + errorThrown,'R'); 
                }
            });    
        });;
    });
    $('#myReg').attr('disabled','disabled');
    $('#usermodal').modal('show');
}

function validarRepass(sRepass) {
    var Repass = sRepass.value;

    if (Repass!=""){
        var aux=$("#regInputPassword").val();
        if (Repass==sAuxP)  {
            arrRegPB.repass=25;
        } else {
            arrRegPB.repass=0;
            msgNoti('AVISO:',"Confirmación no coincide con la Contraseña.",'A');
        }
    }else{
        arrRegPB.repass=0;
    }
    BarraProgreso(arrRegPB,'myReg');
}

function validarPass(sPass,sOp) {
    sAuxP = sPass.value;

    if (sAuxP!=""){
        var expr = /^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,16}$/;
        if (expr.test(sAuxP)) {
            if (sOp==1){
                arrRegPB.pass=25;
             }
             if (sOp==2){
                arrLog.pass=50;
             } 
        } else {
            if (sOp==1){
                arrRegPB.pass=0;
             }
             if (sOp==2){
                arrLog.pass=0;
             }
             msgNoti('AVISO:',"Contraseña débil: 8 a 16 caracteres, 2 números, 2 mayúscula-minúsculas y 1 especial !@#$&*",'A'); 
        }
    }else{
        if (sOp==1){
            arrRegPB.pass=0;
         }
         if (sOp==2){
            arrLog.pass=0;
         }
    }
    if (sOp==1){
        BarraProgreso(arrRegPB,'myReg');
    }
    if (sOp==2){
        BarraProgreso(arrLog,'myLog');
    }
}

function validarNomApe(sName) {
    sName.value = sName.value.toUpperCase();
    var nomApe = sName.value;

    if (nomApe!=""){
        var expr = /^([A-Za-z0-9_ ]{5,45})$/;
        if (expr.test(nomApe)) {
            arrRegPB.nom=25;
        } else {
            arrRegPB.nom=0;
            msgNoti('AVISO:',"Nombre y Apellido: min. 5 - máx. 45 caracteres.",'A');
        }
    }else{
        arrRegPB.nom=0;
    }
    BarraProgreso(arrRegPB,'myReg');
}

function validarEmail(sName,sOp) {
    sName.value = sName.value.toUpperCase();
    var email = sName.value;

    if (email!=""){
        var expr = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
        if (expr.test(email)) {
            if (sOp==1){
               arrRegPB.mail=25;
            }
            if (sOp==2){
                arrLog.mail=50;
            } 
            if (sOp==3){
                arrFor.mail=100;
            } 
        } else {
            if (sOp==1){
                arrRegPB.mail=0;
             }
             if (sOp==2){
                 arrLog.mail=0;
             }
             if (sOp==3){
                arrFor.mail=0;
            } 
            msgNoti('AVISO:',"El formato del Email es incorrecto.",'A');
        }
    }else{
        if (sOp==1){
            arrRegPB.mail=0;
         }
         if (sOp==2){
             arrLog.mail=0;
         }
         if (sOp==3){
            arrFor.mail=0;
         } 
    }
    if (sOp==1){
        BarraProgreso(arrRegPB,'myReg');
    }
    if (sOp==2){
        BarraProgreso(arrLog,'myLog');
    }
    if (sOp==3){
        BarraProgreso(arrFor,'myFor');
    } 
}

function BarraProgreso(oArr,oBtn){
    var valeur = 0;
    for (const property in oArr) {
        valeur = valeur + oArr[property];
    }
    $('.progress-bar').css('width', valeur+'%').attr('aria-valuenow', valeur);    

    if (valeur==100){
        $('#'+oBtn).removeAttr('disabled');
        setTimeout(function() { 
            $('#'+oBtn).focus(); 
        }, 500);
    }else{
        $('#'+oBtn).attr('disabled','disabled');
    }
}

function Pausa(sVal){
   if (sVal=='SI'){
       $('#preloader').show();
   }else{
       $('#preloader').hide();
   }
} 

function OptionsMenu(sProf){
    $('#heart').show();
    $('#bell').show();
    
    if (sProf=='ADM'){
        sAux=
        '<li class="nav-item">'+
        '    <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseStore" aria-expanded="true" aria-controls="collapseUtilities">'+
        '    <i class="fa fa-store"></i>'+
        '    <span>Tienda</span>'+
        '    </a>'+
        '    <div id="collapseStore" class="collapse" aria-labelledby="headingUtilities" data-parent="#accordionSidebar">'+
        '    <div class="bg-white py-2 collapse-inner rounded">'+
        '        <h6 class="collapse-header">Productos:</h6>'+
        '        <a class="collapse-item" href="utilities-color.html">Altas/Actualizaciones</a>'+
        '        <a class="collapse-item" href="utilities-color.html">Ventas</a>'+
        '    </div>'+
        '    </div>'+
        '</li>'+
        '<hr class="sidebar-divider">'+
        '<li class="nav-item">'+
        '    <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTools" aria-expanded="true" aria-controls="collapseUtilities">'+
        '    <i class="fa fa-tools"></i>'+
        '    <span>Gestión Sitio</span>'+
        '    </a>'+
        '    <div id="collapseTools" class="collapse" aria-labelledby="headingUtilities" data-parent="#accordionSidebar">'+
        '    <div class="bg-white py-2 collapse-inner rounded">'+
        '        <h6 class="collapse-header">Genéricos:</h6>'+
        '        <a class="collapse-item" href="#" onclick="getusers(-1);">Mis Usuarios</a>'+
        '    </div>'+
        '    </div>'+
        '</li>'
    }else{
        sAux='';
    }
    $('#accordionSidebarDIV').html($('#accordionSidebarDIV').html()+
        '<hr class="sidebar-divider">'+
        '<div class="sidebar-heading">'+
        '    MIS MOVIMIENTOS'+
        '</div>'+
        '<li class="nav-item">'+
        '    <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseBuy" aria-expanded="true" aria-controls="collapseTwo">'+
        '    <i class="fa fa-shopping-bag"></i>'+
        '    <span>Compras</span>'+
        '    </a>'+
        '    <div id="collapseBuy" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">'+
        '    <div class="bg-white py-2 collapse-inner rounded">'+
        '        <h6 class="collapse-header">Movimientos:</h6>'+
        '        <a class="collapse-item" href=".html">Compras</a>'+
        '        <a class="collapse-item" href="utilities-color.html">Consultas</a>'+
        '    </div>'+
        '    </div>'+
        '</li>'+
        sAux + 
        '<hr class="sidebar-divider">'+
        '<li class="nav-item">'+
        '    <a class="nav-link" href="#" onclick="calendar();">'+
        '    <i class="fa fa-calendar"></i>'+
        '    <span>Calendario</span></a>'+
        '</li>');
}
