/**
 * Created by abyshin on 23.10.14.
 */

$(document).ready(function() {

    var rowForDelete;
    var rowForFire;
    var rowColor;

    $("#users").tablesorter();

    $('.a_clr').colorbox({innerWidth: '400px', html: function (){

        $('#user_firstname').attr('value', '');
        $('#user_lastname').attr('value', '');
        $('#user_login').attr('value', '');

        $("#operation_type").attr('value', 'add');
        $('#user_id_hidden').attr('value', '0');
        $("#pseudosubmit").attr("value", "Добавить");

        $(".create_user_wrapper_caption").text('Добавление нового сотдрудника');
        return $('#create_user_wrapper').html();
    }, onOpen: function(){
        $(".error").each(function(i, val) {
            if ($(this).attr('id') == 'user_error') {
                $(this).css('display', 'none');
            }
        });
    }
    });

    $(".td_img_delete").click(function() {
        var id = $(this).attr("userid");
        var td = $(this);
        Boxy.ask("Вы действительно хотите удалить выбранного сотрудника?", ["Да", "Нет"], function(val) {
            if (val == "Да") {

                $.ajax({
                    type: "GET",
                    url: 'delete',
                    data: {'id': id}
                });

                var row = td.parent().parent().parent().parent().parent();

                row.children('td').css('background-color', '#FFDAC5');
                rowForDelete = row;
                setTimeout(deleteRow, 2500);

            }
        }, {title: "Удаление сотрудника", userid: id, cancel: "Нет"});
        Boxy.unload();
    });

    $(".td_img_fire").click(function() {
        var id = $(this).attr("userid");
        var td = $(this);
        Boxy.ask("Вы действительно хотите уволить выбранного сотрудника?", ["Да", "Нет"], function(val) {
            if (val == "Да") {

                $.ajax({
                    type: "GET",
                    url: 'fire',
                    data: {'id': id}
                });

                var row = td.parent().parent().parent().parent().parent();
                rowColor = row.children('#user_field_fire').css('background-color');
                row.children('td').css('background-color', '#FFFBD6');

                rowForFire = row;
                setTimeout(setFired, 2000);

            }
        }, {title: "Увольнение сотрудника", userid: id, cancel: "Нет"});
        Boxy.unload();
    });

    $(".td_img_edit").colorbox({innerWidth: '400px', html: function (){

        $("#operation_type").attr('value', 'edit');
        var id = $(this).attr('userid');
        $('#user_id_hidden').attr('value', id);

        var info = $(this).parent().parent().parent().parent().parent().children("#user_info");
        $('#user_firstname').attr('value', info.attr("firstname"));
        $('#user_lastname').attr('value', info.attr("lastname"));
        $('#user_login').attr('value', info.attr("login"));

        $("#position_position_id option[value=" + info.attr("position") + "]").attr("selected","selected") ;
        $("#permission_permission_id option[value=" + info.attr("permission") + "]").attr("selected","selected") ;
        $("#pseudosubmit").attr("value", "Изменить");
        $(".create_user_wrapper_caption").text('Редактирование сотрудника');

        return $('#create_user_wrapper').html();
    }, onOpen: function(){
        $(".error").each(function(i, val) {
            if ($(this).attr('id') == 'user_error') {
                $(this).css('display', 'none');
            }
        });
    }
    });

    $(".td_img_edit").click(function() {
        var id = $(this).attr("userid");
        var td = $(this);
        $("#operation_type").attr('value', 'edit');
    });

    function deleteRow () {
        rowForDelete.remove();
    }

    function setFired () {
        rowForFire.children('#user_field_fire').text('Уволен');
        rowForFire.children('td').css('background-color', rowColor);
    }

    $(".td_img_edit").click(function() {
        var id = $(this).attr("userid");
    });



});

function validate() {

    var firstname = $("#cboxWrapper #user_firstname").val();
    var lastname = $("#cboxWrapper #user_lastname").val();
    var login = $("#cboxWrapper #user_login").val();
    var password = $("#cboxWrapper #user_password").val();
    var position = $("#cboxWrapper #position_position_id").val();

    if ((firstname != '') && (lastname != '') && (login != '') && (password != '') && (position != '') ) {
        $('#cboxWrapper #submit').click();
    } else {
        $(".error").each(function(i, val) {
            if ($(this).attr('id') == 'user_error') {
                $(this).css('display', 'block');
            }
        });
    }


}