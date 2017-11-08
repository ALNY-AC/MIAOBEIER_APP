//================================
//================================
//================================
//================================
//================================
//购物袋app

var userOrderApp = new Vue({
    el: '#userOrderApp',
    data: {
        list: [
            [],
            [],
            [],
            [],
            []
        ]

    },
    methods: {
        update: function() {

            var _this = this;

            $.post(config.getUrl() + '/UserV0_1/Order/showList', {
                token: localStorage.token
            }, function(result) {

                result = JSON.parse(result);
                var msg = result.message;

                console.log(msg);

                // 1：待付款 2：待发货 3：待收货 4：完成 5：售后处理（退换货） 6：已退货 7：已退款

                for(var i = 0; i < 5; i++) {
                    // _this.list[i] = [];
                    _this.list[i].splice(0, _this.list[i].length); //清空数组 
                }
                _this.list[0] = msg;

                for(var x in msg) {
                    var state = msg[x].order_info.state;

                    if(state <= 4) {
                        _this.list[state].push(msg[x]);
                    }

                }
            })

        },
        getTime: function(time) {
            return getLocalTime(time);

        },
        getList: function(index) {
            var _this = this;
            return this.list[index];
        },
    },

});
userOrderApp.update();

(function($) {
    //阻尼系数
    var deceleration = mui.os.ios ? 0.003 : 0.0009;
    $('.mui-scroll-wrapper').scroll({
        bounce: false,
        indicators: true, //是否显示滚动条
        deceleration: deceleration
    });
    $.ready(function() {

        $.each($('.mui-slider-item'), function(index, pullRefreshEl) {
            $(pullRefreshEl).pullToRefresh({
                down: {
                    callback: function() {
                        var self = this;
                        self.endPullDownToRefresh();
                        userOrderApp.update();

                    }
                }
            });
        });

    });
})(mui);

// // /UserV0_1/Order/showList all
// var userOrderAppAll = new Vue({
//     el: '#userOrderAppAll',
//     data: {
//         list: []
//     },
//     methods: {
//         update: function () { }
//     }
// });

// var userOrderApp1 = new Vue({
//     el: '#userOrderApp1',
//     data: {
//         list: []
//     },
//     methods: {
//         update: function () { }
//     }
// });

// var userOrderApp2 = new Vue({
//     el: '#userOrderApp2',
//     data: {
//         list: []
//     },
//     methods: {
//         update: function () { }
//     }
// });

// var userOrderApp3 = new Vue({
//     el: '#userOrderApp3',
//     data: {
//         list: []
//     },
//     methods: {
//         update: function () { }
//     }
// });

// var userOrderApp4 = new Vue({
//     el: '#userOrderApp4',
//     data: {
//         list: []
//     },
//     methods: {
//         update: function () { }
//     }
// });

// var appList = {
//     'userOrderAppAll': userOrderAppAll,
//     'userOrderApp1': userOrderApp1,
//     'userOrderApp2': userOrderApp2,
//     'userOrderApp3': userOrderApp3,
//     'userOrderApp4': userOrderApp4,
//     // 'userOrderApp5': userOrderApp5, 'userOrderApp6': userOrderApp6,
//     // 'userOrderApp7': userOrderApp7

// }
// getList();

// function getList() {

//     $
//         .post(config.getUrl() + '/UserV0_1/Order/showList', {
//             token: localStorage.token
//         }, function (result) {
//             result = JSON.parse(result);
//             var msg = result.message;
//             console.log(msg);

//             // 1：待付款 2：待发货 3：待收货 4：完成 5：售后处理（退换货） 6：已退货 7：已退款

//             for (var x in appList) {
//                 appList[x].list = []

//             }

//             userOrderAppAll.list = msg;

//             for (var x in msg) {
//                 var state = msg[x].state;
//                 appList['userOrderApp' + state]
//                     .list
//                     .push(msg[x]);
//             }

//             console.log(appList);

//             if (result.result == 'success') {

//                 this.list = result.message;

//             } else {

//                 //错误 mui.

//             }

//         })

// }
// (function ($) {
//     //阻尼系数
//     var deceleration = mui.os.ios ? 0.003 : 0.0009;
//     $('.mui-scroll-wrapper').scroll({
//         bounce: false,
//         indicators: true, //是否显示滚动条
//         deceleration: deceleration
//     });
//     $.ready(function () {

//         $.each($('.mui-slider-item'), function (index, pullRefreshEl) {
//             $(pullRefreshEl).pullToRefresh({
//                 down: {
//                     callback: function () {
//                         var self = this;
//                         console.log(index);
//                         console.log(pullRefreshEl);
//                         self.endPullDownToRefresh();

//                     }
//                 }
//             });
//         });

//     });
// })(mui);