var $div = document.getElementById('my-page');
var $head;
! function(t) {
    var e = {};

    function n(i) {
        if (e[i]) return e[i].exports;
        var s = e[i] = {
            i: i,
            l: !1,
            exports: {}
        };
        return t[i].call(s.exports, s, s.exports, n), s.l = !0, s.exports
    }
    n.m = t, n.c = e, n.d = function(t, e, i) {
        n.o(t, e) || Object.defineProperty(t, e, {
            enumerable: !0,
            get: i
        })
    }, n.r = function(t) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(t, "__esModule", {
            value: !0
        })
    }, n.t = function(t, e) {
        if (1 & e && (t = n(t)), 8 & e) return t;
        if (4 & e && "object" == typeof t && t && t.__esModule) return t;
        var i = Object.create(null);
        if (n.r(i), Object.defineProperty(i, "default", {
                enumerable: !0,
                value: t
            }), 2 & e && "string" != typeof t)
            for (var s in t) n.d(i, s, function(e) {
                return t[e]
            }.bind(null, s));
        return i
    }, n.n = function(t) {
        var e = t && t.__esModule ? function() {
            return t.default
        } : function() {
            return t
        };
        return n.d(e, "a", e), e
    }, n.o = function(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e)
    }, n.p = "", n(n.s = 0)
}([function(t, e, n) {
    "use strict";
    
    n.r(e);
    var i, s = {
        pin: 0,
        unpin: 0,
        tolerance: 5
    };
    class o {
        constructor(t, e = {}) {
            if (this.opts = {}, this.header = "string" == typeof t ? document.querySelector(t) : t, !t) return;
            const n = Object.keys(o.options);
            for (let t = 0; t < n.length; t++) this.opts[n[t]] = e[n[t]] || o.options[n[t]];
            this.initScroll()
        }
        initScroll() {
            if (!1 === this.opts.unpin) return;
            this.header.classList.add("mh-sticky");
            var t = 2 * this.header.offsetHeight;
            this.opts.unpin = Math.max(t, this.opts.unpin || 0), this.opts.pin = Math.max(t, this.opts.pin || 0), this.state = null;
            var e = 0;
            const n = (t = {}) => {
                var n = document.documentElement.scrollTop || document.body.scrollTop,
                    i = e - n,
                    s = i < 0 ? "down" : "up";
                i = Math.abs(i), e = n, this.state == o.UNPINNED ? "up" == s && (n < this.opts.pin || i > this.opts.tolerance) && this.pin() : this.state == o.PINNED ? "down" == s && n > this.opts.unpin && i > this.opts.tolerance && this.unpin() : this.pin()
            };
            window.addEventListener("scroll", n, {
                passive: !0
            }), n()
        }
        pin() {
            //appendHead();
            this.header.classList.add("mh-pinned"), this.header.classList.remove("mh-unpinned"), this.state = o.PINNED;
            
        }
        unpin() {
            //removeHead();
            this.header.classList.remove("mh-pinned"), this.header.classList.add("mh-unpinned"), this.state = o.UNPINNED;
            
        }
    }
    o.version = "2.1.0", o.options = s, o.PINNED = "pinned", o.UNPINNED = "unpinned",
        /*!
         * mhead.js
         * mmenu.frebsite.nl/mhead
         *
         * Copyright (c) Fred Heusschen
         * www.frebsite.nl
         *
         * License: CC-BY-4.0
         * http://creativecommons.org/licenses/by/4.0/
         */
        window && (window.Mhead = o, (i = window.jQuery || window.Zepto || null) && (i.fn.mhead = function(t) {
            return this.each((e, n) => {
                new o(n, t)
            })
        }))
}]);

function appendHead(){
    
    $div.appendChild('<div id ="headerSTICK" class="header Sticky"><div class="header-top"><a href="" class="home-link"><img class="logo" src="img/f-logo.png" alt="Netmatters logo"></a><div class="buttons"><div class="support"><i class="fas fa-phone"></i></div><button class="btn-banner support-xl"> <i class="fas fa-mouse"></i>SUPPORT </button> <button class="btn-banner contact-xl"> <i class="fas fa-paper-plane"></i>CONTACT </button><div class="searchbar searchbar-lg"><form action="/action_page.php"> <input type="text" placeholder="Search.." name="search"> <button type="submit" class="mobile-sbtn"><i class="fa fa-search"></i></button></form></div> <button id="my-open-button" class="hamburger hamburger--squeeze" type="button"> <span class="hamburger-box"> <span class="hamburger-inner"></span> </span> <span class="menutext">MENU</span> </button></div></div><div class="searchbar searchbar-mobile"><form action="/action_page.php"> <input type="text" placeholder="Search.." name="search"> <button type="submit" class="mobile-sbtn"><i class="fa fa-search"></i></button></form></div><div class="navbar"><div class="start-tab bar-child"></div><div class="tab-wrapper"><div class="bar-child tab web-tab"><div class="icon-tab"> <span> <i class="fas fa-code"></i> </span></div> <span class="tab-s-text">WEB</span> <span class="tab-lg-text">DESIGN</span><div class="dd-background"></div><div class="drop-down dd-web"><ul><li>STYLISH WEBSITES</li><li>-</li><li>ECOMMERCE STORES</li><li>-</li><li>BRANDING</li><li>-</li><li>APPS</li><li>-</li><li>WEB HOSTING</li><li>-</li><li>PAY MONTHLY WEBSITES</li></ul></div></div><div class="bar-child tab IT-tab"><div class="icon-tab"> <span> <i class="fas fa-desktop"></i> </span></div> <span class="tab-s-text">IT</span> <span class="tab-lg-text">SUPPORT</span><div class="dd-background"></div><div class="drop-down dd-IT"><ul><li>MANAGED IT</li><li>-</li><li>BUSINESS IT</li><li>-</li><li>OFFICE 365</li><li>-</li><li>CONSULTANCY</li><li>-</li><li>CLOUD PROVIDER</li><li>-</li><li>DATA BACKUP</li></ul></div></div><div class="bar-child tab telecoms-tab"><div class="icon-tab"> <span> <i class="fas fa-phone-alt"></i> </span></div> <span class="tab-s-text">TELECOMS</span> <span class="tab-lg-text">SERVICES</span><div class="dd-background"></div><div class="drop-down dd-telecoms"><ul><li>GIGABIT VOUCHER</li><li>-</li><li>HOSTED VOIP</li><li>-</li><li>BUSINESS VOIP</li><li>-</li><li>BUSINESS BROADBAND</li><li>-</li><li>LEASED LINE</li><li>-</li><li>3CX SYSTEMS</li></ul></div></div><div class="bar-child tab bespoke-tab"><div class="icon-tab"> <span> <i class="fas fa-th"></i> </span></div> <span class="tab-s-text">BESPOKE</span> <span class="tab-lg-text">SOFTWARE</span><div class="dd-background"></div><div class="drop-down dd-bespoke"><ul><li>WORKFLOW SOLUTIONS</li><li>-</li><li>AUTOMATION</li><li>-</li><li>SYSTEM INTEGRATION</li><li>-</li><li>DATABASE MANAGEMENT</li><li>-</li><li>SHAREPOINT</li><li>-</li><li>ERP</li></ul></div></div><div class="bar-child tab marketing-tab"><div class="icon-tab"> <span> <i class="fas fa-signal"></i> </span></div> <span class="tab-s-text">DIGITAL</span> <span class="tab-lg-text">MARKETING</span><div class="dd-background"></div><div class="drop-down dd-marketing"><ul><li>SEARCH (SEO)</li><li>-</li><li>PAID(PPC)</li><li>-</li><li>CONVERSION(CRO)</li><li>-</li><li>EMAIL</li><li>-</li><li>SOCIAL MEDIA</li><li>-</li><li>CONTENT</li></ul></div></div><div class="bar-child tab security-tab"><div class="icon-tab"> <span> <i class="fas fa-shield-alt"></i> </span></div> <span class="tab-s-text">CYBER</span> <span class="tab-lg-text">SECURITY</span><div class="dd-background"></div><div class="drop-down dd-security"><ul><li>ASSESSMENT</li><li>-</li><li>MANAGEMENT</li><li>-</li><li>PENETRATION TESTING</li><li>-</li><li>CYBER ESSENTIALS</li><li>-</li><li>PCI/DSS</li><li>-</li><li>HACKER PREVENTION</li></ul></div></div></div></div></div>');
}

function removeHead(){
    $head = document.getElementById("headerSTICK");
    $head.remove();
}