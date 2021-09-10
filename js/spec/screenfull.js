idiomatbl = {
    "decimal":        "",
    "emptyTable":     "No hay datos para mostrar.",
    "info":           "Página _PAGE_ de _PAGES_",
    "infoEmpty":      "Viendo 0 a 0 de 0 entradas",
    "infoFiltered":   "(filtrado desde _MAX_ entradas totales)",
    "infoPostFix":    "",
    "thousands":      ",",
    "lengthMenu":     "Mostrar _MENU_ entradas",
    "loadingRecords": "Cargando...",
    "processing":     "Procesando...",
    "search":         "Buscar:",
    "zeroRecords":    "No se encontraron registros.",
    "paginate": {
        "first":      "Primero",
        "last":       "Último",
        "next":       "Próximo",
        "previous":   "Anterior"
    },
    "aria": {
        "sortAscending":  ": active para orden ascendente",
        "sortDescending": ": active para orden descendente"
    }
};

function getusers(nid){
    $('#title01').html('Mis Usuarios');
    $('#contentpageDIV').html(
        '<div class="card shadow mb-4">'+
        '    <div class="card-header py-3">'+
        '      <h6 class="m-0 font-weight-bold text-primary">Resultados</h6>'+
        '    </div>'+
        '    <div class="card-body">'+
        '      <div class="table-responsive">'+
        '        <table class="hoverTable table table-striped form-control-sm" id="mitabla" width="100%" cellspacing="0">'+
        '        </table>'+
        '      </div>'+
        '    </div>'+
        '</div>'
        );
    paction='gUsr';
    grecaptcha.execute('6Lda6qgZAAAAALn9v-hwpZoxT13r039X2ON36H10', {action: paction}).then(function(token) {
        var params = {
            "pid"      : nid,
            "paction"  : paction,
            "ptoken"   : token
        };
        $('#mitabla').DataTable( {
            "ajax":{
                type :"POST",
                url  :"php/spec/wsscreenfull.php",
                data :params,
                beforeSend: function(){
                    Pausa('SI');
                },
                complete: function(){
                    Pausa('NO');
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) { 
                    msgNoti('ERROR:',textStatus+": " + errorThrown,'R'); 
                }
            },
            fixedHeader: true,
            "language": idiomatbl,
            columns: [
                { data: 'fullname', title:'Nombre Completo' },
                { data: 'email' ,   title:'Email' },
                { data: 'signin' ,  title:'Tipo Acceso ',
                    render: function (data, type, row) {
                        if (data=='1'){
                            return '<a class="btn btn-google" title="Acceso con Google"><i class="fab fa-google fa-fw" style="color:#fff"><p style="display:none;">1</p></i></a>'
                        }else{
                            return '<a class="btn" title="Acceso con Usuario"><i class="fa fa-user-circle fa-fw"><p style="display:none;">0</p></i></a>'
                        }
                    }
                },
                { data: 'profile',  title:'Perfil',
                    render: function (data, type, row) {
                        if (data=='ADM'){
                            return '<a class="btn" title="Administrador"><i class="fa fa-users-cog fa-fw"><p style="display:none;">ADM</p></i></a>'
                        }else{
                            return '<a class="btn" title="Comprador"><i class="fa fa-shopping-bag fa-fw"><p style="display:none;">NON</p></i></a>'
                        }
                    }
                },
                { data: 'active' ,  title:'Activo',
                    render: function (data, type, row) {
                        if (data=='1'){
                            return '<a class="btn"><i class="fa fa-check fa-fw"><p style="display:none;">1</p></i></a>'
                        }else{
                            return '<a class="btn"><i class="fa fa-times fa-fw"><p style="display:none;">0</p></i></a>'
                        }
                    }
                },
                { data: 'createdate',title:'Fecha Alta',
                    render: function (data, type, row) {
                        return moment(row.updatedDate).format('DD/MM/YYYY');
                    }
                },
                { data: 'modified' , title:'Último Cambio',
                    render: function (data, type, row) {
                        return moment(row.updatedDate).format('DD/MM/YYYY');
                    }
                },
                { data: 'id', title:'<a class="btn"><i class="fa fa-bars fa-fw"></i></a>',
                    render:function(data, type, row)
                    {
                    return '<button id="actionButton" type="button" class="btn btn-warning dropdown-toggle btn-sm" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>'+
                           '<div class="dropdown-menu dropdown-menu-dark" aria-labelledby="actionButton">'+
                           ' <a class="dropdown-item" data-toggle="modal" data-target="#ticketModal' + data +'" href="#"><i class="fa fa-toggle-on fa-fw"></i> Activar</a>'+
                           ' <a class="dropdown-item" href="#" onclick="reopenTicket('+ data +')"><i class="fa fa-toggle-off fa-fw"></i> Desactivar</a>'+
                           '</div>';
                    }
                }                
            ],
            "aoColumnDefs": [
                { 'bSortable': false, 'aTargets': [ 7 ] }
                ]
        });
                   
    });
}

function misDatos(){
    $('#title01').html('Mis Datos');
    $('#contentpageDIV').html(
        '<div class="card shadow mb-4">'+
        '    <div class="card-header py-3">'+
        '      <h6 class="mt-2 font-weight-bold text-primary float-md-left">Información Personal</h6>'+
        '      <div class="btn-group btn-group-toggle float-md-right">'+
        '        <a href="#" class="btn btn-success btn-circle">'+
        '            <i class="fas fa-check"></i>'+
        '        </a>'+
        '      </div>'+
        '    </div>'+
        '    <div class="card-body">'+
        '    </div>'+
       '</div>'
        );
}

function SwitchValue(Val){
    if ($('#'+Val.id).val()=='0'){$('#'+Val.id).val('1');}else{$('#'+Val.id).val('0');}    
}

function calendar(){
    $('#title01').html('Mi Calendario');
    $('#contentpageDIV').html(
        '<div class="card shadow mb-4">'+
        '    <div class="card-header py-3">'+
        '       <h6 id="CalendarioTit" class="mt-2 font-weight-bold text-primary float-md-left">Calendario: Dulce Rocío</h6>'+
        '       <div class="btn-group btn-group-toggle float-md-right"><h6 id="CalendarioTit" class="mt-2 font-weight-bold text-success mr-2">Calendario Google</h6><input class="drSwitcherChk" type="checkbox" value="0" id="CalendarSwt" onClick="SwitchValue(this);"/><label class="drSwitcherLbl" for="CalendarSwt"></label></div>'+
        '    </div>'+
        '    <div class="card-body">'+
        '    <div >'+
        '       <div id="calendar" class="clndr"></div>'+
        '       </div>'+
        '    </div>'+
       '</div>'
        );
        
        var initialLocaleCode = 'es';
    var localeSelectorEl = document.getElementById('locale-selector');
    var calendarEl = document.getElementById('calendar');

    var calendar = new FullCalendar.Calendar(calendarEl, {
        headerToolbar: {
        left: 'prev,next',
        center: 'title',
        right: 'today'
        },
        locale: initialLocaleCode,
        buttonIcons: true, // show the prev/next text
        weekNumbers: false,
        navLinks: false, // can click day/week names to navigate views
        editable: false,
        dayMaxEvents: true, // allow "more" link when too many events
        events: [
        {
            title: 'LOCAL',
            start: '2021-08-11',
            body: 'non-standard Event Object field', //arg=param on site=> arg.event.extendedProps.body
        },
        {
            title: 'Long Event',
            url: 'https://www.google.com/calendar/render?action=TEMPLATE&text=titulo&details=descripcion&location=location&dates=20210812T175100Z%2F20210814T175100Z',
            start: '2021-08-12',
            end: '2021-08-14'
        },
        {
            groupId: 999,
            title: 'Repeating Event',
            start: '2021-08-13T16:00:00'
        },
        {
            groupId: 999,
            title: 'Repeating Event',
            start: '2021-08-05T16:00:00'
        },
        {
            title: 'Click for Google',
            url: 'http://google.com/',
            start: '2021-08-22'
        }
        ],
        eventClick: function(arg) {
            abrirNuevoTab(arg.el.href)
            arg.jsEvent.preventDefault() // don't navigate in main tab
        }
    });

    calendar.render(); 
}

function abrirNuevoTab(url) {
    var win = window.open(url, '_blank');
    win.focus();
}

//lista de eventos desde un calendario publico en calendar google
/* 
        var calendarEl = document.getElementById('calendar');
        var calendar = new FullCalendar.Calendar(calendarEl, {
    
          headerToolbar: {
            left: 'prev,next',
            center: 'title',
            right: 'today'
            },
          locale: 'es',
          buttonIcons: true, // show the prev/next text
          weekNumbers: false,
          navLinks: false, // can click day/week names to navigate views
          editable: true,
          dayMaxEvents: true, // allow "more" link when too many events
          displayEventTime: false, // don't show the time column in list view
          googleCalendarApiKey: 'AIzaSyDtoa2-RetDzf5cdT6bv2D-DaSbH-AzJ1g',
          events: '5uujlm5rljamouiq5vn4ucdtto@group.calendar.google.com',
    
          eventClick: function(arg) {
            // opens events in a popup window
            window.open(arg.event.url, 'google-calendar-event', 'width=700,height=600');
    
            arg.jsEvent.preventDefault() // don't navigate in main tab
          },
    
          loading: function(bool) {
            
          }
    
        });
    
        calendar.render();
 */

//lista eventos desde un array
/*
    var initialLocaleCode = 'es';
    var localeSelectorEl = document.getElementById('locale-selector');
    var calendarEl = document.getElementById('calendar');

    var calendar = new FullCalendar.Calendar(calendarEl, {
        headerToolbar: {
        left: 'prev,next',
        center: 'title',
        right: 'today'
        },
        locale: initialLocaleCode,
        buttonIcons: true, // show the prev/next text
        weekNumbers: false,
        navLinks: false, // can click day/week names to navigate views
        editable: false,
        dayMaxEvents: true, // allow "more" link when too many events
        events: [
        {
            title: 'LOCAL',
            start: '2021-06-20',
            body: 'non-standard Event Object field', //arg=param on site=> arg.event.extendedProps.body
        },
        {
            title: 'Long Event',
            start: '2021-06-22',
            end: '2021-06-24'
        },
        {
            groupId: 999,
            title: 'Repeating Event',
            start: '2021-06-19T16:00:00'
        },
        {
            groupId: 999,
            title: 'Repeating Event',
            start: '2021-06-20T16:00:00'
        },
        {
            title: 'Click for Google',
            url: 'http://google.com/',
            start: '2021-06-22'
        }
        ],
        eventClick: function(arg) {

            alert(arg);
    
            arg.jsEvent.preventDefault() // don't navigate in main tab
          }
    });

    calendar.render();
*/