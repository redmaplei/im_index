function loadCss(t) {
    var e = document.createElement("link");
    e.type = "text/css", e.rel = "stylesheet", e.href = t, document.getElementsByTagName("head")[0].appendChild(e)
}

function seriesLoadScripts(t, e) {
    if ("object" != typeof t) var t = [t];
    var n = document.getElementsByTagName("head").item(0) || document.documentElement,
        i = new Array,
        s = t.length - 1,
        o = function (a) {
            i[a] = document.createElement("script"), i[a].setAttribute("type", "text/javascript"), i[a].onload = i[a].onreadystatechange = function () {
                this.onload = this.onreadystatechange = null, this.parentNode.removeChild(this), a != s ? o(a + 1) : "function" == typeof e && e()
            }, i[a].setAttribute("src", t[a]), n.appendChild(i[a])
        };
    o(0)
}

function isVisiable(t) {
    if (t) {
        var e = t.getBoundingClientRect();
        return e.top > 0 && window.innerHeight - e.top > 0 || e.top <= 0 && e.bottom >= 0
    }
}

function isEmptyObject(t) {
    var e;
    for (e in t) return !1;
    return !0
}

function getQueryString(t) {
    var e = new RegExp("(^|&)" + t + "=([^&]*)(&|$)"),
        n = window.location.search.substr(1).match(e);
    return null != n ? unescape(n[2]) : null
}

function localStorageInstance(t, e) {
    try {
        if (window.localStorage)
            if ("" === e) window.localStorage.removeItem(t);
            else {
                if (0 != e && !e) return window.localStorage[t];
                window.localStorage[t] = e
            }
        else if ("" === e) cookie.clearcookie(t);
        else {
            if (0 != e && !e) return cookie.get(t);
            cookie.set(t, e, 1e4)
        }
    } catch (t) {}
}

function getUuid(t, e) {
    var n, i = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(""),
        s = [];
    if (e = e || i.length, t)
        for (n = 0; n < t; n++) s[n] = i[0 | Math.random() * e];
    else {
        var o;
        for (s[8] = s[13] = s[18] = s[23] = "-", s[14] = "4", n = 0; n < 36; n++) s[n] || (o = 0 | 16 * Math.random(), s[n] = i[19 == n ? 3 & o | 8 : o])
    }
    return s.join("")
}

function filterXss(t) {
    return t ? t.replace(/\</g, "&lt;").replace(/\>/g, "&gt;") : t
}

function Utemplate(t, e) {
    function n(t, e) {
        return o += e ? t.match(s) ? t + "\n" : "arr.push(" + t + ");\n" : "" != t ? "arr.push('" + t.replace(/"/g, '\\"') + "');\n" : "", arguments.callee
    }
    for (var i = /<%([^%>]+)?%>/g, s = /(^( )?(if|for|else|switch|case|break|{|}))(.*)?/g, o = "var arr = []; \n", a = 0; match = i.exec(t);) n(t.slice(a, match.index))(match[1], !0), a = match.index + match[0].length;
    return n(t.substr(a, t.length - a)), o += "return arr.join('')", new Function(o.replace(/[\r\t\n]/g, "")).apply(e)
}
var DEBUG = !0,
    UA = window.navigator.userAgent,
    isIE, isWebkit, isZpdesk, ipcRenderer, isTouch = !1;
if ((UA.indexOf("Edge/") > -1 || UA.indexOf("MSIE ") > -1 || UA.indexOf("Trident/") > -1) && (isIE = !0), UA.indexOf("ZhipinDesktop/") > -1 && (isZpdesk = !0, ipcRenderer = window.top.ipcRenderer), isZpdesk && ipcRenderer.send("messageLogout"), "ontouchstart" in window) {
    var isTouch = !0;
    document.addEventListener("touchstart", function () {}, !1)
}
var loadScript = function (t) {
    var e, n;
    if (t && "" != t)
        for (e = t.split(","), n = 0; n < e.length; n++) $.getScript(e[n])
};
$(function () {
    "undefined" != typeof loginjson && 1 == loginjson.act && ($(".sign-register .form-btn .btn").html("" == loginjson.btnValue ? "登录" : loginjson.btnValue), $(".sign-register .sign-tab").hide(), $(".sign-register .title").html(loginjson.titleValue))
});
var Cookie = {
        get: function (t) {
            var e, n = new RegExp("(^| )" + t + "=([^;]*)(;|$)");
            return (e = document.cookie.match(n)) ? unescape(e[2]) : null
        },
        getObj: function () {
            for (var t = document.cookie.split(";"), e = "{", n = 0; n < t.length; n++) {
                var i = t[n].split("=");
                e += '"' + i[0].replace(/\s+/g, "") + '":"' + decodeURIComponent(i[1]) + '",'
            }
            return e = e.slice(0, -1), e += "}", JSON.parse(e)
        },
        set: function (t, e, n, i, s) {
            var o = t + "=" + encodeURIComponent(e);
            if (n) {
                o += ";expires=" + new Date(n).toGMTString()
            }
            o = i ? o + ";domain=" + i : o, o = s ? o + ";path=" + s : o, document.cookie = o
        },
        del: function (t, e, n) {
            var i = new Date("1970-01-01"),
                s = t + "=null;expires=" + i.toGMTString();
            s = e ? s + ";domain=" + e : s, s = n ? s + ";path=" + n : s, document.cookie = s
        }
    },
    cookie = {
        get: function (t) {
            var e, n = new RegExp("(^| )" + t + "=([^;]*)(;|$)");
            return (e = document.cookie.match(n)) ? unescape(e[2]) : null
        },
        set: function (t, e, n) {
            if (n) {
                var i = new Date;
                i.setMinutes(n), document.cookie = t + "=" + encodeURIComponent(e) + ";expires=" + i.toGMTString()
            } else document.cookie = t + "=" + encodeURIComponent(e)
        },
        clearcookie: function (t, e, n) {
            cookie.get(t) && (document.cookie = t + "=" + (e ? ";path=" + e : "") + (n ? ";domain=" + n : "") + ";expires=Thu,01-Jan-1970 00:00:01 GMT")
        }
    },
    PAGE_ACTIVITY = !0;
if (function () {
        function t(t) {
            var n = {
                focus: !0,
                focusin: !0,
                pageshow: !0,
                blur: !1,
                focusout: !1,
                pagehide: !1
            };
            t = t || window.event, PAGE_ACTIVITY = t.type in n ? n[t.type] : !this[e]
        }
        var e = "hidden";
        e in document ? document.addEventListener("visibilitychange", t) : (e = "mozHidden") in document ? document.addEventListener("mozvisibilitychange", t) : (e = "webkitHidden") in document ? document.addEventListener("webkitvisibilitychange", t) : (e = "msHidden") in document ? document.addEventListener("msvisibilitychange", t) : "onfocusin" in document ? document.onfocusin = document.onfocusout = t : window.onpageshow = window.onpagehide = window.onfocus = window.onblur = t
    }(), window.INTERFACE_URLS = {
        homeUrl: "/",
        logoutUrl: "/logout/",
        chatProtoUrl: "/v2/web/boss/js/module/chat.proto"
    }, $(function () {
        $(".nav-figure").length && ($(".standard").length || ($(".user-nav a").eq(0).attr("disabled", "disabled"), $(".user-nav a").eq(0).on("click", function (t) {
            alert("请升级您的浏览器才能使用聊天功能"), t.preventDefault()
        })))
    }), "undefined" == typeof jQuery) throw new Error("jquery-confirm requires jQuery");
var jconfirm, Jconfirm;
! function (t) {
    "use strict";
    t.fn.confirm = function (e, n) {
        return void 0 === e && (e = {}), "string" == typeof e && (e = {
            content: e,
            title: n || !1
        }), t(this).each(function () {
            var n = t(this);
            n.on("click", function (i) {
                i.preventDefault();
                var s = t.extend({}, e);
                n.attr("data-title") && (s.title = n.attr("data-title")), n.attr("data-content") && (s.content = n.attr("data-content")), s.$target = n, n.attr("href") && !e.confirm && (s.confirm = function () {
                    location.href = n.attr("href")
                }), t.confirm(s)
            })
        }), t(this)
    }, t.confirm = function (t, e) {
        return void 0 === t && (t = {}), "string" == typeof t && (t = {
            content: t,
            title: e || !1
        }), jconfirm(t)
    }, t.alert = function (t, e) {
        return void 0 === t && (t = {}), "string" == typeof t && (t = {
            content: t,
            title: e || !1
        }), t.cancelButton = !1, jconfirm(t)
    }, jconfirm = function (e) {
        void 0 === e && (e = {}), jconfirm.defaults && t.extend(jconfirm.pluginDefaults, jconfirm.defaults);
        var e = t.extend({}, jconfirm.pluginDefaults, e);
        return new Jconfirm(e)
    }, Jconfirm = function (e) {
        t.extend(this, e), this._init()
    }, Jconfirm.prototype = {
        _init: function () {
            var t = this;
            this._rand = Math.round(99999 * Math.random()), this._buildHTML(), this._bindEvents(), setTimeout(function () {
                t.open(), t._watchContent()
            }, 0)
        },
        _buildHTML: function () {
            var e = this;
            this.animation = "anim-" + this.animation.toLowerCase(), this.closeAnimation = "anim-" + this.closeAnimation.toLowerCase(), this.theme = "jconfirm-" + this.theme.toLowerCase(), "anim-none" == this.animation && (this.animationSpeed = 0), this._lastFocused = t("body").find(":focus"), this.$el = t(this.template).appendTo(this.container).addClass(this.theme), this.$el.find(".jconfirm-box-container").addClass(this.columnClass), this.$el.find(".jconfirm-bg").css(this._getCSS(this.animationSpeed, 1)), this.$el.find(".jconfirm-bg").css("opacity", this.opacity), this.$b = this.$el.find(".jconfirm-box").css(this._getCSS(this.animationSpeed, this.animationBounce)).addClass(this.animation), this.$body = this.$b, this.rtl && this.$el.addClass("rtl"), this._contentReady = t.Deferred(), this._modalReady = t.Deferred(), this.$title = this.$el.find(".title"), this.contentDiv = this.$el.find("div.content"), this.$content = this.contentDiv, this.$contentPane = this.$el.find(".content-pane"), this.$icon = this.$el.find(".icon-c"), this.$closeIcon = this.$el.find(".closeIcon"), this.$contentPane.css(this._getCSS(this.animationSpeed, 1)), this.setTitle(), this.setIcon(), this._setButtons(), this.closeIconClass && this.$closeIcon.html('<i class="' + this.closeIconClass + '"></i>'), e._contentHash = this._hash(e.$content.html()), t.when(this._contentReady, this._modalReady).then(function () {
                e.setContent(), e.setTitle(), e.setIcon()
            }), this._getContent(), this._imagesLoaded(), this.autoClose && this._startCountDown()
        },
        _unwatchContent: function () {
            clearInterval(this._timer)
        },
        _hash: function () {
            if ("function" == typeof btoa) return btoa(encodeURIComponent(this.$content.html()))
        },
        _watchContent: function () {
            var t = this;
            this._timer = setInterval(function () {
                var e = t._hash(t.$content.html());
                t._contentHash != e && (t._contentHash = e, t.setDialogCenter(), t._imagesLoaded())
            }, this.watchInterval)
        },
        _bindEvents: function () {
            var e = this,
                n = !1;
            this.$el.find(".jconfirm-scrollpane").click(function (t) {
                n || e.backgroundDismiss && (e.cancel(), e.close()), n = !1
            }), this.$el.find(".jconfirm-box").click(function (t) {
                n = !0
            }), this.$confirmButton && this.$confirmButton.click(function (t) {
                t.preventDefault();
                var n = e.confirm(e.$b);
                e._stopCountDown(), e.onAction("confirm"), (void 0 === n || n) && e.close()
            }), this.$cancelButton && this.$cancelButton.click(function (t) {
                t.preventDefault();
                var n = e.cancel(e.$b);
                e._stopCountDown(), e.onAction("cancel"), (void 0 === n || n) && e.close()
            }), this.$closeButton && this.$closeButton.click(function (t) {
                t.preventDefault(), e._stopCountDown(), e.cancel(), e.onAction("close"), e.close()
            }), this.keyboardEnabled && setTimeout(function () {
                t(window).on("keyup." + this._rand, function (t) {
                    e.reactOnKey(t)
                })
            }, 500), t(window).on("resize." + this._rand, function () {
                e.setDialogCenter(!0)
            })
        },
        _getCSS: function (t, e) {
            return {
                "-webkit-transition-duration": t / 1e3 + "s",
                "transition-duration": t / 1e3 + "s",
                "-webkit-transition-timing-function": "cubic-bezier(.36,1.1,.2, " + e + ")",
                "transition-timing-function": "cubic-bezier(.36,1.1,.2, " + e + ")"
            }
        },
        _imagesLoaded: function () {
            var e = this;
            t.each(this.$content.find("img:not(.loaded)"), function (n, i) {
                var s = setInterval(function () {
                    "0px" !== t(i).css("height") && (t(i).addClass("loaded"), e.setDialogCenter(), clearInterval(s))
                }, 40)
            })
        },
        _setButtons: function () {
            this.$btnc = this.$el.find(".buttons"), this.confirmButton && "" !== t.trim(this.confirmButton) && (this.$confirmButton = t('<button type="button" class="btn">' + this.confirmButton + "</button>").appendTo(this.$btnc).addClass(this.confirmButtonClass)), this.cancelButton && "" !== t.trim(this.cancelButton) && (this.buttonsReverse ? this.$cancelButton = t('<button type="button" class="btn">' + this.cancelButton + "</button>").prependTo(this.$btnc).addClass(this.cancelButtonClass) : this.$cancelButton = t('<button type="button" class="btn">' + this.cancelButton + "</button>").appendTo(this.$btnc).addClass(this.cancelButtonClass)), this.buttonOther && "" !== t.trim(this.buttonOther) && t(this.buttonOther).prependTo(this.$btnc), this.confirmButton || this.cancelButton || this.$btnc.hide(), this.confirmButton || this.cancelButton || null !== this.closeIcon || (this.$closeButton = this.$b.find(".closeIcon").show()), !0 === this.closeIcon && (this.$closeButton = this.$b.find(".closeIcon").show())
        },
        setTitle: function (t) {
            this.title = void 0 !== t ? t : this.title, this.$title.html(this.title || "")
        },
        setIcon: function (t) {
            this.title = "undefined" != typeof string ? t : this.title, this.$icon.html(this.icon ? '<i class="' + this.icon + '"></i>' : "")
        },
        setContent: function (t) {
            this.content = void 0 === t ? this.content : t, "" == this.content ? (this.$content.html(this.content), this.$contentPane.hide()) : (this.$content.html(this.content), this.$contentPane.show()), this.$content.hasClass("loading") && (this.$content.removeClass("loading"), this.$btnc.find("button").prop("disabled", !1))
        },
        _getContent: function (e) {
            var n = this;
            if (e = e || this.content, this._isAjax = !1, this.content)
                if ("string" == typeof this.content)
                    if ("url:" === this.content.substr(0, 4).toLowerCase()) {
                        this._isAjax = !0, this.$content.addClass("loading"), this.$btnc.find("button").prop("disabled", !0);
                        var i = this.content.substring(4, this.content.length);
                        t.get(i).done(function (t) {
                            n.content = t, n._contentReady.resolve()
                        }).always(function (t, e, i) {
                            "function" == typeof n.contentLoaded && n.contentLoaded(t, e, i)
                        })
                    } else this.setContent(this.content), this._contentReady.reject();
            else if ("function" == typeof this.content) {
                this.$content.addClass("loading"), this.$btnc.find("button").attr("disabled", "disabled");
                var s = this.content(this);
                "object" != typeof s ? console.error("The content function must return jquery promise.") : "function" != typeof s.always ? console.error("The object returned is not a jquery promise.") : (this._isAjax = !0, s.always(function (t, e) {
                    n._contentReady.resolve()
                }))
            } else console.error("Invalid option for property content, passed: " + typeof this.content);
            else this.content = "", this.setContent(this.content), this._contentReady.reject();
            this.setDialogCenter()
        },
        _stopCountDown: function () {
            clearInterval(this.timerInterval), this.$cd && this.$cd.remove()
        },
        _startCountDown: function () {
            var e = this.autoClose.split("|");
            if (/cancel/.test(e[0]) && "alert" === this.type) return !1;
            if (/confirm|cancel/.test(e[0])) {
                this.$cd = t('<span class="countdown"></span>').appendTo(this["$" + e[0] + "Button"]);
                var n = this;
                n.$cd.parent().click();
                var i = e[1] / 1e3;
                this.timerInterval = setInterval(function () {
                    n.$cd.html(" (" + (i -= 1) + ")"), 0 === i && (n.$cd.html(""), n.$cd.parent().trigger("click"), clearInterval(n.timerInterval))
                }, 1e3)
            } else console.error("Invalid option " + e[0] + ", must be confirm/cancel")
        },
        reactOnKey: function (e) {
            var n = t(".jconfirm");
            if (n.eq(n.length - 1)[0] !== this.$el[0]) return !1;
            var i = e.which;
            if (this.contentDiv.find(":input").is(":focus") && /13|32/.test(i)) return !1; - 1 !== t.inArray(i, this.cancelKeys) && (this.$cancelButton ? this.$cancelButton.click() : this.close()), -1 !== t.inArray(i, this.confirmKeys) && this.$confirmButton && this.$confirmButton.click()
        },
        setDialogCenter: function () {
            if ("none" == this.$contentPane.css("display")) var e = 0,
                n = 0;
            else {
                var e = this.$content.outerHeight(),
                    n = this.$contentPane.height();
                0 == n && (n = e)
            }
            var i = this.$content.outerWidth();
            this.$content.css({
                clip: "rect(0px " + (100 + i) + "px " + e + "px -100px)"
            }), this.$contentPane.css({
                height: e
            });
            var s = t(window).height(),
                o = this.$b.outerHeight() - n + e,
                a = (s - o) / 2;
            if (o > s - 100) {
                var c = {
                    "margin-top": 50,
                    "margin-bottom": 50
                };
                t("body").addClass("jconfirm-noscroll")
            } else {
                var c = {
                    "margin-top": a
                };
                t("body").removeClass("jconfirm-noscroll")
            }
            this.$b.css(c)
        },
        close: function () {
            var e = this;
            if (this.isClosed()) return !1;
            "function" == typeof this.onClose && this.onClose(), this._unwatchContent(), e._lastFocused.focus(), t(window).unbind("resize." + this._rand), this.keyboardEnabled && t(window).unbind("keyup." + this._rand), e.$el.find(".jconfirm-bg").removeClass("seen"), t("body").removeClass("jconfirm-noscroll"), this.$b.addClass(this.closeAnimation);
            var n = "anim-none" == this.closeAnimation ? 0 : this.animationSpeed;
            return setTimeout(function () {
                e.$el.remove()
            }, 25 * n / 100), jconfirm.record.closed += 1, jconfirm.record.currentlyOpen -= 1, !0
        },
        open: function () {
            var t = this;
            if (this.isClosed()) return !1;
            t.$el.find(".jconfirm-bg").addClass("seen"), this.$b.removeClass(this.animation), this.$b.find("input[autofocus]:visible:first").focus(), jconfirm.record.opened += 1, jconfirm.record.currentlyOpen += 1, "function" == typeof this.onOpen && this.onOpen();
            var e = "jconfirm-box" + this._rand;
            return this.$b.attr("aria-labelledby", e).attr("tabindex", -1).focus(), this.$title ? this.$title.attr("id", e) : this.$content && this.$content.attr("id", e), setTimeout(function () {
                t.$b.css({
                    "transition-property": t.$b.css("transition-property") + ", margin"
                }), t._modalReady.resolve()
            }, this.animationSpeed), !0
        },
        isClosed: function () {
            return "" === this.$el.css("display")
        }
    }, jconfirm.pluginDefaults = {
        template: '<div class="jconfirm"><div class="jconfirm-bg"></div><div class="jconfirm-scrollpane"><div class="container"><div class="row"><div class="jconfirm-box-container"><div class="jconfirm-box" role="dialog" aria-labelledby="labelled" tabindex="-1"><div class="closeIcon">&times;</div><div class="title-c"><span class="icon-c"></span><span class="title"></span></div><div class="content-pane"><div class="content"></div></div><div class="buttons"></div><div class="jquery-clear"></div></div></div></div></div></div></div>',
        title: "提示",
        content: "确定吗",
        contentLoaded: function () {},
        icon: "",
        opacity: null,
        confirmButton: "确定",
        cancelButton: "取消",
        confirmButtonClass: "btn",
        cancelButtonClass: "btn btn-slight",
        buttonsReverse: !1,
        theme: "white",
        animation: "scale",
        closeAnimation: "none",
        animationSpeed: 500,
        animationBounce: 1.2,
        keyboardEnabled: !1,
        rtl: !1,
        confirmKeys: [13],
        cancelKeys: [27],
        container: "body",
        confirm: function () {},
        cancel: function () {},
        backgroundDismiss: !0,
        autoClose: !1,
        closeIcon: null,
        closeIconClass: !1,
        watchInterval: 100,
        columnClass: "pop-container",
        onOpen: function () {},
        onClose: function () {},
        onAction: function () {}
    }, jconfirm.record = {
        opened: 0,
        closed: 0,
        currentlyOpen: 0
    }
}(jQuery),
function (t, e, n) {
    "use strict";
    var i = (t(e), t(document), !-[1] && e.XMLHttpRequest, !1),
        s = function (e) {
            this.settings = t.extend({}, s.defaults, e), this.init()
        };
    s.defaults = {
        bind: !1,
        wrapClass: "",
        content: "请稍等...",
        title: "提示",
        onCancel: null,
        onOpen: null,
        onConfirm: null,
        onClose: null,
        closeText: !0,
        confirmText: "确定",
        cancelText: "取消",
        position: "center",
        inline: !1,
        isSelecter: !1,
        element: null,
        preKa: "",
        autoTime: null,
        lock: !0,
        closeLayer: !0,
        opacityLock: !1
    }, s.prototype = {
        init: function () {
            this.create()
        },
        create: function () {
            var e = "",
                n = "",
                i = "",
                s = "",
                o = "",
                a = "",
                c = "";
            this.settings.type && (e = '<i class="icon-dialog icon-dialog-' + this.settings.type + '"></i>'), this.settings.lock && (i = '<div class="dialog-layer"></div>', this.settings.opacityLock && (i = '<div class="dialog-layer dialog-opacity-layer"></div>')), this.settings.preKa && (s = this.settings.preKa + "_"), ("around" == this.settings.position || this.settings.inline) && (o = '<span class="icon-dialog-arrow"></span>'), this.settings.closeText && (a = '<a href="javascript:;" class="close" ka="' + s + 'dialog_close"><i class="icon-close"></i></a>'), (this.settings.confirmText || this.settings.cancelText) && (c = '<div class="dialog-footer"><div class="btns"></div></div>'), n = '<div class="dialog-wrap">' + i + '<div class="dialog-container">' + o + '<div class="dialog-title">' + e + '<h3 class="title">' + this.settings.title + "</h3>" + a + '</div><div class="dialog-con">' + this.settings.content + "</div>" + c + "</div></div>", t(".dialog-wrap").length && !this.settings.inline && t(".dialog-wrap").remove(), this.settings.inline && this.settings.element ? this.dialog = t(n).appendTo(t(this.settings.element).parent()) : this.dialog = t(n).appendTo("body"), (this.settings.onConfirm || this.settings.confirmText) && this.onConfirm(), (this.settings.onCancel && !1 !== this.settings.cancelText || this.settings.cancelText) && this.onCancel(), this.settings.wrapClass && this.dialog.addClass(this.settings.wrapClass), this.settings.type && this.dialog.addClass("dialog-icons-default"), this.settings.position && this.position(), this.bindEvent(), t("body").addClass("dialog-open"), t.isFunction(this.settings.onOpen) && (this.settings.bind ? this.settings.onOpen.apply(this, this.dialog) : this.settings.onOpen(this.dialog)), this.settings.lock && this.lock(), this.autoInter && clearInterval(this.autoInter), t.isNumeric(this.settings.autoTime) && this.autoCloseTimer()
        },
        onConfirm: function () {
            var e = this,
                n = this.dialog.find(".dialog-footer .btns");
            t("<span>", {
                ClASS: "btn btn-sure",
                text: e.settings.confirmText,
                ka: (e.settings.preKa ? e.settings.preKa + "_" : "") + "dialog_confirm",
                click: function () {
                    t.isFunction(e.settings.onConfirm) ? e.settings.bind ? e.settings.onConfirm.apply(e, e.dialog) : e.settings.onConfirm(e.dialog) : e.close("confirm")
                }
            }).prependTo(n)
        },
        onCancel: function () {
            var e = this,
                n = this.dialog.find(".dialog-footer .btns");
            t("<span>", {
                ClASS: "btn btn-outline btn-cancel",
                text: e.settings.cancelText,
                ka: (e.settings.preKa ? e.settings.preKa + "_" : "") + "dialog_cancel",
                click: function () {
                    t.isFunction(e.settings.onCancel) ? e.settings.bind ? e.settings.onCancel.apply(e, e.dialog) : e.settings.onCancel(e.dialog) : e.close("cancel")
                }
            }).prependTo(n)
        },
        size: function () {
            var t = this.dialog.find(".dialog-con");
            this.dialog.find(".dialog-container");
            t.css({
                width: this.settings.width,
                height: this.settings.height
            })
        },
        position: function () {
            if (this.settings.element) {
                var n = this,
                    i = n.settings.element,
                    s = n.dialog.find(".dialog-container").outerWidth(),
                    o = t(i).offset(),
                    a = o.left + i.width() / 2;
                a < s && (a = s / 2), n.settings.inline || "around" != n.settings.position || n.dialog.css({
                    left: a + "px",
                    top: o.top + "px"
                }), n.settings.inline && (n.dialog.get(0).getBoundingClientRect().top > 330 && e.innerHeight - n.dialog.get(0).getBoundingClientRect().top < 280 && n.dialog.addClass("dialog-up-default"), n.settings.isSelecter && t(document).on("click", function (e) {
                    e.target == i.get(0) || e.target.parentNode == i.get(0) || t(e.target).closest(".dialog-selecter-default").length || (n.dialog.closest(".dropdown-wrap").removeClass("dropdown-menu-open"), n.close())
                }))
            }
        },
        lock: function () {
            if (!i) {
                var t = this;
                t.dialog.find(".dialog-container");
                this.settings.closeLayer && t.dialog.find(".dialog-layer").on("click", function () {
                    t.close()
                })
            }
        },
        unLock: function () {
            this.settings.lock && i && (t("html,body").css("overflow", "visible"), i = !1)
        },
        close: function (e) {
            t.isFunction(this.settings.onClose) && this.settings.onClose(this.dialog, e || ""), this.dialog.remove(), this.unLock(), this.autoInter && clearInterval(this.autoInter), t("body").removeClass("dialog-open")
        },
        hide: function (e) {
            t.isFunction(this.settings.onClose) && this.settings.onClose(this.dialog, e || ""), this.dialog.hide(), this.unLock(), t("body").removeClass("dialog-open")
        },
        autoCloseTimer: function () {
            var t = this,
                e = t.dialog.find(".btn-sure"),
                n = t.settings.autoTime,
                i = e.text();
            n && (t.autoInter && clearInterval(t.autoInter), t.autoInter = setInterval(function () {
                n <= 1 ? (clearInterval(t.autoInter), t.close("timer")) : (n--, e.text(i + "(" + n + "s)"))
            }, 1e3))
        },
        bindEvent: function () {
            var n = this;
            this.dialog.find(".close").on("click", function () {
                n.close("")
            }), t(e).on("resize.dialog", function () {
                n.settings.onResize && n.settings.onResize(n.dialog)
            })
        }
    }, t.dialog = function (t) {
        return new s(t)
    }
}(jQuery, window),
function (t, e, n) {
    "use strict";
    var i = (t(e), t(document), !1),
        s = function (e) {
            if ("string" == typeof e) var e = {
                content: e
            };
            this.settings = t.extend({}, s.defaults, e), this.init()
        };
    s.defaults = {
        content: "提示",
        lock: !1,
        wrapClass: null,
        type: null,
        position: "top",
        parentWrap: "body",
        time: 2300,
        pending: ""
    }, s.prototype = {
        init: function () {
            this.create(), this.settings.lock && this.lock()
        },
        create: function () {
            var e = "",
                n = "",
                i = this;
            this.settings.type && (e = '<i class="icon-toast-' + this.settings.type + '"></i>'), n = '<div data-pending="' + this.settings.pending + '" id="toast"><div class="toast-con">' + e + this.settings.content + "</div></div>", t("#toast").length && t("#toast").remove(), this.toast = t(n).appendTo(this.settings.parentWrap), this.settings.wrapClass && this.toast.addClass(this.settings.wrapClass), this.settings.position && this.position(), this.time(), this.toast.on("click", function () {
                i.close()
            })
        },
        position: function () {
            "top" == this.settings.position && this.toast.css("top", 0), "center" == this.settings.position && this.toast.css("bottom", 0), "bottom" == this.settings.position && this.toast.css("bottom", 0)
        },
        lock: function () {
            i || (t("html,body").css("overflow", "hidden"), i = !0)
        },
        unLock: function () {
            this.settings.lock && i && (t("html,body").css("overflow", "visible"), i = !1)
        },
        close: function () {
            var t = this;
            t.toast.addClass("slideup"), setTimeout(function () {
                t.toast.removeClass("slideup").remove()
            }, 500), t.unLock()
        },
        time: function () {
            var t = this;
            this.settings.time && "loading" != this.settings.type && (this.closeTimer = setTimeout(function () {
                t.close()
            }, this.settings.time))
        }
    }, t.toast = function (t) {
        new s(t)
    }
}(jQuery, window);
var Payment = function () {
        function t(t) {
            var t = $.extend({
                article: "",
                text: "",
                cancelText: !1,
                confirmText: "确定",
                close: function () {},
                confirm: function () {}
            }, t);
            $.dialog({
                title: "",
                content: c.notice(t),
                confirmText: t.confirmText,
                cancelText: t.cancelText,
                closeText: !0,
                wrapClass: "commerical-success-notice pop-payment",
                lock: !0
            })
        }

        function e(t) {
            var t = $.extend({
                    article: "",
                    text: "",
                    confirmText: "确定",
                    close: function () {},
                    confirm: function () {}
                }, t),
                e = function () {
                    var e = this.$content,
                        n = this;
                    e.on("click", ".success-confirm", function () {
                        n.close(), t.confirm("confirm")
                    }), e.on("click", ".success-cancel", function () {
                        n.close(), t.confirm("close")
                    })
                };
            $.confirm({
                backgroundDismiss: !1,
                content: c.success(t),
                confirmButton: !1,
                cancelButton: !1,
                buttonsReverse: !0,
                closeIcon: !1,
                columnClass: "pop-payment",
                title: !1,
                onOpen: e,
                onClose: t.close,
                ononfirm: t.confirm
            })
        }

        function n(t, e, n) {
            var i, s = !0,
                o = {
                    bzbParam: t.bzbParam
                };
            t.query && (o = $.extend(o, t.query));
            var e = $.extend({
                    success: function () {},
                    fail: function () {}
                }, e),
                c = function (n) {
                    s && (i.close(), n.ptype = t.data.payType, e.success(n))
                },
                r = function () {
                    $(".pop-payment .PaymentCheck").html('<i class="loader-gray-17"></i>正在查询支付结果，请稍后'), a.get.queryStatus(t, o).then(function (t) {
                        if (1 !== t.zpData.state) {
                            $(".pop-payment .PaymentCheck").html('<span class="gray">未支付成功，请您扫码完成支付。</span><a class="PayCheckBtn" href="javascript:">重新查询</a>')
                        } else 0 === t.code && 1 == t.zpData.state && (s = !1, c(t))
                    })
                },
                l = function () {
                    a.get.queryStatus(t, o).then(function (t) {
                        0 === t.code && 1 !== t.zpData.state ? s && setTimeout(l, 3e3) : 0 === t.code ? (s && c(t), s = !1) : $.toast({
                            type: "error",
                            content: t.message
                        })
                    })
                },
                d = function () {
                    var t = this.$content;
                    i = this, setTimeout(l, 1500), t.on("click", ".PayCheckBtn", r)
                },
                p = function () {
                    s = !1, e.close && e.close()
                },
                u = function () {};
            ! function (t) {
                $.confirm({
                    content: t,
                    confirmButton: !1,
                    cancelButton: !1,
                    buttonsReverse: !0,
                    closeIcon: !1,
                    columnClass: "pop-payment",
                    title: !1,
                    onOpen: d,
                    onClose: p,
                    confirm: u
                })
            }(n)
        }

        function i(t, e) {
            var n, i = {
                    success: function () {},
                    cancel: function () {},
                    fail: function () {}
                },
                e = $.extend(i, e),
                t = $.extend({
                    recharge: !1
                }, t),
                r = function (t, e) {
                    a.post.purchase(t, e).then(function (i) {
                        var a = !!t.condition && t.condition(i);
                        return 0 != i.code || 1 !== i.zpData.status && 3 !== i.zpData.status && !t.recharge ? ($.toast({
                            type: "error",
                            content: i.message
                        }), !1) : a ? t.success(i.zpData) : 4 == t.data.payType && 1 === i.zpData.status ? (n && n.close("confirm"), e.buy && e.buy({
                            pay: t.amount,
                            orderId: i.zpData.orderId,
                            orderNo: i.zpData.orderNo,
                            balance: t.balance,
                            payType: t.data.payType
                        }), e.success(i.zpData)) : (t.orderId = i.zpData.orderId, t.qrCode = i.zpData.qrUrl, t.orderNo = i.zpData.orderNo, 2 == t.data.payType ? s(t, e) : o(t, e), e.buy && e.buy({
                            pay: t.amount,
                            balance: t.balance,
                            payType: t.data.payType,
                            orderNo: i.orderNo
                        }), void(n && n.close("confirm")))
                    }, function () {})
                },
                l = function (i) {
                    var s = $(i);
                    n = this, s.on("click", ".prop-order-type p", function () {
                        if ($(this).hasClass("selected") || $(this).hasClass("disabled")) return !1;
                        s.find(".prop-order-type .selected").addClass("disabled").removeClass("selected"), $(this).addClass("selected").addClass("disabled"), t.data.payType = $(this).attr("data-payType"), r(t, e)
                    }), s.on("click", ".btn-block", function () {
                        if ($(this).hasClass("disabled")) return !1;
                        t.data.payType = 4, $(this).addClass("disabled"), r(t, e)
                    }), s.on("click", ".item-coupon-list span", function () {
                        $(this).hasClass("selected") ? $(this).removeClass("selected") : ($(".item-coupon-list .selected").removeClass("selected"), $(this).addClass("selected"));
                        var e = $(this).index(),
                            n = t.userCouponList[e];
                        $(this).hasClass("selected") ? (t.coupon = 100 * n.offAmount, t.discountId = n.discountId, s.find(".coupon-left").hide(), s.find(".coupon-selected").text("-" + t.coupon / 100 + "直豆").show()) : (t.coupon = 0, t.discountId = "0", s.find(".coupon-left").show(), s.find(".coupon-selected").hide());
                        var i = t.amount,
                            o = t.coupon;
                        t.pay = i > o ? i - o : 0, t.cost = t.amount - t.balance - t.coupon, t.cost <= 0 && (t.data.payType = 4), s.find(".pay-amount").text(t.pay / 100 + "直豆"), t.cost > 0 || t.recharge ? (s.find(".prop-order-type").show(), s.find(".btn-block").hide()) : (s.find(".btn-block").show(), s.find(".prop-order-type").hide())
                    }), s.on("click", ".coupon-left", function () {
                        s.find(".item-coupon").toggleClass("unfold")
                    }), s.on("click", ".coupon-selected", function () {
                        s.find(".item-coupon").toggleClass("unfold")
                    }), s.on("click", ".bead-close", function () {
                        n.close(), e.cancel && e.cancel()
                    })
                },
                d = function () {
                    return e.fail()
                },
                p = function () {},
                u = function (t) {
                    $.dialog({
                        bind: !0,
                        title: "",
                        content: t,
                        closeText: !1,
                        confirmText: "",
                        cancelText: "",
                        closeLayer: !1,
                        inline: !0,
                        wrapClass: "pop-payment flex-dialog-wrap",
                        onOpen: l,
                        onClose: d,
                        confirm: p
                    })
                };
            if ($(".pop-payment").length) return !1;
            if (t.recharge) u(c.recharge(t));
            else {
                var f = t.prePayUrl || "";
                a.post.order(t, f, function (n) {
                    1011 === n.code && (window.location.href = "/logout/");
                    var i = parseInt(n.remainAmount, 10),
                        s = {
                            discountId: n.discountId,
                            itemIcon: n.bizIcon,
                            balance: i,
                            amount: n.amount,
                            pay: n.needAmount,
                            note: n.bizNote || "",
                            coupon: n.offAmount,
                            cost: n.amount - n.offAmount - n.remainAmount,
                            bzbParam: n.bzbParam,
                            userCouponList: n.userCouponList,
                            description: n.bizName ? n.bizName : t.description
                        };
                    t = $.extend(t, s), t.cost < 1 && (t.data.payType = 4), 0 == t.amount ? e.success(t) : u(c.purchase(t))
                })
            }
        }

        function s(t, e) {
            var i = {
                type: "wx",
                name: "微信支付",
                pay: t.pay,
                qrCode: t.qrCode
            };
            n(t, e, c.pay(i)), __conversion("payment_wx")
        }

        function o(t, e) {
            var i = {
                type: "zfb",
                name: "支付宝",
                pay: t.pay,
                qrCode: t.qrCode
            };
            n(t, e, c.pay(i)), __conversion("payment_zfb")
        }
        var a = {},
            c = {},
            r = "Free";
        return a.get = {}, a.post = {}, a.post.orderInfo = function (t, e) {
            var n = $.Deferred();
            return $.post("/wapi/zpp/user/bzbOrderInfo", {
                bzbParam: t
            }, function (t) {
                0 == t.code ? n.resolve(t) : $.toast({
                    type: "error",
                    content: t.message
                })
            }), n
        }, a.get.coupon = function (t) {
            var e = $.Deferred();
            return $.get("/wapi/zpp/user/bzbDiscountList", {
                bzbParam: t,
                pageSize: 10
            }, function (t) {
                0 == t.code ? e.resolve(t) : $.toast({
                    type: "error",
                    content: t.message
                })
            }), e
        }, a.post.order = function (t, e, n) {
            r = "pending";
            var i = "/wapi/zpitem/web/itemMall/preOrder/" + t.itemId;
            !t.data.priceId && t.itemId || (i = "/wapi/zpblock/order/preorder");
            var s = function (t) {
                    r = "free", $.when(a.post.orderInfo(t), a.get.coupon(t)).then(function (e, i) {
                        e.userCouponList = i.zpData.discountList || [];
                        var s = $.extend({}, e.zpData, {
                            bzbParam: t,
                            userCouponList: i.zpData.discountList || []
                        });
                        n(s)
                    })
                },
                o = function (t) {
                    if ("string" == typeof t && (t = JSON.parse(t)), 1011 === t.code) return window.location.href = "/user/login";
                    0 == t.code && 1 == t.zpData.status ? s(t.zpData.bzbParam) : $.toast({
                        type: "error",
                        content: t.message
                    })
                };
            t.data.priceId ? (t.data.bz = t.data.business, t.data.jid = t.data.jobId, $.post(i, t.data, o)) : $.post(i, {
                paramsJson: encodeURIComponent(JSON.stringify(t.data))
            }, o)
        }, a.get.queryStatus = function (t, e) {
            var n = $.Deferred(),
                i = i = "/wapi/zpp/user/payOrderSync";
            return $.ajax({
                method: "post",
                url: i,
                data: {
                    orderId: t.orderId
                },
                cache: !1,
                success: function (t) {
                    n.resolve(t)
                }
            }), n
        }, a.post.purchase = function (t, e) {
            var n = $.Deferred(),
                i = "/wapi/zpp/user/bzbOrder",
                s = {
                    bzbParam: t.bzbParam,
                    discountId: t.discountId,
                    bzbChannel: t.data.payType
                };
            return t.recharge && (i = "/wapi/zpp/user/rechargeBean", s = {
                amount: 100 * t.data.beanCount,
                payChannel: t.data.payType
            }), $.ajax({
                method: "post",
                url: i,
                data: s,
                cache: !1,
                success: function (t) {
                    if (0 != t.code) return $.toast({
                        type: "error",
                        content: t.message
                    }), n.reject(t), e.fail();
                    n.resolve(t)
                },
                error: function () {
                    return e.fail()
                }
            }), n
        }, c.pay = function (t) {
            return Utemplate('<div class="mb-payment"><p class="mb-payment-title"><img src="/v2/web/boss/images/icon-shield.png" />安全支付</p><div class="mb-pay-info"><i class="icon-<%this.type%>"></i><%this.name%><i class="currency">￥</i><i class="amount"><%this.pay / 100%></i></div><div class="qr-code"><img src="<%this.qrCode%>" /></div><div class="mb-payment-result PaymentCheck"><span class="gray">使用<%this.name%>扫码支付</span><a class="PayCheckBtn" href="javascript:">我已支付</a></div></div>', t)
        }, c.purchase = function (t) {
            return Utemplate('<div class="mb-payment"><p class="mb-payment-title"><img src="/v2/web/boss/images/icon-shield.png" /><%if(this.article){%><%this.article%><%}else{%>确认支付<%}%><i class="bead-close"></i></p><dl class="order-detail"><dt><img src="<%this.itemIcon%>"><div class="item-prop fl"><p ><span class="item-name"><%this.description%></span><%if(this.note){%><br><%this.note%><%}%></p></div><span class="fr"><%this.amount/100%>直豆</span></dt><%if (0 < this.userCouponList.length) {%><dd class="item-coupon"><p>优惠券<span class="fr coupon-selected" <%if(0 < this.coupon){%>style="display: block;"<%}%>>-<%this.coupon/100%>直豆</span><span class="fr coupon-left" <%if(0 < this.coupon){%>style="display: none;"<%}%>><%this.userCouponList.length%>张可用</span></p><div class="item-coupon-list"><%for(var i=0;i<this.userCouponList.length;i++){%><span <%if(i==0){%>class="selected"<%}%> data-id="<%this.userCouponList[i].discountId%>" <%if(this.userCouponList[i].selected){%>class="selected"<%}%>>减<%this.userCouponList[i].offAmount%>直豆</span><%}%></div></dd><%}%><dd>直豆余额<span class="fr"><%this.balance/100%>直豆</span></dd><dd>还需支付<span class="fr pay-amount"><%this.pay/100%>直豆</span></dd></dl><div class="prop-order"><div class="prop-order-type" <%if(this.cost <= 0){%>style="display: none;"<%}%>> <div class="prop-type-article">直豆余额不足，请选择支付方式：</div> <p class="fl payment-wx" data-type="wx" data-payType="2"><i class="icon-wx"></i>微信支付</p> <p class="fr payment-zfb" data-type="zfb" data-payType="1"><i class="icon-zfb"></i>支付宝</p> </div><div class="prop-buttons"><button class="btn btn-block"  <%if(0 < this.cost){%>style="display: none;"<%}%>>立即支付</button></div><div class="payment-agreement">付费即表示同意<a href="https://m.zhipin.com/H5/html/protocol/incrementProtocol.html" target="_blank">《Boss直聘增值服务协议》</a></div></div></div>',t)},c.recharge=function(t){
return Utemplate('<div class="mb-payment"><p class="mb-payment-title"><img src="/v2/web/boss/images/icon-shield.png" />确认支付<i class="bead-close"></i></p><dl class="order-detail"><dt><img src="/v2/web/boss/images/prop/icon-bean.png" /><span class="item-name"><%this.description%></span><span class="fr"><%this.amount/100%>直豆</span></dt><dd>支付金额<span class="fr pay-amount">￥<%this.pay/100%></span></dd></dl><div class="prop-order"><div class="prop-order-type"> <div class="prop-type-article">请选择支付方式：</div> <p class="fl payment-wx" data-type="wx" data-payType="2"><i class="icon-wx"></i>微信支付</p> <p class="fr payment-zfb" data-type="zfb" data-payType="1"><i class="icon-zfb"></i>支付宝</p> </div><div class="payment-agreement">付费即表示同意<a href="https://m.zhipin.com/H5/html/protocol/incrementProtocol.html" target="_blank">《Boss直聘增值服务协议》</a></div></div></div>', t)
        }, c.success = function (t) {
            return Utemplate('<div class="mb-payment"><p class="mb-payment-title"><img src="/v2/web/boss/images/icon-shield.png" />安全支付</p><div class="pay-info-text"><img src="/v2/web/boss/images/layer/succ.png" /><p class="article"><%this.article%></p><div class="text gray"><%this.text%></div><p><%if(this.cancelText){%><a href="javascript:" class="success-cancel btn"><%this.cancelText%></a><%}%><a href="javascript:" class="success-confirm btn"><%this.confirmText%></a></p></div></div>', t)
        }, c.notice = function (t) {
            return Utemplate('<div class="mb-payment"><p class="mb-payment-title"><img src="/v2/web/boss/images/icon-shield.png" />安全支付</p><div class="pay-info-text"><img src="/v2/web/boss/images/layer/succ.png" /><p class="article"><%this.article%></p><div class="text gray"><%this.text%></div></p></div></div>', t)
        }, {
            wx: s,
            zfb: o,
            notice: t,
            success: e,
            purchase: i,
            balance: a.get.balance
        }
    }(),
    Purchase = function () {
        function t(t, e, n) {
            Payment.success({
                article: t || "购买成功",
                text: e || "",
                confirm: function () {
                    n.confirm && n.confirm()
                },
                close: function () {
                    n.close && n.close()
                }
            })
        }

        function e(e, n, i) {
            "-1" == i.item.view ? i.item.view = "不限" : i.item.view = (i.item.view + "").replace("人", "") + "人";
            var s = i.action ? i.action : "发布",
                o = {
                    ordinary: {
                        1: "火爆职位普通版" + s + "成功！可保持职位在线<%this.description%>，期间每日查看牛人上限<%this.view%>，开聊上限<%this.employ%>。",
                        2: "",
                        3: "火爆职位普通版" + i.action + "成功！可保持职位在线<%this.description%>，期间每日查看牛人上限<%this.view%>，开聊上限<%this.employ%>。",
                        4: "已成功升级至火爆职位畅聊版！当前剩余有效期<%this.restDays%>天，期间每日查看牛人<%this.view%>，开聊<%this.employ%>人。"
                    },
                    carefree: {
                        1: "火爆职位畅聊版发布成功！可保持职位在线<%this.description%>，期间每日查看牛人<%this.view%>，开聊牛人<%this.employ%>。",
                        2: "",
                        3: "火爆职位畅聊版" + i.action + "成功！可保持职位在线<%this.description%>，期间每日查看牛人<%this.view%>，开聊牛人<%this.employ%>。",
                        4: "已成功升级至火爆职位畅聊版！当前剩余有效期<%this.restDays%>天，期间每日查看牛人<%this.view%>，开聊<%this.employ%>人。"
                    },
                    experience: {
                        1: "火爆职位普通版发布成功！该职位可免费在线<%this.expiredays%>天，为避免影响招聘，请及时延长招聘时长。",
                        2: "火爆职位普通版发布成功！该职位可免费在线<%this.expiredays%>天，为避免影响招聘，请及时延长招聘时长。",
                        3: "火爆职位普通版发布成功！该职位可免费在线<%this.expiredays%>天，为避免影响招聘，请及时延长招聘时长。",
                        4: "火爆职位普通版发布成功！该职位可免费在线<%this.expiredays%>天，为避免影响招聘，请及时延长招聘时长。",
                        5: "火爆职位普通版发布成功！该职位可免费在线<%this.expiredays%>天，为避免影响招聘，请及时延长招聘时长。"
                    }
                },
                a = {
                    ordinary: {
                        1: "火爆职位-普通版",
                        2: "",
                        3: "火爆职位-普通版",
                        4: "火爆职位-普通版"
                    },
                    carefree: {
                        1: "火爆职位-畅聊版",
                        2: "",
                        3: "火爆职位-畅聊版",
                        4: "火爆职位-畅聊版"
                    },
                    experience: {
                        1: "火爆职位",
                        2: "",
                        3: "",
                        4: "",
                        5: "火爆职位"
                    }
                },
                c = {
                    0: {
                        1: "block_sendjob_purchase_hot_",
                        2: "block_extendjob_purchase_hot_",
                        3: "block_openjob_purchase_hot_",
                        4: "block_upgradejob_purchase_hot_"
                    },
                    1: {
                        1: "block_sendjob_purchase_super_",
                        2: "block_extendjob_purchase_super_",
                        3: "block_openjob_purchase_super_",
                        4: "block_upgradejob_purchase_super_"
                    }
                };
            try {
                var r = c[n.hotJobType][n.action] + n.priceId;
                _T.sendEvent(r)
            } catch (t) {}
            var s = i.item.type || "ordinary",
                l = Utemplate(o[s][n.action], i.item),
                d = a[s][n.action],
                p = i.action ? i.action + "成功" : "发布成功";
            (i.item.combos && i.item.combos.activityType || i.item.activityType) && (l += '<ul class="vip-promotion-2018-notice"><li>1.活动截止时间2019年1月1日,超出活动时间范围，购买的商品不再享受活动折扣</li><li>2.本次优惠活动仅针对部分用户,最终解释权归BOSS直聘所有</li><li>3.活动期间购买的商品原则上无法申请退款,如因平台原因导致您无法使用账号的赠送时长请联系客服</li></ul>');
            var u = function (e) {
                    t(p, l, i), "function" == typeof i.success && i.success(e)
                },
                f = {
                    url: e,
                    data: n,
                    description: d,
                    amount: i.item.pay,
                    success: u
                },
                h = {
                    success: function (t) {
                        var e = {
                            1: "bean",
                            2: "wx",
                            3: "zfb"
                        };
                        n.hotJobType && n.action && t.ptype && window.top.__conversion(c[n.hotJobType][n.action] + e[t.ptype] + "_" + n.priceId), u(t)
                    }
                };
            Payment.purchase(f, h)
        }
        return {
            vip: function (t, e) {
                var n = e || {},
                    i = function () {
                        $.toast({
                            type: "success",
                            content: "您已成功购买VIP账号，可在VIP权益页面查看使用明细"
                        }), n.success && n.success()
                    },
                    s = {
                        url: "/boss/item/pay/vipaccount.json",
                        data: t,
                        description: "购买道具：「VIP账号」- 1个月",
                        amount: parseInt(t.amount, 10),
                        success: i
                    },
                    o = {
                        success: i
                    };
                Payment.purchase(s, o)
            },
            position: e,
            commercial: function (e, n) {
                var i = 11 == n.item.business ? "普通职位" : "火爆职位",
                    s = "";
                n.item && n.item.categoryList && n.item.categoryList.filter(function (t) {
                    return t.name && t.name.indexOf("道具购买折扣") > -1
                }).length && (s = "（VIP道具专享价目前只支持6.12以上版本和网页版使用，暂不支持iOS）");
                var o = {
                        1: "免费试用火爆职位",
                        2: i + "-<%this.priceName%>",
                        3: "升级VIP账号",
                        4: "购买" + n.item.title,
                        5: "升级VIP账号",
                        6: i + "-<%this.priceName%>",
                        7: "",
                        8: "",
                        9: "免费试用火爆职位",
                        10: i + "-<%this.priceName%>",
                        11: "升级VIP账号",
                        12: "购买<%this.title%>",
                        16: "升级VIP账号"
                    },
                    a = {
                        1: "火爆职位发布成功！该职位可<%this.title%>，为避免影响招聘，请及时延长招聘时长。",
                        2: i + "<%this.priceName%>发布成功！可保持职位在线一个月，期间可<%this.descList[1].bottomDesc%>牛人<%this.descList[1].count%><%this.descList[1].unitDesc%>，<%this.descList[0].bottomDesc%><%this.descList[0].count%><%this.descList[0].unitDesc%>。",
                        3: "您已成功购买VIP账号，可在VIP权益页面查看使用明细" + s,
                        4: "您已成功购买「<%this.title%>」，<%if(this.business != 16){%><%this.inDate%>内，<%}%>主动沟通人数<%this.chat%>，赠送主动查看人数<%this.view%>。",
                        5: "您已成功购买VIP账号，可在VIP权益页面查看使用明细" + s,
                        6: i + "<%this.priceName%>发布成功！可保持职位在线<%this.expireName%>，期间可<%this.descList[1].bottomDesc%>牛人<%this.descList[1].count%><%this.descList[1].unitDesc%>，<%this.descList[0].bottomDesc%><%this.descList[0].count%><%this.descList[0].unitDesc%>。",
                        7: "",
                        8: "",
                        9: "",
                        10: i + "<%this.priceName%>发布成功！可保持职位在线<%this.expireName%>，期间可<%this.descList[1].bottomDesc%>牛人<%this.descList[1].count%><%this.descList[1].unitDesc%>，<%this.descList[0].bottomDesc%><%this.descList[0].count%><%this.descList[0].unitDesc%>。",
                        11: "您已成功购买VIP账号，可在VIP权益页面查看使用明细" + s,
                        12: "",
                        16: "您已成功购买VIP账号，可在VIP权益页面查看使用明细" + s
                    };
                4 == n.item.cardId && (n.title = n.item.title, n.item.chat = n.item.chatDescList[0], n.item.inDate = n.item.chatDescList.length > 2 ? n.item.chatDescList[1] : "", n.item.view = "+" + 2 * parseInt(n.item.chat, 10) + "次");
                var c = n.item ? n.item : n,
                    r = c.cardId,
                    l = Utemplate(o[r], c),
                    d = 9 == r ? function (t) {
                        return t.categoryList ? t.categoryList.map(function (t) {
                            return t.bottomDesc + t.count + t.unitDesc
                        }).join("，") : ""
                    }(c) : Utemplate(a[r], c),
                    p = function (e) {
                        var i = function () {};
                        if (n.success ? i = n.success : n.confirm && (i = n.confirm), e.bzbParam) return $.get("/wapi/zpblock/order/bzbquery", {
                            bzbParam: e.bzbParam
                        }).success(function (e) {
                            t(e.zpData.dialog.title, e.zpData.dialog.content, {
                                confirm: i
                            })
                        }), !0;
                        var s = "";
                        3 == r && c.activityType && (s = '<ul class="vip-promotion-2018-notice"><li>特别注意：</li><li>1. 活动期间，每个用户只能购买一次VIP账号，不可多次购买；</li><li>2. 活动期间购买的商品原则上无法申请退款，如因平台原因导致您无法使用账号的赠送时长请联系客服；</li></ul>'), 2 == r && c.activityType && (s = '<ul class="vip-promotion-2018-notice"><li>特别注意：</li><li>1. 活动截止时间1月1日,超出活动时间范围，购买的商品不再享受活动折扣；</li><li>2. 本次优惠活动仅针对部分用户,最终解释权归BOSS直聘所有；</li><li>3. 活动期间购买的商品原则上无法申请退款如因平台原因导致您无法使用账号的赠送时长请联系客服；</li></ul>'), t(l, d + s, {
                            confirm: i
                        })
                    },
                    u = {
                        url: "/boss/block/pay.json",
                        data: e,
                        tid: c.p || "",
                        description: l,
                        amount: parseInt(c.beanCount, 10),
                        success: p
                    };
                n.item.article && (u.article = n.item.article);
                var f = {
                    buy: function (t) {
                        var e = {
                            action: "confirm-payment",
                            p: "",
                            p2: c.beanCount,
                            p3: t.balance,
                            p4: t.pay,
                            p5: t.pay
                        };
                        Block.action(e)
                    },
                    success: p
                };
                Payment.purchase(u, f)
            }
        }
    }(),
    Recharge = function () {
        function t(t) {
            var e = {
                    recharge: !0,
                    url: t.url || "/boss/item/rechargebean.json",
                    amount: 100 * t.amount,
                    pay: 100 * t.pay,
                    description: "直豆充值：" + t.amount + "个",
                    data: {
                        beanCount: t.amount
                    }
                },
                n = {
                    success: function (e) {
                        t.save ? Payment.success({
                            article: "直豆充值成功",
                            text: "本次充值为您节省了" + t.save + "元"
                        }) : Payment.success({
                            article: "直豆充值成功",
                            text: "你可以在 BOSS直聘 APP「钱包」中查看充值明细"
                        }), "function" == t.callback && t.callback({
                            pay: t.pay,
                            save: t.save,
                            amount: t.amount
                        })
                    }
                };
            Payment.purchase(e, n)
        }

        function e(e) {
            var n = function (t) {
                    var t = $(".recharge-beans-rebate .selected").length ? parseInt($(".recharge-beans-rebate .selected").attr("data-amount"), 10) : $(".recharge-beans-rebate .ipt").val();
                    if ($(".recharge-beans-rebate .order-info").remove(), t > 0) {
                        $(".recharge-beans-rebate .btn-sure").removeClass("disabled");
                        var e = o(t, i(t)),
                            n = '<div class="order-info">支付金额<span class="order-amount">￥' + e.pay + '</span><span class="gray">(已减' + e.save + "元）</span></div>";
                        $(n).insertBefore($(".recharge-beans-rebate .btns"))
                    } else $(".recharge-beans-rebate .btn-sure").addClass("disabled")
                },
                i = function (t) {
                    var n = 0;
                    for (var i in e.discountInfo.rangeDiscount) {
                        t >= parseInt(i, 10) && (n = e.discountInfo.rangeDiscount[i])
                    }
                    return n
                },
                a = function (t) {
                    $(t).on("input", ".ipt-amount", function () {
                        var e = $(this).val().replace(/\D+/g, "");
                        e.length && (e = parseInt($(this).val(), 10)), $(this).val(e), $(t).find(".recharge-rebate-panel .selected").removeClass("selected"), n()
                    }), $(t).on("click", ".recharge-rebate-panel li", function () {
                        $(t).find(".recharge-rebate-panel .selected").removeClass("selected"), $(this).addClass("selected"), n()
                    }), n()
                },
                c = function (n) {
                    if ($(n).find(".btn-sure").hasClass("disabled")) return !1;
                    var s = $(".recharge-beans-rebate .selected").length ? parseInt($(".recharge-beans-rebate .selected").attr("data-amount"), 10) : $(".recharge-beans-rebate .ipt").val();
                    t($.extend({
                        url: e.url,
                        callback: e.success,
                        confirm: e.success
                    }, o(s, i(s)))), $(n).remove()
                };
            $.dialog({
                title: "直豆充值",
                content: s.rebate(function () {
                    return [100, 200, 300, 500, 1e3].map(function (t) {
                        return {
                            amount: t,
                            save: o(t, i(t)).save
                        }
                    })
                }()),
                confirmText: "确定充值",
                cancelText: !1,
                wrapClass: "recharge-beans-rebate",
                onOpen: a,
                onConfirm: c
            })
        }

        function n(e) {
            var n = e.discount ? .9 : 1,
                i = function (t) {
                    var e = function (e) {
                        var e = parseInt(e, 10),
                            i = o(e, n);
                        $(t).find(".order-save").text("-￥" + i.save), $(t).find(".order-pay").text("￥" + i.pay), e ? $(t).find(".btn-sure").removeClass("disabled") : $(t).find(".btn-sure").addClass("disabled")
                    };
                    $(t).on("input", ".ipt-amount", function () {
                        var t = $(this).val().replace(/\D+/g, "");
                        t.length && (t = parseInt($(this).val(), 10)), $(this).val(t), e(t)
                    }), e(100)
                },
                a = function (i) {
                    if ($(i).find(".btn-sure").hasClass("disabled")) return !1;
                    var s = $(i).find(".ipt-amount").val();
                    t($.extend({
                        callback: e.success,
                        url: e.url
                    }, o(s, n))), $(i).remove()
                };
            $.dialog({
                title: "直豆充值",
                content: s.original(e),
                confirmText: "确定充值",
                cancelText: !1,
                wrapClass: "recharge-beans-original",
                onOpen: i,
                onConfirm: a
            })
        }
        var i = {
            get: {}
        };
        i.get.discount = function () {
            var t = $.Deferred();
            return $.get("/boss/item/recharge/discount/check.json", function (e) {
                1 == e.rescode ? t.resolve(e) : $.toast({
                    type: "error",
                    content: e.message
                })
            }), t
        };
        var s = {
                rebate: function (t) {
                        return Utemplate('<p class="gray ios-off">ios用户独享充值折扣（仅限网页版）</p><div><p class="pull-left">直豆充值</p><div class="recharge-rebate-panel"><ul><%for(var i=0; i<this.list.length; i++){%><li ka="selected_amount_<%this.list[i].amount%>" <%if(this.list[i].amount==500){%> class="selected"<%}%> data-amount="<%this.list[i].amount%>"><p class="rebate-item"><%this.list[i].amount%>直豆<span class="rebate-off">减<%this.list[i].save%>元</span><span class="interval"></span></p></li><%}%></ul><input class="ipt ipt-amount" maxlength="4" placeholder="输入任意直豆数"></div></div>',{list:t})},original:function(t){return Utemplate('<ul><li><span class="pull-left">充值直豆个数</span><p><input type="text" value="100" maxlength="4" class="ipt-amount"></p></li><%if(this.discount){%><li><span class="pull-left">iOS用户9折优惠</span><p class="order-save"></p></li><%}%><li><span class="pull-left">金额</span><p  class="order-pay"></p></li><li><p class="ios-notice">因iOS政策限制，直豆在iOS端V6.17以上版本仅可用于道具购买。<br>安卓及PC端不受影响。</p></li></ul>',t)}},o=function(t,e){if(!t)return{amount:0,save:0,pay:0};var n=100*t,i=Math.floor(n*e);return{amount:t,save:(n-i)/100,pay:i/100}};return function(t){i.get.discount().then(function(i){var s=$.extend(t||{},i);return i.discountInfo&&i.discountInfo.rangeDiscount&&!isEmpty(i.discountInfo.rangeDiscount)?e(s):n(s)})}}(),__conversion=__conversion||function(t){try{_T.sendEvent(t)}catch(t){}},Report={init:function(){Report.uploadCount=0,Report.setContent()},setContent:function(){var t=function(t){t.remove(),Report.uploadCount--};$("body").on("click",".icon-report,.link-report",function(){try{_T.sendEvent("report_geek_"+$(".icon-report").siblings(".icon-coop").attr("data-uid"))}catch(t){}var e=$(this).attr("data-uid")||"",n=$(this).attr("data-expect")||"";$.get("/user/report/form.json",function(i){i.rescode?$.dialog({content:i.html,title:"举报",inline:!0,cancelButton:"取消",confirmButton:"确认",wrapClass:"pop-report",onOpen:function(e){"FormsUI"in window&&FormsUI.dropSelect(e),"DropDown"in window&&DropDown.init(e),e.find(".verify-box img").on("click",function(){$(this).attr("src","/captcha/?randomKey="+$(this).siblings(".randomkey").val()+"&_r="+(new Date).getTime())}),e.find("#fileupload").on("click",function(t){$(this).next(".verify-box")?Report.checkForm($(".verify-box"))?Report.uploadPictures($(this),e):t.preventDefault():Report.uploadPictures($(this),e)}),e.on("click",".link-close",function(){t($(this).parents("li"))})},onConfirm:function(t){return Report.submitForm(t,e,n)}}):1011==i.code&&"undefined"!=typeof Detail?Detail.showSign(1011):$.toast({content:i.resmsg,type:"error"})})})},uploadPictures:function(el,popContent){var url="/faqfeedback/pc/upload/picture.json",typeRule=/(\.|\/)(png|jpg|jpeg)$/i,maxSize=3e6,el=el,previewEl=el.siblings(".preview"),uploadContainer=el.closest(".upload"),vertifyEl=popContent.find(".verify-box .ipt");el.fileupload({method:"POST",url:url,dataType:"text",acceptFileTypes:typeRule,maxChunkSize:maxSize,formData:{token:window.top._PAGE.token?window.top._PAGE.token.split("|")[0]:""},add:function(t,e){var n=e.files[0],i=n.name,s=n.size;return fileInfo=n,typeRule.test(i)?s>maxSize?void $.toast({content:"请上传3M以内的文件",type:"error"}):Report.uploadCount>=6?void popContent.find(".preview").siblings(".text-error").html("最多可以上传6张照片"):(popContent.find(".preview").siblings(".text-error").html(""),uploadContainer.find("a").html('上传图片<i class="icon-toast-loading"></i>'),e.formData={randomKey:popContent.find(".randomkey").val()||"",captcha:popContent.find(".verify-box input").val()||""},void e.submit()):void $.toast({content:"请上传png、jpg、jpeg 格式的文件",type:"error"})},done:function(e,data){var result=data.result;"string"==typeof result&&(result=eval("("+result+")")),1==result.rescode?(Report.uploadCount++,setTimeout(function(){previewEl.find("ul").append('<li><img src="'+result.url[0]+'" data-img="'+result.url[1]+'"/><i class="link-close"></i></li>'),popContent.addClass("upload-complate"),uploadContainer.find("a").html("上传图片")},500),popContent.addClass("upload-complate")):(uploadContainer.find("a").html("上传图片"),$.toast({content:result.resmsg,type:"error"}),"验证码错误"==result.resmsg&&(vertifyEl.val("").focus(),popContent.find(".verify-box img").click()))},fail:function(t,e){uploadContainer.find("a").html("上传图片"),$.toast({content:"上传失败",type:"error"})}})},submitForm:function(t,e,n){var i=t,s=$.trim(i.find("textarea").val()),o=!1,a=this,c="",r="",l="";if(i.find(".ipt-wrap").each(function(){return o=a.checkForm($(this)),a.checkForm($(this))}),o&&!i.find(".preview img").length)return t.find(".preview").siblings(".text-error").html("请上传照片！"),!1;i.find(".preview img").each(function(){c+=$(this).attr("data-img")+","}),c=c.substring(0,c.length-1),""!=e?(r=e,l=n):"_reportData"in window?(r=_reportData.reportedId,l=_reportData.targetId):(r=Chat.curUserData.uid,l=Chat.curUserData.infoData.expectId);var d={reportedId:r,reasonCode:$('input[name="reasonCode"]').val(),content:s,targetId:l,imgUrl:c||"",randomKey:i.find(".randomkey").val(),captcha:$(".verify-box input").val()};return o&&(o=!1,$.ajax({url:"/user/report/save.json",type:"POST",data:d,dataType:"JSON",timeout:3e4,success:function(e){e.rescode?($.toast({content:"发送成功，感谢您的反馈 ：）",type:"success"}),Report.uploadCount=0,t.remove()):($.toast({content:e.resmsg,type:"error"}),"验证码错误"==e.resmsg&&(i.find(".verify-box .ipt").val("").focus(),i.find(".verify-box img").click()))},error:function(t){}})),!1},checkForm:function(t){var e,n=t.find(".ipt").val();if(void 0!=t.find(".ipt").attr("data-range")){if(e=t.find(".ipt").attr("data-range").split(",")[1],n.length>e)return t.next(".text-error").html("请输入"+e+"个字以内的内容"),!1;t.next(".text-error").html("")}if(""==n){var i=t.find(".ipt").attr("data-blank");return t.find(".ipt").focus(),t.next(".text-error").html(i),!1}return t.next(".text-error").html(""),!0}};$(function(){Report.init()}),"_PAGE"in window&&_PAGE.token?$.ajaxSettings.beforeSend=function(t,e){t.setRequestHeader("token",_PAGE.token.split("|")[0])}:"_PAGE"in window.top&&window.top._PAGE.token&&($.ajaxSettings.beforeSend=function(t,e){t.setRequestHeader("token",window.top._PAGE.token.split("|")[0])}),$.ajaxSettings.statusCode={200:function(){},602:function(){window.location.href="/logout/"},603:function(){window.location.href="/geek/complete/guide.html"}};var browser={versions:function(){var t=navigator.userAgent;navigator.appVersion;return{trident:t.indexOf("Trident")>-1,presto:t.indexOf("Presto")>-1,webKit:t.indexOf("AppleWebKit")>-1,gecko:t.indexOf("Gecko")>-1&&-1==t.indexOf("KHTML"),mobile:!!t.match(/AppleWebKit.*Mobile.*/),ios:!!t.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),android:t.indexOf("Android")>-1||t.indexOf("Adr")>-1,iPhone:t.indexOf("iPhone")>-1,iPad:t.indexOf("iPad")>-1,webApp:-1==t.indexOf("Safari"),weixin:t.indexOf("MicroMessenger")>-1,qq:" qq"==t.match(/\sQQ/i)}}(),language:(navigator.browserLanguage||navigator.language).toLowerCase()},VerrifyCode=window.VerrifyCode||function(){var t=new Date,e=t.getFullYear()+""+t.getMonth()+t.getDay(),n=function(t,n){seriesLoadScripts("//g.alicdn.com/sd/ncpc/nc.js?t="+e,function(){var e=["BOSS_PC",(new Date).getTime(),Math.random().toString(16)].join(":"),i={renderTo:"#"+t.id,appkey:t.appkey||"FFFF0N00000000006DC1",scene:t.scene||"nc_login",token:e,customWidth:n.find(".row-code").width(),trans:{position:"sign-sms"},elementID:["sign-sms"],is_Opt:0,language:"cn",isEnabled:!0,timeout:3e3,times:5,apimap:{},callback:function(t){n.find("input[name=csig]").length||(n.find("form").append('<input type="hidden" name="csig" />'),n.find("form").append('<input type="hidden" name="ctoken" />'),n.find("form").append('<input type="hidden" name="csessionId" />'),n.find("form").append('<input type="hidden" value="FFFF0N00000000006DC1" name="cappKey" />'),n.find("form").append('<input type="hidden" value="nc_login" name="cscene" />')),n.find("input[name=csig]").val(t.sig),n.find("input[name=ctoken]").val(e),n.find("input[name=csessionId]").val(t.csessionid)}};setTimeout(function(){new noCaptcha(i).upLang("cn",{_startTEXT:"请按住滑块，拖动到最右边",_yesTEXT:"验证通过",_error300:'哎呀，出错了，点击<a href="javascript:__nc.reset()">刷新</a>再来一次',_errorNetwork:'网络不给力，请<a href="javascript:__nc.reset()">点击刷新</a>'})},1)})},i=function(t,n){seriesLoadScripts("//g.alicdn.com/sd/nch5/index.js?t="+e,function(){var e=["BOSS_H5",(new Date).getTime(),Math.random().toString(16)].join(":"),i=NoCaptcha.init({renderTo:"#"+t.id,appkey:t.appkey||"FFFF0N00000000006DC1",scene:"nc_login_h5",token:e,customWidth:"100%",trans:{position:"sign-h5"},elementID:["sign-h5"],is_Opt:0,language:"cn",timeout:1e4,retryTimes:5,errorTimes:5,inline:!1,apimap:{},bannerHidden:!1,initHidden:!1,callback:function(t){n.find("input[name=csig]").length||(n.find("form").append('<input type="hidden" name="csig" />'),n.find("form").append('<input type="hidden" name="ctoken" />'),n.find("form").append('<input type="hidden" name="csessionId" />'),n.find("form").append('<input type="hidden" value="FFFF0N00000000006DC1" name="cappKey" />'),n.find("form").append('<input type="hidden" value="nc_login" name="cscene" />')),n.find("input[name=csig]").val(t.sig),n.find("input[name=ctoken]").val(e),n.find("input[name=csessionId]").val(t.csessionid)},error:function(t){}});NoCaptcha.setEnabled(!0),i.reset(),NoCaptcha.upLang("cn",{LOADING:"加载中...",SLIDER_LABEL:"请向右滑动验证",CHECK_Y:"验证通过",CHECK_N:"验证未通过"})})},s=function(t,e){var s=t||{},o=e||$(".sign-form:visible");if(t||(s.id=o.find(".row-code").attr("id"),s.scene=o.find("input[name=cscene]").val(),s.appkey=o.find("input[name=cappKey]").val()),!s.id)return!1;browser.versions.mobile?i(s,o):n(s,o)},o=function(t){if(!t||!t.length)return!1;var e=t.parents(".sign-form").length?t.parents(".sign-form"):t.parents("form"),n="verrify"+Math.random().toString(32).substr(-6,6);t.empty(),t.attr("id",n),e.find("input[name=csig]").length?(e.find("input[name=csig]").val(""),e.find("input[name=ctoken]").val(""),e.find("input[name=csessionId]").val("")):(e.find("form").append('<input type="hidden" value="" name="csig" />'),e.find("form").append('<input type="hidden" value="" name="ctoken" />'),e.find("form").append('<input type="hidden" value="" name="csessionId" />'),e.find("form").append('<input type="hidden" value="FFFF0N00000000006DC1" name="cappKey" />'),e.find("form").append('<input type="hidden" value="nc_login" name="cscene" />')),s({id:n,scene:e.find("input[name=cscene]").val(),appkey:e.find("input[name=cappKey]").val()},e)},a=function(){$(".sign-form .row-code").each(function(){o($(this))})};return a(),{build:a,reset:o}}(),Feedback={_picCount:0,_limitPicCount:3,getContent:function(){var t=this;$.get("/faqfeedback/pc/create.json").success(function(e){$.dialog({content:e.html,title:'意见反馈<span class="tips">（登录用户，提交反馈后可在App端查看客服回复的消息）</span>',closeText:!0,cancelButton:"取消",confirmButton:"确认",inline:!0,wrapClass:"pop-feedback",closeLayer:!1,onOpen:function(e){var n=e.find(".upload-pics"),i=e.find(".upload-pic-btn"),s=e.find(".upload-pic-btn-wrapper"),o=e.find(".verify-box");Feedback._picCount=0,o.find("img").on("click",function(){$(this).attr("src","/captcha/?randomKey="+$(this).siblings(".randomkey").val()+"&_r="+(new Date).getTime())}),i.on("click",function(i){if(n.children(".upload-pic").length>=Feedback._limitPicCount)return $.toast({content:"最多上传"+Feedback._limitPicCount+"张图片",type:"error"}),i.preventDefault(),!1;o?t.checkForm(o)?t.uploadPicture(n,e):i.preventDefault():t.uploadPicture(n,e)}),n.on("click",".remove-pic",function(t){$(this).closest(".upload-pic").remove(),--Feedback._picCount,n.children(".upload-pic").length<Feedback._limitPicCount&&s.show()})},onConfirm:function(e){return t.submitForm(e)},onCancel:function(t){try{_T.sendEvent("feedback_cancel")}catch(t){}t.remove()}})})},uploadPicture:function(elPicsWrap,popContent){var vertifyEl=popContent.find(".verify-box .ipt"),uploadWaringTimer=null,reg=/(\.|\/)(png|jpg|jpeg)$/i;elPicsWrap.fileupload({method:"POST",url:"/faqfeedback/pc/upload/picture.json",dataType:"text",acceptFileTypes:reg,maxChunkSize:2e6,formData:{randomKey:popContent.find(".randomkey").val()||"",captcha:popContent.find(".verify-box input").val()||""},add:function(t,e){var n=e.files[0],i=n.name,s=n.size;return reg.test(i)?s>2e6?void $.toast({content:"上传文件过大(最大2M)",type:"error"}):Feedback._picCount>=Feedback._limitPicCount?(clearTimeout(uploadWaringTimer),uploadWaringTimer=setTimeout(function(){$.toast({type:"warning",content:"最多上传3张图片"})},100),!1):(++Feedback._picCount,void e.submit()):void $.toast({content:"请上传png、jpg、jpeg 格式的文件",type:"error"})},done:function(e,data){var result=data.result;if("string"==typeof result&&(result=eval("("+result+")")),1==result.rescode){elPicsWrap.find(".upload-pic-btn-wrapper").before('<div class="upload-pic"><div class="remove-pic"></div><img src="'+result.url[0]+'" data-img="'+result.url[1]+'"/></div>'),elPicsWrap.find(".upload-pic").length>=Feedback._limitPicCount&&elPicsWrap.find(".upload-pic-btn-wrapper").hide();try{_T.sendEvent("feedback_pic")}catch(e){}}else clearTimeout(uploadWaringTimer),$.toast({content:result.resmsg?result.resmsg:result.message?result.message:"上传失败",type:"error"}),"验证码错误"==result.resmsg&&(vertifyEl.val("").focus(),popContent.find(".verify-box img").click()),--Feedback._picCount},fail:function(t,e){clearTimeout(uploadWaringTimer),$.toast({content:"上传失败",type:"error"}),--Feedback._picCount}})},submitForm:function(t){var e,n=t,i=n.find("textarea").val(),s=this;n.find(".ipt-wrap").each(function(){return e=s.checkForm($(this)),s.checkForm($(this))});var o={content:i,imgurl:n.find(".upload-pic img").map(function(t,e){return $(e).data("img")}).get()||null,screen:$(window).width()+"*"+$(window).height(),pk:$("#page_key_name").val(),randomKey:n.find(".randomkey").val(),captcha:$(".verify-box input").val()};return e&&(e=!1,$.ajax({url:"/faqfeedback/pc/save.json",type:"POST",data:o,traditional:!0,dataType:"JSON",timeout:3e4,success:function(e){if(e.rescode){$.toast({content:"反馈成功！我们会尽快核实处理",type:"success"});try{_T.sendEvent("feedback_success")}catch(t){}t.remove()}else{$.toast({content:e.resmsg||"提交失败，请稍后再试",type:"error"}),n.find(".verify-box .ipt").val(""),n.find(".verify-box img").click();try{_T.sendEvent("feedback_fail")}catch(t){}}},error:function(t){$.toast({content:"提交失败，请稍后再试",type:"error"});try{_T.sendEvent("feedback_fail")}catch(t){}}})),!1},checkForm:function(t){var e,n,i=t.find(".ipt").val();if(void 0!=t.find(".ipt").attr("data-range")){var s=t.find(".ipt").attr("data-range").split(",");if(n=s[0],e=s[1],i.length>e)return t.next(".text-error").html("请输入"+e+"个字以内的内容"),!1;if(t.next(".text-error").html(""),i.length<n)return t.next(".text-error").html("内容描述至少"+n+"个字"),!1;t.next(".text-error").html("")}if(""==i){var o=t.find(".ipt").attr("data-blank");return t.find(".ipt").focus(),t.next(".text-error").html(o),!1}return t.next(".text-error").html(""),!0}},ItemShop=function(){function t(t){var i,s=function(){t&&t()},o=function(t){var e=this,n=$(t);n.off("click"),n.on("click",".analyzer-combo-list dd",function(){n.find(".analyzer-combo-list .selected").removeClass("selected"),$(this).addClass("selected"),n.find(".analyzer-combo-list dt").removeClass("disabled")}),n.on("click",".analyzer-combo-list dt",function(){e.close();var t=n.find(".analyzer-combo-list .selected").attr("data-id"),i={url:"/geek/item/pay.json",prePayUrl:"/geek/item/prepay.json",data:{itemId:t},itemId:t,success:s},o={success:s,buy:function(t){}};setTimeout(function(){Payment.purchase(i,o)},100)})};e.combo("bf0aaab5053fa3e71nU~").then(function(t){i=t,$.dialog({bind:!0,title:"",content:n.analyzer(t),closeText:!0,confirmText:!1,cancelText:!1,wrapClass:"prop-analyzer-wrap",lock:!0,onOpen:o,onConfirm:function(t){}})})}var e={combo:function(t){var e=$.Deferred();return $.get("/business/item/sellunit.json?itemType="+t).success(function(t){1==t.rescode?e.resolve(t.itemSellUnit):$.toast({content:t.resmsg,type:"error"})}),e}},n={analyzer:function(t){return Utemplate('<div class="analyzer-head"><i class="icon-logo"></i><div><h4><%this.itemName%></h4><%this.itemNote%></div></div><ul class="analyzer-list"><li><div class="analyzer-item"><p class="icon-item icon-compete"></p><p>知己知彼</p><p class="gray">洞悉求职胜算</p></div><div class="analyzer-item"><p class="icon-item icon-compete-hover"></p></div></li><li><div class="analyzer-item"><p class="icon-item icon-expect"></p><p>了解薪资水平</p><p class="gray">查看期望薪资占比</p></div><div class="analyzer-item"><p class="icon-item icon-expect-hover"></p><p>期望薪资占比</p><p class="gray">让BOSS认可你，才能匹配好的薪资</p></div></li><li><div class="analyzer-item"><p class="icon-item icon-active"></p><p>实时招聘动态</p><p class="gray">了解职位招聘进展</p></div><div class="analyzer-item"><p class="icon-item icon-active-hover"></p><p>BOSS活跃情况</p><p class="gray">BOSS对该职位需求非常紧急</p></div></li></ul><dl class="analyzer-combo-list"><dt ka="item_pay_buy_competitive_chat">立即购买</dt><%for(var i=0;i<this.itemSellItemList.length;i++){%><dd <%if(i== 2){%>class="discount selected"<%}%> data-id="<%this.itemSellItemList[i].encryptBeanItemId%>"><%this.itemSellItemList[i].specDesc%><i class="line"></i><%this.itemSellItemList[i].beanAmount%>直豆</dd><%}%></dl>',t)}};return{analyzer:t,personality:function(t){var e=function(){Payment.success({article:"购买成功",text:"",confirmText:"立即使用",confirm:function(e){t&&t(e)}})},n={url:"/geek/item/pay.json",prePayUrl:"/geek/item/prepay.json",data:{itemId:"b015f75cd5e9aa4c1nR-"},itemId:"b015f75cd5e9aa4c1nR-",success:e},i={success:e,buy:function(t){}};Payment.purchase(n,i)}}}();