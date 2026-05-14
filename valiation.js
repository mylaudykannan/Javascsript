/***Validate */
//call button function
/*
<input id="loginbtn" type="submit" onclick="return window.validation(event, '#formid')" name="login" value="Submit" >
*/
window.validation = function(e, id, submit=true) {
    e.preventDefault();
    var valfield = id + " input," + id + " select," + id + " textarea";
    $(".error,.raderror,.chkerror").remove();
    var valid = true;
    var radname = "";
    var checkname = "";
    $(valfield).css("border-color", "#ccc");
    $(valfield).not(':disabled').each(function(index) {
        if ($(this).closest('.novalidation').length) {
            return;
        }
        var name = $(this).attr("name");
        if (typeof name !== typeof undefined && name !== false) {
            if ($(this).attr("type") == "file") {
                var err = '';
                var file = $(this).val();
                if ($(this).hasClass("required")) {
                    if (file == "") {
                        valid = false;
                        err = $(this).attr("data-empty");
                    }
                }
                if (file != '') {

                    var datadimension = $(this).attr("data-dimension");
                    if (typeof datadimension !== typeof undefined && datadimension !== false) {
                        var dataid = $(this).attr("data-id");
                        var width = $('#' + dataid).width();
                        var height = $('#' + dataid).height();
                        var checkwidth = parseFloat(width) * parseFloat(datadimension);
                        if (parseFloat(checkwidth) != parseFloat(height)) {
                            valid = false;
                            err = $(this).attr("data-dimension-err");
                        }
                    }
                    var a = (this.files[0].size);
                    var datasize = $(this).attr("data-size");
                    if (typeof datasize !== typeof undefined && datasize !== false) {
                        if (a > datasize) {
                            valid = false;
                            err = $(this).attr("data-err");
                        };
                    } else {
                        if (a > 1000000) {
                            valid = false;
                            err = $(this).attr("data-err");
                        };
                    }
                    var fileExtension = file.replace(/^.*\./, '');
                    if ($(this).attr('name') == 'photo' || $(this).attr('name') == 'image' || $(this).attr('name') == 'image[]') {
                        if (fileExtension != 'jpeg' && fileExtension != 'jpg' && fileExtension != 'png' && fileExtension != 'webp') {
                            valid = false;
                            err = "File Type not allowed";
                        }
                    }
                    if ($(this).hasClass('attachment')) {
                        if (fileExtension != 'jpeg' && fileExtension != 'jpg' && fileExtension != 'png' && fileExtension != 'webp' && fileExtension != 'svg' && fileExtension != 'doc' && fileExtension != 'pdf' && fileExtension != 'docx' && fileExtension != 'webp') {
                            valid = false;
                            err = "File Type not allowed";
                        }
                    }
                }
                if (err != '') {
                    $(this)
                        .closest(".imgdiv")
                        .find(".showerror")
                        .after("<p class='error'>" + err + "</p>");
                }
            }
            if ($(this).hasClass("required")) {
                if ($(this).attr("type") == "checkbox") {
                    if (checkname != "" && checkname == $(this).attr("name")) {
                        return;
                    }
                    checkname = $(this).attr("name");
                    if (!$("input[name='" + checkname + "']").is(":checked")) {
                        if ($(this).hasClass('noerrortext')) {
                            $(this).next('label.errortext').css('color', 'red');
                            valid = false;
                            return;
                        }
                        valid = false;
                        var err = $(this).attr("data-empty");
                        $(this).after("<p class='chkerror'>" + err + "</p>");
                        $(this).css("border-color", "red");
                    }
                } else if ($(this).attr("type") == "radio") {
                    if (radname != "" && radname == $(this).attr("name")) {
                        return;
                    }
                    radname = $(this).attr("name");
                    var isChecked = $("input[name='" + radname + "']:checked").val() ?
                        true :
                        false;
                    if (isChecked == false) {
                        valid = false;
                        var err = $(this).attr("data-empty");
                        $(this).after("<p class='raderror'>" + err + "</p>");
                        $(this).css("border-color", "red");
                    }
                } else if ($(this).attr("type") != "file") {
                    if ($(this).is("textarea")) {
                        var val = $(this).val();
                        val = $("<div/>").html(val).text();
                    } else
                        var val = $(this).val();
                    if (val == "") {
                        valid = false;
                        var err = $(this).attr("data-empty");
                        $(this).after("<p class='error'>" + err + "</p>");
                        $(this).css("border-color", "red");
                    }
                }
            }
            if ($(this).is("textarea") || ($(this).is("input") && ($(this).attr('type') == 'text' || $(this).attr('type') == 'input' || $(this).attr('type') == 'number') || $(this).attr('type') == 'password')) {
                var datamin = $(this).attr("data-min");
                if (typeof datamin !== typeof undefined && datamin !== false) {
                    if ($(this).is("textarea")) {
                        var val = $(this).val();
                        val = $("<div/>").html(val).text();
                    } else
                        var val = $(this).val();
                    if (val != '') {
                        var min = $(this).attr('data-min');
                        if (min > val.length) {
                            valid = false;
                            var err = $(this).attr("data-lengtherr");
                            $(this).after("<p class='error'>" + err + "</p>");
                            $(this).css("border-color", "red");
                        }
                    }
                }
                var datamax = $(this).attr("data-max");
                if (typeof datamax !== typeof undefined && datamax !== false) {
                    if ($(this).is("textarea")) {
                        var val = $(this).val();
                        val = $("<div/>").html(val).text();
                    } else
                        var val = $(this).val();
                    if (val != '') {
                        var max = $(this).attr('data-max');
                        if (max < val.length) {
                            valid = false;
                            var err = $(this).attr("data-lengtherr");
                            $(this).after("<p class='error'>" + err + "</p>");
                            $(this).css("border-color", "red");
                        }
                    }
                }
            }
            if ($(this).attr("type") == "email") {
                var email = $(this).val();
                if (email != "") {
                    var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
                    if (!filter.test(email)) {
                        valid = false;
                        var err = $(this).attr("data-err");
                        $(this).after("<p class='error'>" + err + "</p>");
                        $(this).css("border-color", "red");
                    }
                }
            } else if ($(this).attr("data-regx")) {
                var regx = $(this).attr("data-regx");
                var val = $(this).val();
                if (val != "") {
                    if (!val.match(regx)) {
                        valid = false;
                        var err = $(this).attr("data-err");
                        $(this).after("<p class='error'>" + err + "</p>");
                        $(this).css("border-color", "red");
                    }
                }
            }
            if ($(this).hasClass("cpassword")) {
                var pass = $(".password").val();
                var cpassword = $(".cpassword").val();
                if (pass != cpassword) {
                    valid = false;
                    var err = $(this).attr("data-err");
                    $(this).after("<p class='error'>" + err + "</p>");
                    $(this).css("border-color", "red");
                }
            }
        }
    });
    if (valid == false) {
        if ($(".error").length) {
            $('.error:first').closest('.hidden').removeClass('hidden');
            $('html, body').animate({ scrollTop: $('.error:first').offset().top - 200 }, 'slow');
        }
    }
    if(valid==true && submit==true)
        $(id).submit(); //for submit the form if validation true
    return valid;
}
/* End Validate */
