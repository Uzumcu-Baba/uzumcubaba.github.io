$(function (t) {
   t.fn.lazyyard = function () {
      return this.each(function () {
         var a = t(this),
            e = a.attr("src"),
            s = "/w" + Math.round(a.width()) + "-h" + Math.round(a.height()) + "-p-k-no-nu",
            i = "/w357";
         function n() {
            var e = t(window).height();
            if (t(window).scrollTop() + e > a.offset().top) {
               var s = new Image();
               (s.onload = function () {
                  a.addClass("lazy-yard");
               }),
                  (s.src = i);
            }
         }
         (i = e.match("s72-c") ? e.replace("/s72-c", s) : e.match("w72-h") ? e.replace("/w72-h72-p-k-no-nu", s) : e), t(window).on("load resize scroll", n), n();
      });
   };
}),
   $(function () {
      function t(t, a) {
         for (var e = 0; e < t[a].link.length; e++)
            if ("alternate" == t[a].link[e].rel) {
               var s = t[a].link[e].href;
               break;
            }
         return s;
      }
      function a(t, a, e) {
         return '<a href="' + e + '">' + t[a].title.$t + "</a>";
      }
      function e(t, a) {
         return "<a>" + t[a].author[0].name.$t + "</a></span>";
      }
      function s(t, a) {
         var e = t[a].published.$t,
            s = e.substring(0, 4),
            i = e.substring(5, 7),
            n = e.substring(8, 10);
         return '<span class="post-date">' + (monthFormat[parseInt(i, 10) - 1] + " " + n + ", " + s) + "</span>";
      }
      function i(t, a) {
         var e = t[a].title.$t,
            s = t[a].content.$t,
            i = $("<div>").html(s);
         if ("media$thumbnail" in t[a]) {
            var n = t[a].media$thumbnail.url,
               l = n.replace("/s72-c", "/w680");
            s.indexOf("youtube.com/embed") > -1 && (l = n.replace("/default.", "/hqdefault."));
         } else l = s.indexOf("<img") > -1 ? i.find("img:first").attr("src") : noThumbnail;
         return '<img class="post-thumb" alt="' + e + '" src="' + l + '"/>';
      }
      function n(t, a) {
         if (null != t[a].category) var e = '<span class="post-tag">' + t[a].category[0].term + "</span>";
         else e = "";
         return e;
      }
      function l(l, o, r, c) {
         if (o.match("mega-menu") || o.match("hot-posts") || o.match("featured") || o.match("post-list") || o.match("related")) {
            var m = "";
            if ("recent" == c) m = "/feeds/posts/default?alt=json-in-script&max-results=" + r;
            else if ("random" == c) m = "/feeds/posts/default?max-results=" + r + "&start-index=" + (Math.floor(Math.random() * r) + 1) + "&alt=json-in-script";
            else m = "/feeds/posts/default/-/" + c + "?alt=json-in-script&max-results=" + r;
            $.ajax({
               url: m,
               type: "get",
               dataType: "jsonp",
               beforeSend: function () {
                  o.match("hot-posts") && l.html('<div class="hot-loader"/>').parent().addClass("show-hot");
               },
               success: function (r) {
                  if (o.match("mega-menu")) var m = '<ul class="mega-menu-inner">';
                  else if (o.match("hot-posts")) m = '<ul class="hot-posts">';
                  else if (o.match("post-list")) m = '<ul class="custom-widget">';
                  else if (o.match("related")) m = '<ul class="related-posts">';
                  var d = r.feed.entry;
                  if (null != d) {
                     for (var h = 0, u = d; h < u.length; h++) {
                        var p = t(u, h),
                           f = a(u, h, p),
                           g = i(u, h),
                           v = n(u, h),
                           b = e(u, h),
                           $ = s(u, h),
                           w = "";
                        o.match("mega-menu")
                           ? (w +=
                                '<div class="mega-item item-' +
                                h +
                                '"><div class="mega-content"><div class="post-image-wrap"><a class="post-image-link" href="' +
                                p +
                                '">' +
                                g +
                                "</a>" +
                                v +
                                '</div><h2 class="post-title">' +
                                f +
                                '</h2><div class="post-meta">' +
                                $ +
                                "</div></div></div>")
                           : o.match("hot-posts")
                           ? (w +=
                                0 == h
                                   ? '<li class="hot-item item-' +
                                     h +
                                     '"><div class="hot-item-inner"><a class="post-image-link" href="' +
                                     p +
                                     '">' +
                                     g +
                                     "</a>" +
                                     v +
                                     '<div class="post-info"><h2 class="post-title">' +
                                     f +
                                     '</h2><div class="post-meta">' +
                                     b +
                                     $ +
                                     "</div></div></div></li>"
                                   : '<li class="hot-item item-' +
                                     h +
                                     '"><div class="hot-item-inner"><a class="post-image-link" href="' +
                                     p +
                                     '">' +
                                     g +
                                     "</a>" +
                                     v +
                                     '<div class="post-info"><h2 class="post-title">' +
                                     f +
                                     '</h2><div class="post-meta">' +
                                     $ +
                                     "</div></div></div></li>")
                           : o.match("post-list")
                           ? (w += '<li class="item-' + h + '"><a class="post-image-link" href="' + p + '">' + g + '</a><div class="post-info"><h2 class="post-title">' + f + '</h2><div class="post-meta">' + $ + "</div></div></div></li>")
                           : o.match("related") &&
                             (w +=
                                '<li class="related-item item-' +
                                h +
                                '"><div class="post-image-wrap"><a class="post-image-link" href="' +
                                p +
                                '">' +
                                g +
                                "</a>" +
                                v +
                                '</div><h2 class="post-title">' +
                                f +
                                '</h2><div class="post-meta">' +
                                $ +
                                "</div></li>"),
                           (m += w);
                     }
                     m += "</ul>";
                  } else m = '<ul class="no-posts">Yazı bulunamadı. <i class="fa fa-frown"/></ul>';
                  o.match("mega-menu")
                     ? (l.addClass("has-sub mega-menu").append(m),
                       l.find("a:first").attr("href", function (t, a) {
                          return (a = "recent" == c || "random" == c ? a.replace(a, "/search/?&max-results=" + postPerPage) : a.replace(a, "/search/label/" + c + "?&max-results=" + postPerPage));
                       }))
                     : o.match("hot-posts")
                     ? l.html(m).parent().addClass("show-hot")
                     : l.html(m),
                     l.find(".post-thumb").lazyyard();
               },
            });
         }
      }
      $(".index-post .post-image-link .post-thumb, .PopularPosts .post-image-link .post-thumb, .FeaturedPost .entry-image-link .post-thumb,.about-author .author-avatar, .item-post .post-body img").lazyyard(),
         $("#main-menu").each(function () {
            for (var t = $(this).find(".LinkList ul > li").children("a"), a = t.length, e = 0; e < a; e++) {
               var s = t.eq(e),
                  i = s.text();
               if ("_" !== i.charAt(0))
                  if (
                     "_" ===
                     t
                        .eq(e + 1)
                        .text()
                        .charAt(0)
                  ) {
                     var n = s.parent();
                     n.append('<ul class="sub-menu m-sub"/>');
                  }
               "_" === i.charAt(0) && (s.text(i.replace("_", "")), s.parent().appendTo(n.children(".sub-menu")));
            }
            for (e = 0; e < a; e++) {
               var l = t.eq(e),
                  o = l.text();
               if ("_" !== o.charAt(0))
                  if (
                     "_" ===
                     t
                        .eq(e + 1)
                        .text()
                        .charAt(0)
                  ) {
                     var r = l.parent();
                     r.append('<ul class="sub-menu2 m-sub"/>');
                  }
               "_" === o.charAt(0) && (l.text(o.replace("_", "")), l.parent().appendTo(r.children(".sub-menu2")));
            }
            $("#main-menu ul li ul").parent("li").addClass("has-sub"),
               $("#main-menu ul > li a").each(function () {
                  var t = $(this),
                     a = t.text().trim(),
                     e = a.toLowerCase(),
                     s = a.split("-")[0];
                  e.match("-text") && (t.attr("data-title", s), t.parent("li").addClass("li-home").find("> a").text(s)),
                     a.match("-icon") && (t.attr("data-title", s), t.parent("li").addClass("li-home li-home-icon").find("> a").html('<i class="fa fa-home"/>'));
               }),
               $("#main-menu .widget").addClass("show-menu");
         }),
         $("#main-menu-nav").clone().appendTo(".mobile-menu"),
         $(".mobile-menu .has-sub").append('<div class="submenu-toggle"/>'),
         $(".mobile-menu ul > li a").each(function () {
            var t = $(this),
               a = t.attr("href").trim(),
               e = a.toLowerCase(),
               s = a.split("/")[0],
               i = t.data("title");
            t.parent("li.li-home").find("> a").text(i), e.match("mega-menu") && t.attr("href", "/search/label/" + s + "?&max-results=" + postPerPage);
         }),
         $(".slide-menu-toggle").on("click", function () {
            $("body").toggleClass("nav-active");
         }),
         $(".mobile-menu ul li .submenu-toggle").on("click", function (t) {
            $(this).parent().hasClass("has-sub") &&
               (t.preventDefault(), $(this).parent().hasClass("show") ? $(this).parent().removeClass("show").find("> .m-sub").slideToggle(170) : $(this).parent().addClass("show").children(".m-sub").slideToggle(170));
         }),
         $(".show-search").on("click", function () {
            $("#nav-search").fadeIn(250).find("input").focus();
         }),
         $(".hide-search").on("click", function () {
            $("#nav-search").fadeOut(250).find("input").blur();
         }),
         $(".Label a, a.b-label").attr("href", function (t, a) {
            return a.replace(a, a + "?&max-results=" + postPerPage);
         }),
         $(".avatar-image-container img").attr("src", function (t, a) {
            return (a = (a = a.replace("/s35-c/", "/s45-c/")).replace("//img1.blogblog.com/img/blank.gif", "//4.bp.blogspot.com/-uCjYgVFIh70/VuOLn-mL7PI/AAAAAAAADUs/Kcu9wJbv790hIo83rI_s7lLW3zkLY01EA/s55-r/avatar.png"));
         }),
         $(".author-description a").each(function () {
            $(this).attr("target", "_blank");
         }),
         $(".post-nav").each(function () {
            var t = $("a.prev-post-link").attr("href"),
               a = $("a.next-post-link").attr("href");
            $.ajax({
               url: t,
               type: "get",
               success: function (t) {
                  var a = $(t).find(".blog-post h1.post-title").text();
                  $(".post-prev a .post-nav-inner p").text(a);
               },
            }),
               $.ajax({
                  url: a,
                  type: "get",
                  success: function (t) {
                     var a = $(t).find(".blog-post h1.post-title").text();
                     $(".post-next a .post-nav-inner p").text(a);
                  },
               });
         }),
         $(".post-body strike").each(function () {
            var t = $(this),
               a = t.text();
            a.match("left-sidebar") && t.replaceWith("<style>.item #main-wrapper{float:right}.item #sidebar-wrapper{float:left}</style>"),
               a.match("right-sidebar") && t.replaceWith("<style>.item #main-wrapper{float:left}.item #sidebar-wrapper{float:right}</style>"),
               a.match("full-width") && t.replaceWith("<style>.item #main-wrapper{width:100%}.item #sidebar-wrapper{display:none}</style>");
         }),
         $("#main-wrapper, #sidebar-wrapper").each(function () {
            1 == fixedSidebar && $(this).theiaStickySidebar({ additionalMarginTop: 30, additionalMarginBottom: 30 });
         }),
         $(".back-top").each(function () {
            var t = $(this);
            $(window).on("scroll", function () {
               $(this).scrollTop() >= 100 ? t.fadeIn(250) : t.fadeOut(250);
            }),
               t.click(function () {
                  $("html, body").animate({ scrollTop: 0 }, 500);
               });
         }),
         $("#main-menu #main-menu-nav li").each(function () {
            var t = $(this),
               a = t.find("a").attr("href").trim();
            l(t, a.toLowerCase(), 4, a.split("/")[0]);
         }),
         $("#hot-section .widget-content").each(function () {
            var t = $(this),
               a = t.text().trim();
            l(t, a.toLowerCase(), 4, a.split("/")[0]);
         }),
         $(".common-widget .widget-content").each(function () {
            var t = $(this),
               a = t.text().trim(),
               e = a.toLowerCase(),
               s = a.split("/");
            l(t, e, s[0], s[1]);
         }),
         $(".related-ready").each(function () {
            var t = $(this);
            l(t, "related", 3, t.find(".related-tag").data("label"));
         }),
         $(".blog-post-comments").each(function () {
            var t,
               a = commentsSystem,
               e = (disqus_blogger_current_url, '<div class="fb-comments" data-width="100%" data-href="' + $(location).attr("href") + '" data-numposts="5"></div>'),
               s = "comments-system-" + a;
            "blogger" == a
               ? $(this).addClass(s).show()
               : "disqus" == a
               ? (((t = document.createElement("script")).type = "text/javascript"),
                 (t.async = !0),
                 (t.src = "//" + disqusShortname + ".disqus.com/embed.js"),
                 (document.getElementsByTagName("head")[0] || document.getElementsByTagName("body")[0]).appendChild(t),
                 $("#comments, #gpluscomments").remove(),
                 $(this).append('<div id="disqus_thread"/>').addClass(s).show())
               : "facebook" == a
               ? ($("#comments, #gpluscomments").remove(), $(this).append(e).addClass(s).show())
               : "hide" == a
               ? $(this).hide()
               : $(this).addClass("comments-system-default").show();
         });
   });
!(function (e) {
    (e.fn.lazyload = function (o) {
        var t = { threshold: 0, failurelimit: 0, event: "scroll", effect: "show", container: window };
        o && e.extend(t, o);
        var n = this;
        return (
            "scroll" == t.event &&
                e(t.container).bind("scroll", function (o) {
                    var i = 0;
                    n.each(function () {
                        if (e.abovethetop(this, t) || e.leftofbegin(this, t));
                        else if (e.belowthefold(this, t) || e.rightoffold(this, t)) {
                            if (i++ > t.failurelimit) return !1;
                        } else e(this).trigger("appear");
                    });
                    var r = e.grep(n, function (e) {
                        return !e.loaded;
                    });
                    n = e(r);
                }),
            this.each(function () {
                var o = this;
                null == e(o).attr("original") && e(o).attr("original", e(o).attr("src")),
                    "scroll" != t.event || null == e(o).attr("src") || t.placeholder == e(o).attr("src") || e.abovethetop(o, t) || e.leftofbegin(o, t) || e.belowthefold(o, t) || e.rightoffold(o, t)
                        ? (t.placeholder ? e(o).attr("src", t.placeholder) : e(o).removeAttr("src"), (o.loaded = !1))
                        : (o.loaded = !0),
                    e(o).one("appear", function () {
                        this.loaded ||
                            e("<img />")
                                .bind("load", function () {
                                    e(o).hide().attr("src", e(o).attr("original"))[t.effect](t.effectspeed), (o.loaded = !0);
                                })
                                .attr("src", e(o).attr("original"));
                    }),
                    "scroll" != t.event &&
                        e(o).bind(t.event, function (t) {
                            o.loaded || e(o).trigger("appear");
                        });
            }),
            e(t.container).trigger(t.event),
            this
        );
    }),
        (e.belowthefold = function (o, t) {
            if (void 0 === t.container || t.container === window) var n = e(window).height() + e(window).scrollTop();
            else n = e(t.container).offset().top + e(t.container).height();
            return n <= e(o).offset().top - t.threshold;
        }),
        (e.rightoffold = function (o, t) {
            if (void 0 === t.container || t.container === window) var n = e(window).width() + e(window).scrollLeft();
            else n = e(t.container).offset().left + e(t.container).width();
            return n <= e(o).offset().left - t.threshold;
        }),
        (e.abovethetop = function (o, t) {
            if (void 0 === t.container || t.container === window) var n = e(window).scrollTop();
            else n = e(t.container).offset().top;
            return n >= e(o).offset().top + t.threshold + e(o).height();
        }),
        (e.leftofbegin = function (o, t) {
            if (void 0 === t.container || t.container === window) var n = e(window).scrollLeft();
            else n = e(t.container).offset().left;
            return n >= e(o).offset().left + t.threshold + e(o).width();
        }),
        e.extend(e.expr[":"], {
            "below-the-fold": "$.belowthefold(a, {threshold : 0, container: window})",
            "above-the-fold": "!$.belowthefold(a, {threshold : 0, container: window})",
            "right-of-fold": "$.rightoffold(a, {threshold : 0, container: window})",
            "left-of-fold": "!$.rightoffold(a, {threshold : 0, container: window})",
        });
})(jQuery),
    $(function () {
        $("img").lazyload({ placeholder: "//1.bp.blogspot.com/-6bajoYC0A0A/X5dUieZM-dI/AAAAAAAACBA/I6voC3Zf8Sc8vX4nqv-JRKnMkLeUMIxDQCLcBGAsYHQ/s0/blank.gif", effect: "fadeIn", threshold: "-50" });
    });
