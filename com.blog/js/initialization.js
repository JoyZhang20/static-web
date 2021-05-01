initialization();

function initialization() {
    //head article and foot article
    $.ajax({
        type: "GET",
        url: "http://8.140.103.17:8830/allFootArticle",
        dataType: "json",
        contentType: "application/json",
        async: true,
        data: {},
        success: function(data) {
            var article = [];
            article = data;
            var titleArticleString = "";
            var footArticleString = "";
            titleArticleString += "<a href='#blog-single' class='blog-desc'>" +
                article[1].title + "</a><div class='author align-items-center mt-3 mb-1'>" +
                article[1].content + "</div><ul class='blog-meta'><li class='meta-item blog-lesson'><span class='meta-value'>" +
                article[1].time + "</span></li><li class='meta-item blog-students'><span class='meta-value'>read</span></li></ul>";

            footArticleString += "<a href='#blog-single' class='blog-desc-big'>" +
                article[0].title + "</a>" + "<div class='author align-items-center mt-4 mb-1'>" +
                article[0].content + "</div><ul class='blog-meta'>" + "<li class='meta-item blog-lesson'><span class='meta-value'>" +
                article[0].time + "</span>" + "</li><li class='meta-item blog-students'><span class='meta-value'>read</span></li></ul>";

            document.getElementById("tbodydata3").innerHTML = titleArticleString;
            document.getElementById("tbodydata4").innerHTML = footArticleString;
        }
    });
    //head article and foot article

    //reading note part
    $.ajax({
        type: "GET",
        url: "http://8.140.103.17:8830/allReadingNote",
        dataType: "json",
        contentType: "application/json",
        async: true,
        data: {},
        success: function(data) {
            var readingNote = [];
            readingNote = data;
            var readingNoteString = "";

            for (var i = readingNote.length - 1; i >= (readingNote.length < 4 ? 0 : readingNote.length - 3); i--) {
                if (i == readingNote.length - 1) {
                    readingNoteString += " <div class='grids5-info'>";
                } else {
                    readingNoteString += " <div class='grids5-info mt-5'>";
                }
                readingNoteString += "<a href='#blog-single' class='d-block zoom'><img src='img/" +
                    "" + (i + 1) + ".jpg' alt='' class='img-fluid radius-image news-image'></a>" +
                    "<div class='blog-info align-self'><a href='#blog-single' " +
                    "class='blog-desc1'>" + readingNote[i].title + "</a><div class='author " +
                    "align-items-center mt-3 mb-1'>" + readingNote[i].content + "</div><ul class=" +
                    "'blog-meta'><li class='meta-item blog-lesson'><span " +
                    "class='meta-value'>" + readingNote[i].time + " " +
                    "</span></li><li class='meta-item blog-students'>" +
                    "<span class='meta-value'>read</span></li></ul></div></div>";
            }

            document.getElementById("tbodydata2").innerHTML = readingNoteString;
        }
    });
    //reading note part


    //recent thinking part
    $.ajax({
        type: "GET",
        url: "http://8.140.103.17:8830/allRecentThinking",
        dataType: "json",
        contentType: "application/json",
        async: true,
        data: {},
        success: function(data) {
            var recentThinking = [];
            recentThinking = data;
            var recentThinkingString = "";

            recentThinkingString += "<h3 class='section-title-left'>最近在想</h3>";
            for (var i = recentThinking.length - 1; i >= (recentThinking.length < 5 ? 0 : recentThinking.length - 4); i--) {
                recentThinkingString += "<div class='grids5-info'><h4>0" + (recentThinking.length - i) + ".</h4><div " +
                    "class='blog-info'><a href='#blog-single' class='blog-desc1'>" +
                    recentThinking[i].title + "</" + "a><div class='author align-items-center mt-2 mb-1'>" +
                    recentThinking[i].content + "</" + "div><ul><li class='meta-item blog" +
                    "-lesson'><span class='meta-value'> " + recentThinking[i].time + " </span></li>" +
                    "<li class='meta-item blog-students'>" + "<span class='meta-value'>read" +
                    "</span></li></ul></div></div>";
            }
            recentThinkingString += "<a href='recentThinking.html' class='btn btn-style btn-outline mt-4'>更多</a>";
            // <a href='recentThinking.html' class='btn btn-style btn-outline mt-4'>更多</a>
            document.getElementById("tbodydata1").innerHTML = recentThinkingString;
        }
    });
    //recent thinking part



}