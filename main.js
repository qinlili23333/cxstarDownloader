// ==UserScript==
// @name         畅想之星下载器
// @namespace    https://qinlili.bid
// @version      0.2
// @description  导出为图片下载
// @author       琴梨梨
// @match        *://*/onlineread?*
// @match        *://*/onlinebook?ruid=*&pinst=*
// @grant        none
// @run-at document-idle
// ==/UserScript==

(function() {
    'use strict';
    if(document.location.pathname.indexOf("onlineread")){
        $(document).unbind("contextmenu", null);
        $("#page_container").unbind("mouseup",null);
    }
    if(document.location.pathname.indexOf("onlinebook")){
        document.body.oncontextmenu = ""
        var pageTotal = 0;
        var picUrl = ""
        //从0开始，为实际页码减一
        var pageCurrent = 0;
        //下载指定页面图片
        function downloadPic(page) {
            picUrl = path + "&pageNo=" + page ;
            fetch(picUrl).then(res => res.blob().then(blob => {
                var a = document.createElement('a');
                var url = window.URL.createObjectURL(blob);
                var filename = page + '.jpg';
                a.href = url;
                a.download = filename;
                a.click();
                window.URL.revokeObjectURL(url);
                if(pageCurrent<pageTotal){
                    pageCurrent++;
                    downloadPic(pageCurrent);
                }
            }))
        }
        //批量下载
        function batchDownload() {
            pageTotal = document.getElementById("sumNumb").innerText - 1;
             downloadPic(pageCurrent)
        }
        //创建下载按钮
        var downloadBtn = document.createElement("a");
        downloadBtn.innerText = "批量下载全书";
        downloadBtn.onclick = function () { batchDownload() };
        document.querySelector("body > div.divcenter > div.bq > div.bqmiddle > div.ml").appendChild(downloadBtn);
    }
})();
