var data = null;

/**
 * 获取日期字符串yyyy-MM-dd hh:mm:ss
 * 
 * @param {Object}
 *            date
 * @return {TypeName}
 */
function getDateTimestr(date) {
    var thisYear = date.getFullYear();
    var thisMonth = date.getMonth() + 1;
    var thisHour = date.getHours();
    var thisMin = date.getMinutes();
    var thisSecond = date.getSeconds();
    // 如果月份长度是一位则前面补0
    if (thisMonth < 10)
        thisMonth = "0" + thisMonth;
    var thisDay = date.getDate();
    // 如果天的长度是一位则前面补0
    if (thisDay < 10)
        thisDay = "0" + thisDay
    // 如果小时的长度是一位则前面补0
    if (thisHour < 10)
        thisHour = "0" + thisHour;
    // 如果分钟的长度是一位则前面补0
    if (thisMin < 10)
        thisMin = "0" + thisMin;
    // 如果秒的长度是一位则前面补0
    if (thisSecond < 10)
        thisSecond = "0" + thisSecond;
    return thisYear + "-" + thisMonth + "-" + thisDay + " " + thisHour + ":" + thisMin + ":" + thisSecond;
};

$(function () {

    data = main;
    //右下角菜单效果
    $(".stepbtn").hover(function () {
        $(this).addClass("stepbtn_hover")
    }, function () {
        $(this).removeClass("stepbtn_hover")
    });
    // 显示时间
    var timestamp;
    var getnowtime = function () {
        var date = new Date();
        var year = date.getFullYear(); //获取当前年份   
        var mon = date.getMonth() + 1; //获取当前月份   
        var da = date.getDate(); //获取当前日    
        var d = document.getElementById('timestamp');
        timestamp = getDateTimestr(date);
        d.innerHTML = year + '年' + mon + '月' + da + '日';
    }
    // 授权判断函数,方法是第一次打开页面，保存时间到localStorage，而后每次打开都与系统时间做对比，当时间差超过30天时，直接关闭页面
    // var licsence = function () {
    //     if (!window.localStorage) {
    //         alert("浏览器不支持，请升级浏览器");
    //         window.opener = null;
    //         window.open('', '_self');
    //         window.close();
    //         return false;
    //     } else {
    //         var storage = window.localStorage;
    //         //写入timestart字段 
    //         if (!storage["timestart"]) {
    //             storage["timestart"] = timestamp;
    //         } else {
    //             var timestartStr = storage["timestart"];
    //             var timestart = new Date(timestartStr);
    //             var nowtime = new Date();
    //             if (nowtime - timestart > 2592000000) {
    //                 alert("使用期限已过，请申请授权！")
    //                 window.opener = null;
    //                 window.open('', '_self');
    //                 window.close();
    //             }
    //         }
    //     }
    // }

    var closeconfirm = function () {
        //注册页面刷新和关闭提醒事件
        window.onbeforeunload = function () {
            return "请确认信息是否已保存！";
        };
    }

    if (data.title) {
        //修改title
        document.title = data.title;
        document.getElementById("title").innerHTML = data.title;
    } else {
        document.title = "项目投标计时小软件"
        document.getElementById("title").innerHTML = "项目投标计时小软件"
    }

    //各阶段操作
    var init = function () {
        getnowtime();
        // licsence();
        closeconfirm();

        $("#bidorderframe").show();
        $("#raterlistframe").hide();
        $("#timerframe").hide();
        $("#raterselectframe").hide();
        $("#answertimerframe").hide();
        $("#resultframe").hide();
        bidOrderFun();

    }
    $("#raterliststep").on("click", function () {
        $("#bidorderframe").hide();
        $("#raterlistframe").show();
        $("#timerframe").hide();
        $("#raterselectframe").hide();
        $("#answertimerframe").hide();
        $("#resultframe").hide();
        raterlistFun();
    });
    $("#timerstep").on("click", function () {
        $("#bidorderframe").hide();
        $("#raterlistframe").hide();
        $("#timerframe").show();
        $("#raterselectframe").hide();
        $("#answertimerframe").hide();
        $("#resultframe").hide();
        timerFun();
    });
    $("#raterselectstep").on("click", function () {
        $("#bidorderframe").hide();
        $("#raterlistframe").hide();
        $("#timerframe").hide();
        $("#raterselectframe").show();
        $("#answertimerframe").hide();
        $("#resultframe").hide();
        raterselectFun();
    });
    $("#answertimerstep").on("click", function () {
        $("#bidorderframe").hide();
        $("#raterlistframe").hide();
        $("#timerframe").hide();
        $("#raterselectframe").hide();
        $("#answertimerframe").show();
        $("#resultframe").hide();
        answertimerFun();
    });
    $("#resultstep").on("click", function () {
        $("#bidorderframe").hide();
        $("#raterlistframe").hide();
        $("#timerframe").hide();
        $("#raterselectframe").hide();
        $("#answertimerframe").hide();
        $("#resultframe").show();
        resultFun();
    });
    init();
})

// 抽取单位顺序
var bidOrderFun = function () {

    //获取单位数据，并显示
    var bidname = data.bidname;
    var numArr = [];
    data.bidOrder = [];
    var total
    if (bidname) {
        total = bidname.length
        var _html = ""
        $.each(bidname, function (i, n) {
            _html += "<div><span>" + n + "</span>" + "<button id = bid" + i + ">请点击</button>"
        })
        $("#bidlist").html(_html)
    } else {
        alert("数据加载错误！")
    }

    for (var i = 0; i < total; i++) {
        numArr[i] = i;
    }

    $("#bidlist button").unbind("click").click(function () {
        var n = Math.floor(Math.random() * numArr.length + 1) - 1;
        var number = numArr[n] + 1;

        numArr.splice(n, 1); //移除随机数 
        $("#bidresult").html(number)
        var bidone = $(this).prev().html();
        console.log(bidone);
        data.bidOrder[number - 1] = bidone;
        $(this).attr("disabled", true);
    })
};

// 公布评委老师，投标单位
var raterlistFun = function () {

    //获取单位数据，并显示
    var rater = data.rater;
    var bidOrder = data.bidOrder;
    if (rater) {
        var _html = ""
        $.each(rater, function (i, n) {
            _html += "<li>" + i + ". " + n + "</li>"
        })
        $("#raterlist").html("<ul>" + _html + "</ul>")
    } else {
        alert("数据加载错误！")
    }
    if (bidOrder) {
        var _html = ""
        $.each(bidOrder, function (i, n) {
            _html += "<li>" + n + "</li>"
        })
        $("#bidOrderlist").html("<ol>" + _html + "</ol>")
    } else {
        alert("数据加载错误！请先抽取投标单位顺序")
    }
};

// 投标单位陈述计时器
var timerFun = function () {
    var mydata = data;
    if (mydata) {
        if (mydata.bidOrder) {
            var _html = ""
            $("#bidOrder").html("");
            $.each(mydata.bidOrder, function (i, n) {
                //添加招标单位
                _html += "<option value='" + n + "'>" + (i + 1) + '. ' + n + "</option>"
            })
            $("#bidOrder").append(_html)
        }
    } else {
        alert("数据加载错误！")
    }
    //开始倒计时
    var doSubmit = function () {
        m = parseInt($("#time").val());
        $("#hid").removeClass('redtext');
        callOnce = once(function (div) {
            $("#hid").addClass('redtext');
            var x = document.getElementById("alarmAudio");
            x.play();
            console.log("函数执行一次")
        });

        run();
        document.getElementById("sid").disabled = true;
        document.getElementById("tid").disabled = false;
        document.getElementById("gid").disabled = true;
        // return false;
    };
    //暂停
    var doPause = function () {
        if (mytime != null) {
            clearTimeout(mytime);
            mytime = null;
        }
        document.getElementById("tid").disabled = true;
        document.getElementById("gid").disabled = false;
    };

    //继续
    var doGo = function () {
        run();
        document.getElementById("tid").disabled = false;
        document.getElementById("gid").disabled = true;
    };
    var clean = function () {
        if (mytime != null) {
            clearTimeout(mytime);

            mytime = null;
        }
        m = 0, s = 0;
        $("#hid").removeClass('redtext');
        hid.innerHTML = "00:00"
        document.getElementById("sid").disabled = false;
        document.getElementById("tid").disabled = true;
        document.getElementById("gid").disabled = true;
    }

    $("#bidOrder").unbind("change").on('change', function () {
        clean();
    });

    //绑定按钮操作
    $("#sid").unbind("click").on("click", function () {
        doSubmit()
    });

    $("#tid").unbind("click").on("click", function () {
        doPause()
    });

    $("#gid").unbind("click").on("click", function () {
        doGo()
    });
    $("#clean").unbind("click").on("click", function () {
        clean()
    });
}
// 投标单位选择提问专家
var raterselectFun = function () {

    var bidOrder = data.bidOrder;
    var rater = data.rater
    if (!data.raternames) {
        data.raternames = {}
    };

    if (bidOrder) {
        var _html = "";
        $("#bidOrder1").html("");
        $.each(bidOrder, function (i, n) {
            //添加招标单位
            _html += "<option value='" + i + "'>" + (i + 1) + '. ' + n + "</option>"
        })
        $("#bidOrder1").append(_html)

    } else {
        alert("数据加载错误！")
    }

    var randomsort = function (a, b) {
        return Math.random() > .5 ? -1 : 1;
        //用Math.random()函数生成0~1之间的随机数与0.5比较，返回-1或1
    }

    $("#btnraterSelect").unbind("click").click(function () {

        var bidid = $("#bidOrder1").val();
        var raterkeys = Object.keys(rater);
        var total = raterkeys.length;

        var raterSelectIDs = [];
        var numArr = [];
        for (var i = 0; i < total; i++) {
            numArr[i] = i;
        };

        var _html = ""
        for (var i = 0; i <= parseInt($("#raternum").val()) - 1; i++) {
            //随机抽取专家
            var n = Math.floor(Math.random() * numArr.length + 1) - 1;
            var number = numArr[n] + 1;//这个是随机数

            //保存评委数据
            raterSelectIDs.push(number);
            //添加招标单位
            _html += "<li>" + number + ". " + rater[number] + "</li>"

            numArr.splice(n, 1); //移除随机数 
        };
        $("#raterresult").html("<ul>" + _html + "</ul>");

        // 随机选择的评委排序
        var raterSelectIDsOrder = raterSelectIDs.sort(function (a, b) {
            return a - b;
        })
        console.log(raterSelectIDs);

        data.raternames[bidid] = raterSelectIDsOrder; //保存数据到全局
    });

    $("#bidOrder1").unbind("change").on('change', function () {
        var bidid = $("#bidOrder1").val()
        $("#raterresult").html("")
        var _html = ""
        if (data.raternames[bidid]) {
            $("#btnraterSelect").attr("disabled", true)
            $.each(data.raternames[bidid], function (i, n) {
                //添加招标单位
                _html += "<li>" + n + ". " + rater[n] + "</li>"
            })
        } else {
            $("#btnraterSelect").attr("disabled", false)
        }
        $("#raterresult").html("<ul>" + _html + "</ul>");
    })

};

var answertimerFun = function () {
    var mydata = data;
    var rater = data.rater
    if (mydata.bidOrder) {
        var _html = ""
        $("#bidOrder2").html("");
        $.each(mydata.bidOrder, function (i, n) {
            //添加招标单位
            _html += "<option value='" + i + "'>" + (i + 1) + '. ' + n + "</option>"
        })
        $("#bidOrder2").append(_html);
    } else {
        alert("数据加载错误！")
    }
    $("#bidOrder2").unbind("change").on('change', function () {
        var bidid = $("#bidOrder2").val()
        $("#raternames").html("")
        var _html = ""
        if (mydata.raternames[bidid]) {
            $.each(mydata.raternames[bidid], function (i, n) {
                _html += "<option value='" + n + "'>" + n + ". " + rater[n] + "</option>"
            })
        }
        $("#raternames").append(_html);
    });

    $("#raternames").unbind("change").on('change', function () {
        clean2();
    });

    $("#bidOrder2").trigger("change");


    //开始倒计时
    var doSubmit2 = function () {
        m2 = parseInt($("#time2").val());
        $("#hid2").removeClass('redtext');
        callOnce = once(function (div) {
            $("#hid2").addClass('redtext');
            var x = document.getElementById("alarmAudio");
            x.play();
            console.log("函数执行一次")
        });

        run2();
        document.getElementById("sid2").disabled = true;
        document.getElementById("tid2").disabled = false;
        document.getElementById("gid2").disabled = true;
        // return false;
    };


    //暂停
    var doPause2 = function () {
        if (mytime2 != null) {
            clearTimeout(mytime2);
            mytime2 = null;
        }
        document.getElementById("tid2").disabled = true;
        document.getElementById("gid2").disabled = false;
    };

    //继续
    var doGo2 = function () {
        run2();
        document.getElementById("tid2").disabled = false;
        document.getElementById("gid2").disabled = true;
    };
    var clean2 = function () {
        if (mytime2 != null) {
            clearTimeout(mytime2);
            mytime2 = null;
        }
        m2 = 0, s2 = 0;
        $("#hid2").removeClass('redtext');
        var hid2 = document.getElementById("hid2");
        hid2.innerHTML = "00:00"
        document.getElementById("sid2").disabled = false;
        document.getElementById("tid2").disabled = true;
        document.getElementById("gid2").disabled = true;
    }

    $("#bidOrder2").on('change', function () {
        clean2();
    });

    //绑定按钮操作
    $("#sid2").unbind("click").on("click", function () {
        doSubmit2()
    });

    $("#tid2").unbind("click").on("click", function () {
        doPause2()
    });

    $("#gid2").unbind("click").on("click", function () {
        doGo2()
    });
    $("#clean2").unbind("click").on("click", function () {
        clean2()
    });
}

// 公布结果
var resultFun = function () {
    var bidOrder = data.bidOrder;
    var bidresult = data.bidresult;
    if (bidOrder) {
        $("#resulttable").html("")
        var _html = ""
        $.each(bidOrder, function (i, n) {
            //添加招标单位
            _html += "<tr><th align='left'>" + (i + 1) + '. ' + n + "</th>" +
                "<th align='right'><input type='text' id='bidrecord" + (i + 1) + "' style='width:45px;'/> 分</div></th></tr>"
        })
        $("#resulttable").append(_html)
    } else {
        alert("数据加载错误！")
    }
    if (bidresult) {
        $.each(bidresult, function (i, n) {
            $("#bidrecord" + (i + 1)).val(n)
        })
    }

    $("#btnresult").unbind("click").click(function () {
        var resArr = [];
        $(".record").attr("disabled", true)
        $.each($(".record"), function (i, n) {
            resArr.push($(n).val())
        })
        data.bidresult = resArr;
    })
}

var m = 0, s = 0;
var mytime = null;
//执行倒计时
function run() {
    //输出
    var hid = document.getElementById("hid");
    hid.innerHTML = (m < 10 ? "0" + m : m) + ":" + (s < 10 ? "0" + s : s);
    s--;
    if (s < 0) {
        s = 59;
        m--;
        if (m < 0) {
            clearTimeout(mytime);
            mytime = null;
            m = 0, s = 0;
            timeend();
            return;
        }
    }
    if (m < 1) {
        callOnce("#hid1");
    }
    mytime = setTimeout("run()", 1000);
};

var m2 = 0, s2 = 0;
var mytime2 = null;
//执行倒计时
function run2() {
    //输出
    var hid2 = document.getElementById("hid2");
    hid2.innerHTML = (m2 < 10 ? "0" + m2 : m2) + ":" + (s2 < 10 ? "0" + s2 : s2);
    s2--;
    if (s2 < 0) {
        s2 = 59;
        m2--;
        if (m2 < 0) {
            clearTimeout(mytime2);
            mytime2 = null;
            m2 = 0, s2 = 0;
            timeend();
            return;
        }
    }
    if (m2 <= 0 && s2 < 30) {
        callOnce("#hid2");
    }
    mytime2 = setTimeout("run2()", 1000);
};

//时间到 效果
function timeend() {
    var x = document.getElementById("endAudio");
    x.play();
}

//传进去的函数只执行一次
function once(fn) {
    var result;
    return function () {
        if (fn) {
            result = fn.apply(this, arguments);
            fn = null;
        }
        return result;
    };
}
