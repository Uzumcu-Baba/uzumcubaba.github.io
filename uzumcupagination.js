var noPage,
   currentPage,
   currentPageNo,
   postLabel,
   postResults = postPerPage,
   numOfPages = 2,
   pageOf = ["Page", "of"],
   locationrl = location.href,
   home_page = "/";
function startPagination(e) {
   var a = "";
   (pageNumber = parseInt(numOfPages / 2)),
      pageNumber == numOfPages - pageNumber && (numOfPages = 2 * pageNumber + 1),
      (pageStart = currentPageNo - pageNumber),
      pageStart < 1 && (pageStart = 1),
      (lastPageNo = parseInt(e / postResults) + 1),
      lastPageNo - 1 == e / postResults && (lastPageNo -= 1),
      (pageEnd = pageStart + numOfPages - 1),
      pageEnd > lastPageNo && (pageEnd = lastPageNo),
      (a += '<span class="page-of">' + pageOf[0] + " " + currentPageNo + " " + pageOf[1] + " " + lastPageNo + "</span>");
   var t = parseInt(currentPageNo) - 1;
   currentPageNo > 1 &&
      (a +=
         2 == currentPageNo
            ? "page" == currentPage
               ? '<a class="page-num page-prev" href="' + home_page + '"></a>'
               : '<a class="page-num page-prev" href="/search/label/' + postLabel + "?&max-results=" + postResults + '"></a>'
            : "page" == currentPage
            ? '<a class="page-num page-prev" href="#" onclick="getPage(' + t + ');return false">Önceki Sayfa</a>'
            : '<a class="page-num page-prev" href="#" onclick="getLabelPage(' + t + ');return false">Önceki Sayfa</a>'),
      pageStart > 1 && (a += "page" == currentPage ? '<a class="page-num" href="' + home_page + '">1</a>' : '<a class="page-num" href="/search/label/' + postLabel + "?&max-results=" + postResults + '">1</a>'),
      pageStart > 2 && (a += '<span class="page-num page-dots">...</span>');
   for (var s = pageStart; s <= pageEnd; s++)
      a +=
         currentPageNo == s
            ? '<span class="page-num page-active">' + s + "</span>"
            : 1 == s
            ? "page" == currentPage
               ? '<a class="page-num" href="' + home_page + '">1</a>'
               : '<a class="page-num" href="/search/label/' + postLabel + "?&max-results=" + postResults + '">1</a>'
            : "page" == currentPage
            ? '<a class="page-num" href="#" onclick="getPage(' + s + ');return false">' + s + "</a>"
            : '<a class="page-num" href="#" onclick="getLabelPage(' + s + ');return false">' + s + "</a>";
   pageEnd < lastPageNo - 1 && (a += '<span class="page-num page-dots">...</span>'),
      pageEnd < lastPageNo &&
         (a +=
            "page" == currentPage
               ? '<a class="page-num" href="#" onclick="getPage(' + lastPageNo + ');return false">' + lastPageNo + "</a>"
               : '<a class="page-num" href="#" onclick="getLabelPage(' + lastPageNo + ');return false">' + lastPageNo + "</a>");
   var r = parseInt(currentPageNo) + 1;
   currentPageNo < lastPageNo &&
      (a +=
         "page" == currentPage
            ? '<a class="page-num page-next" href="#" onclick="getPage(' + r + ');return false">Sonraki Sayfa</a>'
            : '<a class="page-num page-next" href="#" onclick="getLabelPage(' + r + ');return false">Sonraki Sayfa</a>'),
      (a += "");
   for (var n = document.getElementsByName("pageArea"), g = document.getElementById("blog-pager"), l = 0; l < n.length; l++) n[l].innerHTML = a;
   n && n.length > 0 && (a = ""), g && (g.innerHTML = a);
}
function dataFeed(e) {
   var a = e.feed;
   startPagination(parseInt(a.openSearch$totalResults.$t, 10));
}
function pageCurrentBlogger() {
   var e = locationrl;
   if (
      (-1 != e.indexOf("/search/label/") && (postLabel = -1 != e.indexOf("?updated-max") ? e.substring(e.indexOf("/search/label/") + 14, e.indexOf("?updated-max")) : e.substring(e.indexOf("/search/label/") + 14, e.indexOf("?&max"))),
      -1 == e.indexOf("?q=") && -1 == e.indexOf(".html"))
   ) {
      const a = document.createElement("script");
      (a.async = !1),
         (currentPageNo = -1 != locationrl.indexOf("#PageNo=") ? locationrl.substring(locationrl.indexOf("#PageNo=") + 8, locationrl.length) : 1),
         -1 == e.indexOf("/search/label/")
            ? ((currentPage = "page"), (a.src = `${home_page}feeds/posts/summary?max-results=1&alt=json-in-script&callback=dataFeed`))
            : ((currentPage = "label"), -1 == e.indexOf("&max-results=") && (postResults = 20), (a.src = `${home_page}feeds/posts/summary/-/${postLabel}?alt=json-in-script&callback=dataFeed&max-results=1`)),
         document.head.appendChild(a);
   }
}
function getPage(e) {
   (jsonstart = (e - 1) * postResults), (noPage = e);
   var a = document.getElementsByTagName("head")[0],
      t = document.createElement("script");
   (t.type = "text/javascript"), t.setAttribute("src", home_page + "feeds/posts/summary?start-index=" + jsonstart + "&max-results=1&alt=json-in-script&callback=findPostDate"), a.appendChild(t);
}
function getLabelPage(e) {
   (jsonstart = (e - 1) * postResults), (noPage = e);
   var a = document.getElementsByTagName("head")[0],
      t = document.createElement("script");
   (t.type = "text/javascript"), t.setAttribute("src", home_page + "feeds/posts/summary/-/" + postLabel + "?start-index=" + jsonstart + "&max-results=1&alt=json-in-script&callback=findPostDate"), a.appendChild(t);
}
function findPostDate(e) {
   post = e.feed.entry[0];
   var a = post.published.$t.substring(0, 19) + post.published.$t.substring(23, 29),
      t = encodeURIComponent(a);
   if ("page" == currentPage) var s = "/search?updated-max=" + t + "&max-results=" + postResults + "#PageNo=" + noPage;
   else s = "/search/label/" + postLabel + "?updated-max=" + t + "&max-results=" + postResults + "#PageNo=" + noPage;
   location.href = s;
}
pageCurrentBlogger();
