//================================
//================================
//================================
//================================
//================================
//首页推荐
var goodsIndexApp = new Vue({
    el: '#goodsIndexApp',
    data: {
        items: []
    },
    methods: {

        update: function(f) {
            var _this = this;
            $.post(config.getGroup() + "Recommend/get", {}, function(res) {
                res = JSON.parse(res);
                _this.items = res.message;
                if(f != null) {
                    f();
                }
            });
        },
        open: function(index) {

            localStorage.goods_id = this.items[index].goods_id;
            ow("view/goodsInfo.html");

        },
        getImg: function(index) {
            console.log(this.items[index].head_img);
            return config.getIp() + this.items[index].head_img;
        }

    }
})
goodsIndexApp.update();
var userInfoCenter = new Vue({
    el: '#userInfoCenter',
    data: {
        info: []
    },
    methods: {

        update: function(f) {
            var _this = this;
            $.post(config.getGroup() + "User/getInfo", {}, function(res) {
                res = JSON.parse(res);
                _this.info = res.message;
                if(f != null) {
                    f();
                }
            });
        },
        open: function(index) {
            localStorage.goods_id = this.items[index].goods_id;
            ow("view/goodsInfo.html");
        },
        getImg: function(index) {

            return config.getIp() + this.items[index].head_img;
        }

    }
})
userInfoCenter.update();

//================================
//================================
//================================
//================================
//================================
//分类展示app
var classApp1 = new Vue({
    el: '#class1App',
    data: {
        items: []
    },
    methods: {
        update: function(f) {
            var _this = this;
            $.get(config.getGroup() + 'Class/getClassList1', function(result) {

                result = JSON.parse(result);
                if(result.result == 'success') {
                    _this.items = result.message;
                    classApp2.update(_this.items[0].class_id);
                } else {
                    _this.items = [];
                }
                if(f != null) {
                    f();
                }
            });

        },
        showClass2: function(index) {
            var id = this.items[index].class_id;
            $('.class-item-1').removeClass('active');
            $('#' + id).addClass('active');
            classApp2.update(id);
        }
    }
});
classApp1.update();
var classApp2 = new Vue({
    el: '#class2App',
    data: {
        items: []
    },
    methods: {
        update: function(super_id) {
            var _this = this;
            $.get(config.getGroup() + 'Class/getClassList2', {
                super_id: super_id
            }, function(result) {
                result = JSON.parse(result);
                if(result.result == 'success') {
                    _this.items = result.message;
                } else {
                    _this.items = [];
                }

            });

        },
        getImg: function(index) {
            return config.getIp() + this.items[index].head_img;
        }
    }
});

//================================
//================================
//================================
//================================
//================================
//品牌app
var brandIndexApp = new Vue({
    el: '#brandIndexApp',
    data: {
        items: []
    },
    methods: {

        update: function(f) {
            var _this = this;
            $.get(config.getGroup() + "Brand/getList", {

            }, function(res) {
                res = JSON.parse(res);
                _this.items = res.message;
                console.log(_this)

                if(f != null) {
                    f();
                }
            })

        },
        open: function(index) {

        },
        getImg: function(index) {
            return config.getIp() + this.items[index].head_img;
        },
        getTime: function(index) {
            return getLocalTime(this.items[index].add_time);
        },
        getUserHead: function(index) {
            return config.getIp() + this.items[index].head_img_url;
        }

    }
})
brandIndexApp.update();

//================================
//================================
//================================
//================================
//================================
//发现app
var dynamicIndexApp = new Vue({
    el: '#dynamicIndexApp',
    data: {
        items: []
    },
    methods: {

        update: function(f) {
            var _this = this;
            $.get(config.getGroup() + "Dynamic/getList", {}, function(res) {
                res = JSON.parse(res);
                _this.items = res.message;

                if(f != null) {
                    f();
                }
            })

        },
        open: function(index) {

        },
        getImg: function(index) {
            return config.getIp() + this.items[index].head_img;
        },
        getTime: function(index) {
            return getLocalTime(this.items[index].add_time);
        },
        getUserHead: function(index) {
            return config.getIp() + this.items[index].head_img_url;
        }

    }
})
dynamicIndexApp.update();

//================================
//================================
//================================
//================================
//================================
//购物袋app
mui.init({
    gestureConfig: {
        // tap: true, //默认为true
        // doubletap: true, //默认为false
        longtap: true, //默认为false
        // swipe: true, //默认为true
        // drag: true, //默认为true
        // hold: true,//默认为false，不监听
        // release: false//默认为false，不监听
    }
});

var shopBagIndexApp = new Vue({
    el: '#shopBagIndexApp',
    data: {
        items: [],
        sumMoney: 0,
        isall: false
    },
    methods: {

        del: function(index) {
            var goods_id = this.items[index].goods_id;
            var bag_id = this.items[index].bag_id;
            var _this = this;

            mui.confirm('是否删除商品？', function(e) {

                if(e.index == 1) {
                    $.post(config.getGroup() + 'ShoppingBag/removeBag', {
                        token: localStorage.token,
                        bag_id: bag_id,
                        goods_id: goods_id,

                    }, function(result) {

                        result = JSON.parse(result);
                        if(result.result == 'success') {
                            mui.toast('删除成功！');
                            _this.update();
                        } else {
                            mui.toast('删除失败！');

                        }

                    });
                }

            });

        },
        update: function(f) {

            var _this = this;
            $.post(config.getGroup() + "ShoppingBag/showList", {
                "token": localStorage.token
            }, function(res) {

                res = JSON.parse(res);
                _this.items = res.message;
                _this.getSum();
                if(f != null) {
                    f();
                }
            })

        },
        addNum: function(index) {
            var _this = this;
            this.items[index].num++;

            var num = this.items[index].num;
            var goods_id = this.items[index].goods_id;

            $.post(config.getGroup() + 'ShoppingBag/saveBagNum', {
                token: localStorage.token,
                num: num,
                goods_id: goods_id,
            }, function(result) {

                result = JSON.parse(result);
                if(result.result == 'success') {
                    _this.update();
                } else {
                    mui.toast('修改失败！');

                }

            });

        },
        subNum: function(index) {
            var _this = this;

            if(this.items[index].num <= 0) {
                this.del(index);
                this.items[index].num = 0;

            } else {

                this.items[index].num--;

                var num = this.items[index].num;
                var goods_id = this.items[index].goods_id;

                $.post(config.getGroup() + 'ShoppingBag/saveBagNum', {
                    token: localStorage.token,
                    goods_id: goods_id,
                    num: num,
                }, function(result) {

                    result = JSON.parse(result);
                    if(result.result == 'success') {
                        _this.update();
                    } else {
                        mui.toast('修改失败！');
                    }

                });
            }
        },
        getImg: function(index) {

            return config.getIp() + this.items[index].head_img;

        },
        getSum: function() {

            var sum = 0;
            for(var key in this.items) {
                var price = parseFloat(this.items[key].price) * this.items[key].num;
                sum += price;
            }
            shopBagIndexApp.sumMoney = sum;

        },
        checkall: function() {

            for(var key in this.items) {
                this.items[key].ischeck = !this.isall;
            }

        },
        postOrder: function() {

            var arr = []

            for(var key in this.items) {
                if(this.items[key].ischeck) {
                    arr.push(this.items[key].goods_id);
                }
            }
            /**
             * 在此添加去订单页面的代码
             */
            if(arr.length > 0) {
                $.ajax({
                    type: "post",
                    url: config.getGroup() + "Order/add",
                    data: {
                        goodsAll: arr,
                        "token": localStorage.token
                    },
                    success: function(msg) {

                        msg = JSON.parse(msg);

                        localStorage.order_id = msg.message;

                        ow('view/addOrder.html');

                    }
                });
            } else {
                mui.alert('请选择商品');
            }

        }
    }
});

shopBagIndexApp.update();