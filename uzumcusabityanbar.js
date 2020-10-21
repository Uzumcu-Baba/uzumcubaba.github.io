!(function (i) {
   i.fn.theiaStickySidebar = function (t) {
      function e(t, e) {
         return (
            !0 === t.initialized ||
            (!(i("body").width() < t.minWidth) &&
               ((function (t, e) {
                  (t.initialized = !0),
                     0 === i("#theia-sticky-sidebar-stylesheet-" + t.namespace).length &&
                        i("head").append(i('<style id="theia-sticky-sidebar-stylesheet-' + t.namespace + '">.theiaStickySidebar:after {content: ""; display: table; clear: both;}</style>')),
                     e.each(function () {
                        var e = {};
                        if (
                           ((e.sidebar = i(this)),
                           (e.options = t || {}),
                           (e.container = i(e.options.containerSelector)),
                           0 == e.container.length && (e.container = e.sidebar.parent()),
                           e.sidebar.parents().css("-webkit-transform", "none"),
                           e.sidebar.css({ position: e.options.defaultPosition, overflow: "visible", "-webkit-box-sizing": "border-box", "-moz-box-sizing": "border-box", "box-sizing": "border-box" }),
                           (e.stickySidebar = e.sidebar.find(".theiaStickySidebar")),
                           0 == e.stickySidebar.length)
                        ) {
                           var a = /(?:text|application)\/(?:x-)?(?:javascript|ecmascript)/i;
                           e.sidebar
                              .find("script")
                              .filter(function (i, t) {
                                 return 0 === t.type.length || t.type.match(a);
                              })
                              .remove(),
                              (e.stickySidebar = i("<div>").addClass("theiaStickySidebar").append(e.sidebar.children())),
                              e.sidebar.append(e.stickySidebar);
                        }
                        (e.marginBottom = parseInt(e.sidebar.css("margin-bottom"))), (e.paddingTop = parseInt(e.sidebar.css("padding-top"))), (e.paddingBottom = parseInt(e.sidebar.css("padding-bottom")));
                        var n = e.stickySidebar.offset().top,
                           s = e.stickySidebar.outerHeight();
                        function d() {
                           (e.fixedScrollTop = 0), e.sidebar.css({ "min-height": "1px" }), e.stickySidebar.css({ position: "static", width: "", transform: "none" });
                        }
                        e.stickySidebar.css("padding-top", 1),
                           e.stickySidebar.css("padding-bottom", 1),
                           (n -= e.stickySidebar.offset().top),
                           (s = e.stickySidebar.outerHeight() - s - n),
                           0 == n ? (e.stickySidebar.css("padding-top", 0), (e.stickySidebarPaddingTop = 0)) : (e.stickySidebarPaddingTop = 1),
                           0 == s ? (e.stickySidebar.css("padding-bottom", 0), (e.stickySidebarPaddingBottom = 0)) : (e.stickySidebarPaddingBottom = 1),
                           (e.previousScrollTop = null),
                           (e.fixedScrollTop = 0),
                           d(),
                           (e.onScroll = function (e) {
                              if (e.stickySidebar.is(":visible"))
                                 if (i("body").width() < e.options.minWidth) d();
                                 else {
                                    if (e.options.disableOnResponsiveLayouts && e.sidebar.outerWidth("none" == e.sidebar.css("float")) + 50 > e.container.width()) return void d();
                                    var a,
                                       n,
                                       s = i(document).scrollTop(),
                                       r = "static";
                                    if (s >= e.sidebar.offset().top + (e.paddingTop - e.options.additionalMarginTop)) {
                                       var c,
                                          p = e.paddingTop + t.additionalMarginTop,
                                          b = e.paddingBottom + e.marginBottom + t.additionalMarginBottom,
                                          l = e.sidebar.offset().top,
                                          f =
                                             e.sidebar.offset().top +
                                             ((a = e.container),
                                             (n = a.height()),
                                             a.children().each(function () {
                                                n = Math.max(n, i(this).height());
                                             }),
                                             n),
                                          h = 0 + t.additionalMarginTop;
                                       c = e.stickySidebar.outerHeight() + p + b < i(window).height() ? h + e.stickySidebar.outerHeight() : i(window).height() - e.marginBottom - e.paddingBottom - t.additionalMarginBottom;
                                       var g = l - s + e.paddingTop,
                                          S = f - s - e.paddingBottom - e.marginBottom,
                                          u = e.stickySidebar.offset().top - s,
                                          m = e.previousScrollTop - s;
                                       "fixed" == e.stickySidebar.css("position") && "modern" == e.options.sidebarBehavior && (u += m),
                                          "stick-to-top" == e.options.sidebarBehavior && (u = t.additionalMarginTop),
                                          "stick-to-bottom" == e.options.sidebarBehavior && (u = c - e.stickySidebar.outerHeight()),
                                          (u = m > 0 ? Math.min(u, h) : Math.max(u, c - e.stickySidebar.outerHeight())),
                                          (u = Math.max(u, g)),
                                          (u = Math.min(u, S - e.stickySidebar.outerHeight()));
                                       var y = e.container.height() == e.stickySidebar.outerHeight();
                                       r = (!y && u == h) || (!y && u == c - e.stickySidebar.outerHeight()) ? "fixed" : s + u - e.sidebar.offset().top - e.paddingTop <= t.additionalMarginTop ? "static" : "absolute";
                                    }
                                    if ("fixed" == r) {
                                       var k = i(document).scrollLeft();
                                       e.stickySidebar.css({
                                          position: "fixed",
                                          width: o(e.stickySidebar) + "px",
                                          transform: "translateY(" + u + "px)",
                                          left: e.sidebar.offset().left + parseInt(e.sidebar.css("padding-left")) - k + "px",
                                          top: "0px",
                                       });
                                    } else if ("absolute" == r) {
                                       var v = {};
                                       "absolute" != e.stickySidebar.css("position") &&
                                          ((v.position = "absolute"), (v.transform = "translateY(" + (s + u - e.sidebar.offset().top - e.stickySidebarPaddingTop - e.stickySidebarPaddingBottom) + "px)"), (v.top = "0px")),
                                          (v.width = o(e.stickySidebar) + "px"),
                                          (v.left = ""),
                                          e.stickySidebar.css(v);
                                    } else "static" == r && d();
                                    "static" != r && 1 == e.options.updateSidebarHeight && e.sidebar.css({ "min-height": e.stickySidebar.outerHeight() + e.stickySidebar.offset().top - e.sidebar.offset().top + e.paddingBottom }),
                                       (e.previousScrollTop = s);
                                 }
                           }),
                           e.onScroll(e),
                           i(document).on(
                              "scroll." + e.options.namespace,
                              (function (i) {
                                 return function () {
                                    i.onScroll(i);
                                 };
                              })(e)
                           ),
                           i(window).on(
                              "resize." + e.options.namespace,
                              (function (i) {
                                 return function () {
                                    i.stickySidebar.css({ position: "static" }), i.onScroll(i);
                                 };
                              })(e)
                           ),
                           "undefined" != typeof ResizeSensor &&
                              new ResizeSensor(
                                 e.stickySidebar[0],
                                 (function (i) {
                                    return function () {
                                       i.onScroll(i);
                                    };
                                 })(e)
                              );
                     });
               })(t, e),
               !0))
         );
      }
      function o(i) {
         var t;
         try {
            t = i[0].getBoundingClientRect().width;
         } catch (i) {}
         return void 0 === t && (t = i.width()), t;
      }
      return (
         ((t = i.extend(
            { containerSelector: "", additionalMarginTop: 0, additionalMarginBottom: 0, updateSidebarHeight: !0, minWidth: 0, disableOnResponsiveLayouts: !0, sidebarBehavior: "modern", defaultPosition: "relative", namespace: "TSS" },
            t
         )).additionalMarginTop = parseInt(t.additionalMarginTop) || 0),
         (t.additionalMarginBottom = parseInt(t.additionalMarginBottom) || 0),
         (function (t, o) {
            e(t, o) ||
               (console.log("TSS: Body width smaller than options.minWidth. Init is delayed."),
               i(document).on(
                  "scroll." + t.namespace,
                  (function (t, o) {
                     return function (a) {
                        e(t, o) && i(this).unbind(a);
                     };
                  })(t, o)
               ),
               i(window).on(
                  "resize." + t.namespace,
                  (function (t, o) {
                     return function (a) {
                        e(t, o) && i(this).unbind(a);
                     };
                  })(t, o)
               ));
         })(t, this),
         this
      );
   };
})(jQuery);
