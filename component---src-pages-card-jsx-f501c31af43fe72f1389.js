"use strict";(self.webpackChunkinput_fields=self.webpackChunkinput_fields||[]).push([[716,221,679],{4197:function(e,t,n){n.r(t),n.d(t,{GET_PAYMENT_DATA:function(){return s},PAYMENT_STATUS:function(){return o},SEND_PAYMENT_DATA:function(){return u},START_PAYMENT:function(){return a},default:function(){return r}});var a="start-payment",s="GET_PAYMENT_DATA",u="SEND_PAYMENT_DATA",o="payment-status";function r(){return null}},2385:function(e,t,n){n.r(t),n.d(t,{default:function(){return r}});var a=n(7294),s=n(6705),u=n(4197),o="undefined"!=typeof window?new BroadcastChannel("payment"):null;function r(){var e=(0,a.useState)(""),t=e[0],n=e[1],r=(0,a.useState)({card:t}),f=r[0],d=r[1],i=(0,a.useState)(null),c=i[0],l=i[1],m=function(e,t){return d((function(n){var a;return Object.assign({},n,((a={})[e]=t,a))}))};return(0,a.useEffect)((function(){window&&(window.onmessage=function(e){e.data.messageType===u.START_PAYMENT&&(l(e.data.data),o.postMessage({messageType:u.GET_PAYMENT_DATA}))},o.onmessage=function(e){e.data.messageType===u.SEND_PAYMENT_DATA&&m(e.data.name,e.data.value)})}),[]),(0,a.useEffect)((function(){f.cvv&&f.expiry&&f.card&&(console.log("Iframe => Making charge request",Object.assign({},f,c)),setTimeout((function(){"1111"===f.cvv?(0,s.default)({from:"hosted-frames",messageType:"payment-status",data:{message:"Payment failed",statusCode:400}}):((0,s.default)({from:"hosted-frames",messageType:"payment-status",data:{message:"Payment done",statusCode:200}}),o.postMessage({messageType:"RESET"}),n(""))}),2e3))}),[f]),a.createElement("input",{type:"text",name:"card",placeholder:"13 to 19 digits",value:t,onChange:function(e){var t=e.target.value;/^[0-9]{0,19}$/.test(t)&&(n(t),m("card",t),(0,s.default)({from:"card",messageType:"validation",data:{valid:/^[0-9]{13,19}$/.test(t)}}))},onFocus:function(){(0,s.default)({from:"card",messageType:"event",data:{eventName:"onfocus",value:!0}})},onBlur:function(){(0,s.default)({from:"card",messageType:"event",data:{eventName:"onblur",value:!0}})}})}},6705:function(e,t,n){function a(e){return void 0===e&&(e={}),"undefined"!=typeof window&&window.parent.postMessage(e,new URLSearchParams(location.search).get("origin"))}n.r(t),n.d(t,{default:function(){return a}})}}]);
//# sourceMappingURL=component---src-pages-card-jsx-f501c31af43fe72f1389.js.map