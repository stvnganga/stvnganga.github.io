"use strict";(self.webpackChunkinput_fields=self.webpackChunkinput_fields||[]).push([[409,221,679],{4197:function(e,n,t){t.r(n),t.d(n,{GET_PAYMENT_DATA:function(){return u},PAYMENT_STATUS:function(){return i},SEND_PAYMENT_DATA:function(){return r},START_PAYMENT:function(){return a},default:function(){return o}});var a="start-payment",u="GET_PAYMENT_DATA",r="SEND_PAYMENT_DATA",i="payment-status";function o(){return null}},5193:function(e,n,t){t.r(n),t.d(n,{default:function(){return i}});var a=t(7294),u=t(4197),r=t(6705);function i(){var e=(0,a.useState)(""),n=e[0],t=e[1];return(0,a.useEffect)((function(){if(window){var e=new BroadcastChannel("payment");e.onmessage=function(t){t.data&&t.data.messageType===u.GET_PAYMENT_DATA&&e.postMessage({messageType:u.SEND_PAYMENT_DATA,name:"expiry",value:n})}}}),[n]),a.createElement("input",{type:"text",placeholder:"Valid thru (mm/yy)",name:"expiry",value:n,onChange:function(e){var n=e.target.value;/^[0-2]{0,2}[-|\/]{0,1}[0-9]{0,2}$/.test(n)&&(t(n),(0,r.default)({from:"expiry",messageType:"validation",data:{valid:/^\d{2}[-|\/]\d{2}$/.test(n)}}))},onFocus:function(){(0,r.default)({from:"expiry",messageType:"event",data:{eventName:"onfocus",value:!0}})},onBlur:function(){(0,r.default)({from:"expiry",messageType:"event",data:{eventName:"onblur",value:!0}})}})}},6705:function(e,n,t){function a(e){return void 0===e&&(e={}),"undefined"!=typeof window&&window.parent.postMessage(e,new URLSearchParams(location.search).get("origin"))}t.r(n),t.d(n,{default:function(){return a}})}}]);
//# sourceMappingURL=component---src-pages-expiry-jsx-27718466237979cc04b9.js.map