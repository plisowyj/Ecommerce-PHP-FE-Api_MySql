$(document).ready(function() { 
    paction='vmail'; 
    setTimeout(function() { 
        grecaptcha.execute('6Lda6qgZAAAAALn9v-hwpZoxT13r039X2ON36H10', {action: paction}).then(function(token) {
            $.ajax({
                data:  {"paction" : paction,
                        "pmail"   : $('#email').html(), 
                        "ptoken"  : token
                    },
                url:   '../php/ws/wsvmail.php',
                type:  'post',
                beforeSend: function() {
                    $(".progress-bar").animate({
                        width: "100%"
                    }, 3000);
                },
                success:  function (response) {
                    if (JSON.parse(response).res=='OK'){
                        $('#linkdr').html('<a class="btn btn-primary btn-lg" target="_self" rel="nofollow" href="../index.php">Listo! Ir a Dulce Rocío</a>');  
                    }else{
                        alert('No se pudo validar tu registro. Intenta de nuevo presionando F5.');
                    }
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) { 
                    alert('Error '+textStatus+': ' + errorThrown); 
                }
            });
        });
    }, 2000);
} );
    