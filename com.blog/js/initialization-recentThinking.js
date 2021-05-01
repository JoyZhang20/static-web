changePage(1);

function clearField() {
    document.getElementById("title").value = "";
    document.getElementById("content").value = "";
    document.getElementById("time").value = "";
    document.getElementById("delete-index").value = "";
}

function addNewThinking() {
    if (document.getElementById("title").value.length <= 0 || document.getElementById("content").value.length <= 0 || document.getElementById("time").value.length <= 0) {
        layui.use(['table'], function() {
            layer.msg('×');
        });
    } else {
        $.ajax({
            type: "post",
            dataType: 'text',
            url: "http://8.140.103.17:8830/addRecentThinking",
            contentType: "application/json;charset=utf-8",
            data: JSON.stringify({ 'title': document.getElementById("title").value, 'content': document.getElementById("content").value, 'time': document.getElementById("time").value }),
            async: false,
            success: function(data) {
                location.reload();
                clearField();
                // layui.use(['form'], function () {
                //     layer.msg('√');
                // });
                // location.reload();
            }
        });
    }
}

function deleteThinking() {
    var indexArray;
    $.ajax({
        type: "GET",
        dataType: 'json',
        url: "http://8.140.103.17:8830/allRecentThinking",
        contentType: "application/json;charset=utf-8",
        async: true,
        data: {},
        success: function(data) {
            indexArray = [data.length];
            for (var i = 0; i < data.length; i++) {
                indexArray[i] = data[i].id;
            }
            indexArray.reverse();
            // window.alert(indexArray[0]); 
            $.ajax({
                type: "GET",
                dataType: 'json',
                url: "http://8.140.103.17:8830/deleteRecentThinking?id=" + indexArray[document.getElementById("delete-index").value - 1],
                contentType: "application/json;charset=utf-8",
                async: false,
                data: {},
                success: function(data) {
                    // location.reload();
                    // clearField();
                }
            });
            location.reload();
            clearField();

        }
    });




}
// function sortObj(achearr) {
//     for (var i = 0; i <= achearr.length; i++) {
//         var a=i;
//         var b=i+1;
//         bchearr.sort(function (a, b) {
//         return a- b
//         })
//         }
// }
function changePage(pageTurn) {
    $.ajax({
        type: "GET",
        url: "http://8.140.103.17:8830/allRecentThinking",
        dataType: "json",
        contentType: "application/json",
        async: true,
        data: {},
        success: function(data) {

            var contentPrePage = 10;

            var recentThinking = [];
            recentThinking = data;
            var pageCount = parseInt(recentThinking.length / contentPrePage) + 1;
            // window.alert(pageCount);
            var recentThinkingString = "";
            var pageFreshString = "";

            // recentThinkingString += "<h3 class='section-title-left'>最近在想</h3>";

            // window.alert(recentThinking.length - 1 - (pageTurn - 1) * contentPrePage);
            // window.alert((pageCount = pageTurn ? 0 : recentThinking.length - pageTurn * contentPrePage));
            // window.alert((pageCount == pageTurn ? 0 : recentThinking.length - pageTurn * contentPrePage));

            for (var i = recentThinking.length - 1 - (pageTurn - 1) * contentPrePage; i >= (pageCount == pageTurn ? 0 : recentThinking.length - pageTurn * contentPrePage); i--) {
                recentThinkingString += "<div class='grids5-info'><h4>" + (recentThinking.length - i) + ".</h4><div " +
                    "class='blog-info'><a href='#blog-single' class='blog-desc1'>" +
                    recentThinking[i].title + "</" + "a><div class='author align-items-center mt-2 mb-1'>" +
                    recentThinking[i].content + "</" + "div><ul><li class='meta-item blog" +
                    "-lesson'><span class='meta-value'> " + recentThinking[i].time + " </span></li>" +
                    "<li class='meta-item blog-students'>" + "<span class='meta-value'>read" +
                    "</span></li></ul></div></div>";
            }
            if (pageCount > 1) {

                var cx = pageTurn - 1;
                if (cx == 0) {
                    cx = pageCount;
                }

                pageFreshString += "<ul class='page-pagination'>" + "<li><a class='next' href='#url' onclick='changePage(" + cx + ")'><span class='fa fa-angle-left'></span></a></li>";
                for (var i = 1; i <= pageCount; i++) {
                    if (i == pageTurn) {
                        pageFreshString += "<li><span aria-current='page' class='page-numbers current'>" + i + "</span></li>";
                    } else {
                        pageFreshString += "<li><a class='page-numbers' href='#url' onclick='changePage(" + i + ")'>" + i + "</a></li>";
                    }
                }
                pageFreshString += "<li><a class='next' href='#url' onclick='changePage(" + (pageTurn % 3 + 1) + ")'><span class='fa fa-angle-right'></span></a></li></ul>";
            }

            document.getElementById("tbodydata1").innerHTML = recentThinkingString;
            document.getElementById("tbodydata5").innerHTML = pageFreshString;

        }
    });



}