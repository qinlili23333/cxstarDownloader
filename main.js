// ==UserScript==
// @name         畅想之星下载器（类型1）
// @namespace    https://qinlili.bid
// @version      0.1
// @description  导出为图片下载
// @author       琴梨梨
// @match        *://*/onlinebook?ruid=*&pinst=*
// @grant        none
// @run-at document-end
// ==/UserScript==

(function() {
    'use strict';
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
        }))
    }
    //批量下载
    function batchDownload() {
        pageTotal = document.getElementById("sumNumb").innerText - 1;
        nextPage();
    }
    //太快了会丢页，手动减速
    function nextPage(){
        if(pageCurrent<=pageTotal){
            downloadPic(pageCurrent);
            pageCurrent++;
            setTimeout(nextPage,250);}
    }
    //创建下载按钮
    var downloadBtn = document.createElement("a");
    downloadBtn.innerText = "批量下载全书";
    downloadBtn.onclick = function () { batchDownload() };
    document.querySelector("body > div.divcenter > div.bq > div.bqmiddle > div.ml").appendChild(downloadBtn);

})();
