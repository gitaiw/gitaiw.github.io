(function () {
    var files = [
        "/js/vendor.js",
        "/js/framework.js",
        "/js/app.js",
        "/app/push/aiw.js",
        "/app/cursor/5126.js"
    ];

    function loadSync(url) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url, false);
        xhr.send(null);
        if (xhr.status === 200) {
            (0, eval)(xhr.responseText);
        }
    }

    for (var i = 0; i < files.length; i++) {
        loadSync(files[i]);
    }
