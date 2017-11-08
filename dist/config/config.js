var config = function() {

    //  var ip = 'http://192.168.1.196';
    //     var ip = 'http://192.168.1.196';
    var ip = 'http://120.78.162.200';

    var obj = {
        getUrl: function() {

            return ip + '/index.php';
        },
        getIp: function() {
            return ip;
        },
        getGroup: function() {
            return ip + '/index.php/UserV0_1/';
        },
        debug: false
    }

    $('html').on('click', function() {
        if(obj.debug) {
            location.reload()
        }

    })

    return obj;

}();

//格式化时间戳
function getLocalTime(nS) {
    return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ');
}

function ow(url, aniShow) {

    mui.openWindow({
        url: url,
        id: url.split(".")[0],
        createNew: false,
        show: {
            aniShow: aniShow != null ? aniShow : 'fade-in',
            duration: 300,
            autoShow: true,
        },
        waiting: {
            autoShow: false
        }
    });
}