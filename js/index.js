$(function () {
    load();
    $(".title").on("keydown", function (event) {
        if (event.keyCode === 13) {
            if ($(this).val() === "") {
                alert("请输入您要的操作");
            } else {
                // 先读取本地存储原来的数据
                var local = getdata();
                // console.log(local);
                // 把local数组进行更新数据 把最新的数据追加给local数组
                var val = $(this).val();
                local.push({ title: val, done: false });
                // 把这个数组local 存储给本地存储
                savedata(local);
                // 2. toDoList 本地存储数据渲染加载到页面
                load();
                $(this).val("");
            }
        }
    })
    $("ol,ul").on("click", "a", function () {
        var data = getdata();
        var index = $(this).attr("id");
        console.log(index);
        data.splice(index, 1);
        savedata(data);
        load();

    })
    // todolist进行状态
    $("ul,ol").on("click", "input", function () {
        var data = getdata();
        var index = $(this).siblings("a").attr("id");
        data[index].done = $(this).prop("checked");
        savedata(data);
        load();
    })
    function getdata() {
        var data = localStorage.getItem("todolist");
        if (data !== null) {
            return JSON.parse(data);
        } else {
            return [];
        }
    }
    function savedata(data) {
        localStorage.setItem("todolist", JSON.stringify(data));
    }

    function load() {
        var data = getdata();
        $("ul,ol").empty();
        var todocount=0;
        var donecount=0;
        $.each(data, function (i, n) {
            if (n.done) {
                $("ul").prepend("<li><input type='checkbox' checked='checked'><p>" +
                    n.title + "</p><a href='javascript:;' id=" + i + "></a></li>");
                    donecount++;
            } else {
                $("ol").prepend("<li><input type='checkbox' ><p>" +
                    n.title + "</p><a href='javascript:;' id=" + i + "></a></li>");
                    todocount++;
            }
        })
        $("#todocount").text(todocount);
        $("#donecount").text(donecount);
    }
})
