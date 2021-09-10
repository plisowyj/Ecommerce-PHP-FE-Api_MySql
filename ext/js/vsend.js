var arrP = {
    'pass':0,
    'repass':0
};
$("#alertMsg").hide();
$('#myFor').attr('disabled','disabled');
$('#linkdr').hide();
$('#myFor').on('click', function(){
    paction='vsend'; 
    grecaptcha.execute('6Lda6qgZAAAAALn9v-hwpZoxT13r039X2ON36H10', {action: paction}).then(function(token) {
        $.ajax({
            data:  {"paction": paction,
                    "pmail"  : $('#email').html(),
                    "ppass"  : hex_md5($('#regInputPassword').val()),
                    "ptoken" : token
            },
            url:   '../php/ws/wsvsend.php',
            type:  'post',
            beforeSend: function() {
                $('#myFor').attr('disabled','disabled');
                $('#myFor').html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>Enviando...');
            },
            success:  function (response) {
                if (JSON.parse(response).res=='OK'){
                    $('#myFor').hide();
                    $('#linkdr').html('<a class="btn btn-primary btn-lg" target="_self" rel="nofollow" href="../index.php">Listo! Ir a Dulce Rocío</a>');  
                    $('#linkdr').show();
                }else{
                    $("#msjAlert").html("Esta cuenta no tiene clave para recuperar.");
                    $("#alertMsg").fadeIn(700);
                    setTimeout(function() { 
                        $('#alertMsg').fadeOut(700); 
                        $('#myFor').hide();
                        $('#linkdr').html('<a class="btn btn-primary btn-lg" target="_self" rel="nofollow" href="../index.php">Listo! Ir a Dulce Rocío</a>');  
                        $('#linkdr').show();
                    }, 8000);
                }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) { 
                alert('Error '+textStatus+': ' + errorThrown); 
            }
        });
    });
});

function Showme(sCom){
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

function validarPass(sPass) {
    sAuxP = sPass.value;

    if (sAuxP!=""){
        var expr = /^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,16}$/;
        if (expr.test(sAuxP)) {
            arrP.pass=50;
        } else {
            arrP.pass=0;

            $("#msjAlert").html("Contraseña débil: 8 a 16 caracteres, 2 números, 2 mayúscula-minúsculas y 1 especial !@#$&*");
            $("#alertMsg").fadeIn(700);
            setTimeout(function() { 
                $('#alertMsg').fadeOut(700); 
            }, 5000);
        }
    }else{
        arrP.pass=0;
    }
    BarraProgreso(arrP,'myFor');
}

function BarraProgreso(oArr,oBtn){
    var valeur = 0;
    for (const property in oArr) {
        valeur = valeur + oArr[property];
    }
    $('.progress-bar').css('width', valeur+'%').attr('aria-valuenow', valeur);    

    if (valeur==100){
        $('#'+oBtn).removeAttr('disabled');
    }else{
        $('#'+oBtn).attr('disabled','disabled');
    }
}

function validarRepass(sRepass) {
    var Repass = sRepass.value;

    if (Repass!=""){
        var aux=$("#regInputPassword").val();
        if (Repass==sAuxP)  {
            arrP.repass=50;
        } else {
            arrP.repass=0;
            $("#msjAlert").html("Confirmación no coincide con la Contraseña.");
            $("#alertMsg").fadeIn(700);
            setTimeout(function() { 
                $('#alertMsg').fadeOut(700); 
            }, 3000);
        }
    }else{
        arrP.repass=0;
    }
    BarraProgreso(arrP,'myFor');
}
