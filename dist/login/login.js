//登录
var denglu = $("#login_denglu")[0];
denglu.onclick = function() {
    var phone = $("#phone").val();
    var yanzhengma = $("#yanzhengma").val();

    if(false && phone.length <= 0) {
        mui.alert("请输入手机号");
    } else {
        $.ajax({
            type: "POST",
            url: config.getUrl() + "/UserV0_1/Login/login",
            data: {
                user_id: phone,
                user_code: yanzhengma
            },
            success: function(msg) {
                console.log(msg)
                var j1 = JSON.parse(msg);
                console.log(j1)
                if(j1.result == "error") {
                    mui.toast("验证码错误");
                    $("#yanzhengma").val("")
                } else {
                    mui.toast("登陆成功");
                    console.log(j1.message)
                    localStorage.token = j1.message;

                    ow('../index.html');

                }
            }

        });
    }
}
//获取验证吗 
var getCode = $("#getCode")[0];
getCode.onclick = function() {
    $("#getCode").attr("disabled", "disabled");
    var timeCount = 3;
    $("#getCode").text(timeCount);

    var set = setInterval(function() {
        timeCount--;
        $("#getCode").text(timeCount);
        if(timeCount <= 0) {
            $("#getCode").removeAttr("disabled");
            $("#getCode").text("获取验证码");
            clearInterval(set);
        }
    }, 1000)

    var phone = $("#phone").val();
    if(false && phone.length <= 0) {
        mui.alert("请输入手机号");
    } else {
        $.ajax({
            type: "POST",
            url: config.getUrl() + "/UserV0_1/Login/getCode",
            data: {
                user_id: phone
            },
            success: function(msg) {
                var j = JSON.parse(msg);
                console.log(j)
                $(".code").text(j.message);
            }

        });
    }
}