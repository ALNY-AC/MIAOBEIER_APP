// goodsApp = dateBuilder.init({
//     url: "/UserV0_1/Goods/getGoods",
//     type: "get",
//     el: "#goodsApp",
//     data: {
//         "goods_id": localStorage.goods_id
//     }

// });
// goodsApp.update();

// GoodsInfoApp = dateBuilder.init({
//     url: "/UserV0_1/GoodsInfo/getGoodsInfo",
//     type: "get",
//     el: "#GoodsInfoApp",
//     data: {
//         "goods_id": localStorage.goods_id
//     }

// });
// GoodsInfoApp.update();

//商品详情
var goodsInfoApp = new Vue({
    el: '#goodsInfoApp',
    data: {
        body: {
            list: []
        }
    },
    methods: {
        update: function() {
            var _this = this;
            $.get(config.getGroup() + 'GoodsInfo/getGoodsInfo', {
                "goods_id": localStorage.goods_id
            }, function(result) {
                result = JSON.parse(result);

                if(result.result == 'success') {
                    _this.body.list = result.message;
                } else {
                    _this.body.list = []
                }

            })

        },
        getHeadImg: function(index) {
            return config.getIp() + this.body.list[idnex].head_img;

        },
        getContent: function() {
            _this.body.list.content = $(_this.body.list.content).css('word-break', 'break-all').html();
        }
    }
});
goodsInfoApp.update();

//商品信息
var goodsApp = new Vue({

    el: '#goodsApp',
    data: {
        body: {
            list: []
        }
    },
    methods: {
        update: function() {

            var _this = this;
            $.get(config.getGroup() + 'Goods/getGoods', {
                "goods_id": localStorage.goods_id
            }, function(result) {
                result = JSON.parse(result);
                if(result.result == 'success') {
                    _this.body.list = result.message;
                } else {
                    _this.body.list = []
                }

            })

        },
        getHeadImg: function() {

            return config.getIp() + this.body.list.head_lg_img;

        }
    }

});
goodsApp.update();