(function(t){function e(e){for(var o,r,i=e[0],c=e[1],u=e[2],l=0,p=[];l<i.length;l++)r=i[l],Object.prototype.hasOwnProperty.call(s,r)&&s[r]&&p.push(s[r][0]),s[r]=0;for(o in c)Object.prototype.hasOwnProperty.call(c,o)&&(t[o]=c[o]);d&&d(e);while(p.length)p.shift()();return a.push.apply(a,u||[]),n()}function n(){for(var t,e=0;e<a.length;e++){for(var n=a[e],o=!0,i=1;i<n.length;i++){var c=n[i];0!==s[c]&&(o=!1)}o&&(a.splice(e--,1),t=r(r.s=n[0]))}return t}var o={},s={app:0},a=[];function r(e){if(o[e])return o[e].exports;var n=o[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,r),n.l=!0,n.exports}r.m=t,r.c=o,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)r.d(n,o,function(e){return t[e]}.bind(null,o));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="/";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],c=i.push.bind(i);i.push=e,i=i.slice();for(var u=0;u<i.length;u++)e(i[u]);var d=c;a.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"034f":function(t,e,n){"use strict";n("85ec")},"0a2a":function(t,e,n){},"151f":function(t,e,n){"use strict";n("d082")},"164d":function(t,e,n){"use strict";n("0a2a")},"1d61":function(t,e,n){},2635:function(t,e,n){"use strict";n("ca2a")},"3b2c":function(t,e,n){},"47f1":function(t,e,n){"use strict";n("7d3c")},"56d7":function(t,e,n){"use strict";n.r(e);n("e260"),n("e6cf"),n("cca6"),n("a79d");var o=n("2b0e"),s=n("5f5b"),a=n("b1e0"),r=(n("f9e3"),n("2dd8"),n("0a63")),i=n.n(r),c=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("b-modal",{ref:"disconnect",staticClass:"disconnect",attrs:{title:"Error","hide-footer":!0,"hide-header-close":!0,centered:""},on:{hide:t.onDisconnectClick}},[n("div",[t._v("You have disconnected")])]),t.isLoggedIn?n("Navbar"):t._e(),null===t.isLoggedIn||t.loading?t._e():n("div",{staticClass:"content",style:t.bgColor},[!1===t.isLoggedIn?n("Login"):t.room?"waiting"===t.room.phase?n("WaitingRoom"):"finished"!==t.room.phase?n("Game"):t._e():n("RoomList")],1)],1)},u=[],d=n("1da1"),l=n("5530"),p=(n("96cf"),n("2f62")),m=(n("d3b7"),Object({NODE_ENV:"production",BASE_URL:"/"}).VUE_APP_BACKEND_URL||window.location.origin),f=function(){var t=Object(d["a"])(regeneratorRuntime.mark((function t(e,n){var o;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,fetch(m+e,Object(l["a"])({headers:{"Content-Type":"application/json"}},n));case 2:return o=t.sent,t.abrupt("return",o.json());case 4:case"end":return t.stop()}}),t)})));return function(e,n){return t.apply(this,arguments)}}(),b=f,h=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"nav-container"},[n("span",{staticClass:"brand",on:{click:t.onBrandClick}},[n("strong",[t._v("AAH")])]),n("div",{staticClass:"right"},[n("span",{staticClass:"logout",on:{click:t.onLogoutClick}},[t._v("Logout")])])])},g=[],v={computed:Object(l["a"])({},Object(p["d"])(["websocket","room"])),methods:Object(l["a"])(Object(l["a"])({},Object(p["b"])(["logout","connectWebsocket"])),{},{onBrandClick:function(){this.room&&this.websocket.send(JSON.stringify({type:"leaveRoom",roomId:this.room.id}))},onLogoutClick:function(){localStorage.removeItem("token"),this.websocket.close(),this.logout()}})},y=v,k=(n("76c2"),n("2877")),C=Object(k["a"])(y,h,g,!1,null,"a47ce762",null),w=C.exports,x=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("b-container",{staticClass:"login-container"},[n("div",[n("h1",[t._v("Algorithms Against Humanity")]),n("TextInput",{attrs:{onSubmit:t.onSubmit,text:t.username,validate:t.validate,placeholder:"Enter a username...",minLength:3},on:{"update:text":function(e){t.username=e}}})],1)])},_=[],O=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("form",{staticClass:"text-input-container",on:{submit:function(e){return e.preventDefault(),t.onSubmit(e)}}},[n("b-input-group",[this.$slots.prepend?n("b-input-group-prepend",[t._t("prepend")],2):t._e(),n("b-form-input",{attrs:{type:"text",placeholder:t.placeholder,value:t.text},on:{keyup:function(e){return t.$emit("update:text",e.target.value)}}}),t.btnVisible?n("b-input-group-append",[n("b-button",{attrs:{type:"submit",variant:t.btnColor,disabled:!t.validate()}},[n("b-icon-check")],1)],1):t._e()],1)],1)},j=[],S={name:"TextInput",props:{onSubmit:Function,text:String,placeholder:String,validate:{type:Function,default:function(){return this.text.length>0}},btnColor:{type:String,default:"dark"},btnVisible:{type:Boolean,default:!0}}},R=S,I=(n("151f"),Object(k["a"])(R,O,j,!1,null,"2e60bf47",null)),P=I.exports,E={name:"Login",components:{TextInput:P},data:function(){return{username:""}},methods:Object(l["a"])(Object(l["a"])({},Object(p["b"])(["updateUser","updateLoginStatus","connectWebsocket"])),{},{validate:function(){return this.username.length>=3},onSubmit:function(){var t=Object(d["a"])(regeneratorRuntime.mark((function t(){var e,n=this;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,b("/api/login",{method:"POST",body:JSON.stringify({username:this.username})});case 2:e=t.sent,localStorage.setItem("token",e.token),this.connectWebsocket({token:localStorage.getItem("token"),callback:function(){n.updateUser(e.user),n.updateLoginStatus(!0)}});case 5:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}()})},L=E,N=(n("164d"),Object(k["a"])(L,x,_,!1,null,"53fed224",null)),$=N.exports,T=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"room-list-container"},[n("div",{staticClass:"headers"},[n("span",[n("b-icon-shield-lock-fill")],1),n("span",[t._v("Room Name")]),n("span",[n("b-icon-person-fill")],1)]),n("div",{staticClass:"room-list"},t._l(t.rooms,(function(t,e){return n("RoomItem",{key:e,attrs:{room:t,index:e}})})),1),n("div",{staticClass:"room-create"},[n("TextInput",{staticClass:"name-input",attrs:{text:t.newRoom.name,onSubmit:t.onRoomCreate,validate:t.validateCreate,placeholder:"Create a room..."},on:{"update:text":function(e){return t.$set(t.newRoom,"name",e)}},scopedSlots:t._u([{key:"prepend",fn:function(){return[n("div",{staticClass:"access-container",on:{click:t.onAccessClick}},["private"===t.newRoom.access?n("b-icon-lock-fill"):n("b-icon-unlock-fill")],1)]},proxy:!0}])}),"private"===t.newRoom.access?n("div",{staticClass:"password-container"},[n("TextInput",{staticClass:"password-input",attrs:{text:t.newRoom.password,placeholder:"Enter a password...",btnVisible:!1},on:{"update:text":function(e){return t.$set(t.newRoom,"password",e)}},scopedSlots:t._u([{key:"prepend",fn:function(){return[n("b-icon-arrow-return-right")]},proxy:!0}],null,!1,2964142090)})],1):t._e()],1)])},J=[],W=(n("b0c0"),function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"room-item-container",on:{click:function(e){return t.disableError()}}},[n("div",{directives:[{name:"b-toggle",rawName:"v-b-toggle",value:"collapse-"+t.index,expression:"`collapse-${index}`"}],staticClass:"top",on:{click:t.onRoomClick}},[n("span",{staticClass:"access"},["private"===t.room.access?n("b-icon-lock-fill"):n("b-icon-unlock-fill")],1),n("span",{staticClass:"name"},[t._v(t._s(t.room.name))]),n("span",{staticClass:"population"},[t._v(t._s(t.population)+"/4")])]),"private"===t.room.access?n("b-collapse",{staticClass:"bottom",attrs:{id:"collapse-"+t.index}},[n("TextInput",{class:{red:"deniedRoom"===t.error},attrs:{onSubmit:t.joinPrivate,text:t.password,placeholder:"Password"},on:{"update:text":function(e){t.password=e}},scopedSlots:t._u([{key:"prepend",fn:function(){return[n("b-icon-arrow-return-right")]},proxy:!0}],null,!1,2964142090)})],1):t._e()],1)}),B=[],A=(n("a9e3"),n("b64b"),{name:"RoomItem",components:{TextInput:P},props:{room:Object,index:Number},data:function(){return{password:""}},computed:Object(l["a"])(Object(l["a"])({},Object(p["d"])(["websocket","error"])),{},{population:function(){return Object.keys(this.room.players).length}}),methods:Object(l["a"])(Object(l["a"])({},Object(p["b"])(["updateError"])),{},{onRoomClick:function(){"public"===this.room.access&&this.websocket.send(JSON.stringify({type:"joinRoom",roomId:this.room.id}))},joinPrivate:function(){this.websocket.send(JSON.stringify({type:"joinRoom",roomId:this.room.id,password:this.password}))},disableError:function(){"deniedRoom"===this.error&&this.updateError("")}})}),U=A,D=(n("2635"),Object(k["a"])(U,W,B,!1,null,"2d78ad39",null)),G=D.exports,M={data:function(){return{newRoom:{name:"",access:"public",password:""}}},components:{RoomItem:G,TextInput:P},computed:Object(l["a"])({},Object(p["d"])(["user","websocket","rooms"])),methods:Object(l["a"])(Object(l["a"])({},Object(p["b"])(["updateRooms"])),{},{onAccessClick:function(){"public"===this.newRoom.access?this.newRoom.access="private":this.newRoom.access="public"},validateCreate:function(){return!(this.newRoom.name.length<1)&&!("private"===this.newRoom.access&&this.newRoom.password.length<1)},onRoomCreate:function(){this.websocket.send(JSON.stringify({type:"createRoom",name:this.newRoom.name,access:this.newRoom.access,password:this.newRoom.password}))}}),mounted:function(){var t=this;return Object(d["a"])(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,b("/api/rooms");case 2:n=e.sent,t.updateRooms(n);case 4:case"end":return e.stop()}}),e)})))()}},F=M,V=(n("8679"),Object(k["a"])(F,T,J,!1,null,"d89e2a26",null)),H=V.exports,z=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"waiting-room-container"},[n("div",{staticClass:"players"},[n("div",{staticClass:"header"},[t._v("Players")]),t._l(this.players,(function(e){return n("div",{key:e.id,staticClass:"username"},[t._v(" "+t._s(e.username)+" "),e.isBot?n("span",{staticClass:"delete",on:{click:function(n){return t.deleteBot(e.id)}}},[t._v("×")]):t._e()])})),this.players.length<4?n("div",[n("b-button",{staticClass:"add",on:{click:t.addBot}},[t._v("Add Bot +")])],1):t._e()],2),n("div",{staticClass:"settings"},[n("div",{staticClass:"header"},[t._v("Settings")]),n("b-form-group",{attrs:{label:"Points to Win","label-for":"points","label-cols":"4"}},[n("b-form-input",{attrs:{type:"number",value:t.room.settings.points,id:"points",debounce:"500"},on:{update:function(e){return t.updateSettings("points",e)}}})],1),n("b-form-group",{attrs:{label:"Write-in Chance","label-for":"writeIn","label-cols":"4"}},[n("b-form-input",{attrs:{type:"number",step:"0.01",value:t.room.settings.writeIn,id:"write-in",debounce:"500"},on:{update:function(e){return t.updateSettings("writeIn",e)}}})],1)],1),n("b-button",{attrs:{variant:"dark",disabled:this.players.length<3},on:{click:t.startGame}},[t._v(" Start Game ")])],1)},K=[],Y={data:function(){return{bots:[]}},computed:Object(l["a"])({},Object(p["d"])(["websocket","room","players"])),methods:{addBot:function(){this.websocket.send(JSON.stringify({type:"addBot",roomId:this.room.id,name:"Bot"}))},deleteBot:function(t){this.websocket.send(JSON.stringify({type:"deleteBot",roomId:this.room.id,botId:t}))},updateSettings:function(t,e){var n;"points"===t&&parseFloat(e)>0&&(n=parseFloat(e)),"writeIn"===t&&parseFloat(e)>0&&parseFloat(e)<1&&(n=parseFloat(e)),n&&this.websocket.send(JSON.stringify({type:"updateSettings",roomId:this.room.id,key:t,value:n}))},startGame:function(){this.websocket.send(JSON.stringify({type:"startRound",roomId:this.room.id,settings:this.settings}))}}},q=Y,Q=(n("cb01"),Object(k["a"])(q,z,K,!1,null,"28e9089b",null)),X=Q.exports,Z=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("b-container",{staticClass:"game-container"},[n("div",{staticClass:"top-row"},[n("Scoreboard"),n("Chat")],1),n("SharedCards"),t.userPlayer.isCzar?n("div",{staticClass:"czar-message"},[n("span",[t._v(" You are the Card Czar "),n("b-icon-gem")],1)]):n("Hand"),t.finished?n("b-button",{staticClass:"next-button",attrs:{variant:"dark"},on:{click:t.endGame}},[t._v(" Replay ")]):"results"===t.room.phase?n("b-button",{staticClass:"next-button",attrs:{variant:"dark"},on:{click:t.startRound}},[t._v(" Next Round ")]):t._e()],1)},tt=[],et=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"hand-container"},[n("Carousel",{staticClass:"hand",attrs:{paginationEnabled:!1,navigationEnabled:!0,mouseDrag:!1,touchDrag:!1,perPageCustom:[[1200,4],[991,3],[580,2],[0,1]],speed:250}},t._l(t.userPlayer.hand,(function(e,o){return n("slide",{key:o},[n("div",{staticClass:"light card",class:{outlined:t.selected&&t.selected.index===o},on:{click:function(n){return t.pickCard(e,o)}}},[e.custom?n("b-icon-pencil-fill",{staticClass:"pencil"}):t._e(),t._v(" "+t._s(e.text)+" ")],1)])})),1),this.room.submitted.some((function(e){return e.id===t.userPlayer.id}))?t._e():n("b-button",{staticClass:"submit-button",attrs:{variant:"dark",disabled:!t.selected},on:{click:t.submitCard}},[t._v(" Select ")]),n("b-modal",{ref:"write",attrs:{id:"write",title:"Write-In","hide-footer":!0,centered:""}},[n("TextInput",{attrs:{onSubmit:t.writeCustom,text:t.customText,placeholder:"Write your card here..."},on:{"update:text":function(e){t.customText=e}}})],1)],1)},nt=[],ot={components:{Carousel:r["Carousel"],Slide:r["Slide"],TextInput:P},data:function(){return{selected:null,customText:""}},computed:Object(l["a"])(Object(l["a"])({},Object(p["d"])(["websocket","user","room","players"])),Object(p["c"])(["userPlayer"])),methods:Object(l["a"])(Object(l["a"])({},Object(p["b"])(["updateHand"])),{},{pickCard:function(t,e){"playing"===this.room.phase&&(this.selected&&this.selected.index===e?this.selected=null:t.custom?(this.selected={text:this.userPlayer.hand[e].text,index:e},this.userPlayer.hand[e].text.length>0?this.customText=this.userPlayer.hand[e].text:this.customText="",this.$refs.write.show()):this.selected={text:t.text,custom:!1,index:e})},submitCard:function(){this.selected.text.length>0&&(this.websocket.send(JSON.stringify({type:"submitCard",roomId:this.room.id,card:this.selected})),this.selected=null)},writeCustom:function(){this.selected={text:this.customText,index:this.selected.index},this.websocket.send(JSON.stringify({type:"writeCard",text:this.customText,index:this.selected.index})),this.$refs.write.hide()}})},st=ot,at=(n("8b47"),Object(k["a"])(st,et,nt,!1,null,"05064e69",null)),rt=at.exports,it=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("Carousel",{staticClass:"shared-cards",attrs:{paginationEnabled:!1,navigationEnabled:!0,centerMode:!0,mouseDrag:!1,touchDrag:!1,perPageCustom:[[1200,4],[991,3],[580,2],[0,1]],speed:250}},[n("slide",[n("div",{staticClass:"dark card"},[t._v(t._s(t.room.prompt))])]),t._l(this.room.submitted,(function(e,o){return n("slide",{key:o},["results"===t.room.phase?n("div",[n("div",{staticClass:"results card",style:t.getResultColor(e)},[t._v(" "+t._s(e.text)+" ")]),n("div",{staticClass:"username"},[t._v(" "+t._s(t.players.find((function(t){return t.id===e.id})).username)+"'s Card ")])]):"picking"===t.room.phase?n("div",{staticClass:"gray picking card",on:{click:function(n){return t.pickCard(e.id)}}},[t._v(" "+t._s(e.text)+" ")]):n("div",{staticClass:"gray card"},[t._v(" "+t._s(e.id===t.user.id?e.text:"")+" ")])])}))],2)},ct=[],ut={components:{Carousel:r["Carousel"],Slide:r["Slide"]},computed:Object(l["a"])(Object(l["a"])({},Object(p["d"])(["websocket","user","room","players"])),Object(p["c"])(["userPlayer","winner"])),methods:{pickCard:function(t){this.userPlayer.isCzar&&this.websocket.send(JSON.stringify({type:"pickCard",roomId:this.room.id,winnerId:t}))},getResultColor:function(t){return this.winner&&this.winner.id===t.id?{backgroundColor:"#bbedbd"}:{border:"1px solid #222222"}}}},dt=ut,lt=(n("7ae9"),Object(k["a"])(dt,it,ct,!1,null,"0320724e",null)),pt=lt.exports,mt=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("span",[n("b-button",{directives:[{name:"b-modal",rawName:"v-b-modal.scoreboard",modifiers:{scoreboard:!0}}],staticClass:"toggle",attrs:{variant:"dark"}},[t._v(" Scoreboard ")]),n("b-modal",{ref:"scoreboard",attrs:{id:"scoreboard",title:t.titleMessage,"hide-footer":!0,centered:""}},t._l(t.players,(function(e,o){return n("div",{key:o,staticClass:"row"},[n("span",{staticClass:"username"},[t._v(t._s(e.username))]),n("span",{staticClass:"score"},[t._v(t._s(e.score))])])})),0)],1)},ft=[],bt={computed:Object(l["a"])(Object(l["a"])({},Object(p["d"])(["room","players"])),{},{titleMessage:function(){var t=this.room.settings.points;return t>1e4&&(t=t.toExponential()),"Scoreboard (Goal: ".concat(t,")")}}),watch:{"$store.getters.finished":function(){this.$refs.scoreboard.show()}}},ht=bt,gt=(n("8f59"),Object(k["a"])(ht,mt,ft,!1,null,"89684fb8",null)),vt=gt.exports,yt=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("span",[n("b-button",{staticClass:"toggle",attrs:{variant:"dark"},on:{click:t.toggleModal}},[t.notification?n("span",{staticClass:"circle-container"},[n("b-icon-circle-fill")],1):t._e(),n("b-icon-chat-left-text-fill")],1),n("b-modal",{ref:"chat",attrs:{id:"chat",title:"Chat","hide-footer":!0,centered:""}},[n("div",{staticClass:"chatbox"},t._l(t.chat,(function(e,o){return n("div",{key:o,staticClass:"message",class:{green:!e.username}},[e.username?n("span",{staticClass:"username"},[t._v(t._s(e.username)+": ")]):t._e(),n("span",{staticClass:"text"},[t._v(t._s(e.text))])])})),0),n("TextInput",{attrs:{onSubmit:t.onSubmit,text:t.message,placeholder:"Type your message here..."},on:{"update:text":function(e){t.message=e}}})],1)],1)},kt=[],Ct={components:{TextInput:P},data:function(){return{message:"",notification:!1}},computed:Object(l["a"])({},Object(p["d"])(["websocket","user","chat"])),methods:{onSubmit:function(){this.websocket.send(JSON.stringify({type:"addChat",text:this.message,username:this.user.username})),this.message=""},toggleModal:function(){this.$refs.chat.show(),this.notification=!1}},watch:{"$store.state.chat":function(){this.$refs.chat.isShow||(this.notification=!0)}}},wt=Ct,xt=(n("da77"),Object(k["a"])(wt,yt,kt,!1,null,"1000cef9",null)),_t=xt.exports,Ot={components:{Hand:rt,SharedCards:pt,Scoreboard:vt,Chat:_t},data:function(){return{prompt:"Default Prompt"}},computed:Object(l["a"])(Object(l["a"])({},Object(p["d"])(["websocket","user","room","hand","players"])),Object(p["c"])(["userPlayer","finished"])),methods:{startRound:function(){this.websocket.send(JSON.stringify({type:"startRound",roomId:this.room.id}))},endGame:function(){this.websocket.send(JSON.stringify({type:"endGame",roomId:this.room.id}))}}},jt=Ot,St=(n("47f1"),Object(k["a"])(jt,Z,tt,!1,null,"3048f3c2",null)),Rt=St.exports,It={name:"App",components:{Navbar:w,Login:$,RoomList:H,WaitingRoom:X,Game:Rt},computed:Object(l["a"])(Object(l["a"])({},Object(p["d"])(["user","isLoggedIn","room","loading","error"])),{},{bgColor:function(){return!1!==this.isLoggedIn&&this.room?{backgroundColor:"#ffffff"}:{backgroundColor:"#222222"}}}),methods:Object(l["a"])(Object(l["a"])({},Object(p["b"])(["updateUser","updateLoginStatus","updateLoading","connectWebsocket"])),{},{onDisconnectClick:function(t){t.preventDefault()}}),watch:{"$store.state.error":function(){"disconnect"===this.error&&this.$refs.disconnect.show()}},created:function(){var t=this;return Object(d["a"])(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,b("/api/authenticate",{method:"POST",body:JSON.stringify({token:localStorage.getItem("token")})});case 2:n=e.sent,n.verified?t.connectWebsocket({token:localStorage.getItem("token"),callback:function(){t.updateUser({username:n.username,id:n.id}),t.updateLoginStatus(!0)},error:function(){t.updateLoginStatus(!1),t.updateLoading(!1)}}):(t.updateLoginStatus(!1),t.updateLoading(!1));case 4:case"end":return e.stop()}}),e)})))()}},Pt=It,Et=(n("034f"),Object(k["a"])(Pt,c,u,!1,null,null,null)),Lt=Et.exports,Nt={user:null,isLoggedIn:null,websocket:null,loading:!0,error:null,rooms:[],room:null,players:[],chat:[]},$t=(n("a434"),{updateUser:function(t,e){t.user=e},updateLoginStatus:function(t,e){t.isLoggedIn=e},updateWebsocket:function(t,e){t.websocket=e},updateLoading:function(t,e){t.loading=e},updateError:function(t,e){t.error=e},updateRooms:function(t,e){t.rooms=e},updateRoom:function(t,e){t.room=e},updatePhase:function(t,e){t.room.phase=e},updatePlayers:function(t,e){t.players=e},updateChat:function(t,e){t.chat=e},addChat:function(t,e){t.chat.push(e),t.chat.length>10&&t.chat.splice(0,1)}}),Tt=n("2909"),Jt=n("15fd"),Wt=(n("ac1f"),n("5319"),n("99af"),n("4de4"),{updateUser:function(t,e){t.commit("updateUser",e)},updateLoginStatus:function(t,e){t.commit("updateLoginStatus",e)},updateRooms:function(t,e){t.commit("updateRooms",e)},updateLoading:function(t,e){t.commit("updateLoading",e)},updateError:function(t,e){console.log(e),t.commit("updateError",e)},logout:function(t){t.commit("updateRoom",null),t.commit("updatePlayers",null),t.commit("updateUser",null),t.commit("updateWebsocket",null),t.commit("updateLoginStatus",!1),t.commit("updateChat",[])},connectWebsocket:function(t,e){var n=e.token,o=e.callback,s=e.error;if(n){var a=Object({NODE_ENV:"production",BASE_URL:"/"}).VUE_APP_BACKEND_URL||window.location.origin,r=new WebSocket(a.replace(/^http/,"ws")+"?token=".concat(n));r.onerror=function(){t.commit("updateWebsocket",null),s&&s()},r.onopen=function(){t.commit("updateWebsocket",r),o&&o()},r.onmessage=function(e){var n=JSON.parse(e.data);switch(n.type){case"connect":if(n.reconnecting){var o=n.room,s=o.players,a=Object(Jt["a"])(o,["players"]);t.commit("updateRoom",a),t.commit("updatePlayers",s)}t.commit("updateLoading",!1);break;case"joinRoom":var r=n.room,i=r.players,c=Object(Jt["a"])(r,["players"]);t.state.room||t.commit("updateRoom",c),t.commit("updatePlayers",i);break;case"deniedRoom":t.commit("updateError","deniedRoom");break;case"updateRooms":n.adding?t.commit("updateRooms",[].concat(Object(Tt["a"])(t.state.rooms),[n.room])):t.commit("updateRooms",t.state.rooms.filter((function(t){return t.id!==n.room.id})));break;case"updateRoom":var u=n.room,d=u.players,l=Object(Jt["a"])(u,["players"]);t.commit("updateRoom",l),t.commit("updatePlayers",d);break;case"updatePlayers":t.commit("updatePlayers",n.players);break;case"updatePhase":t.commit("updatePhase",n.phase);break;case"addChat":var p={text:n.text,username:n.username};t.commit("addChat",p);break;case"leaveRoom":n.id===t.state.user.id?(t.commit("updateRoom",null),t.commit("updatePlayers",[]),t.commit("updateChat",[])):(t.commit("updatePlayers",n.players),t.commit("addChat",{text:n.message}));break}},r.onclose=function(){t.state.user&&t.commit("updateError","disconnect")}}}}),Bt=(n("7db0"),{userPlayer:function(t){return t.user?t.players.find((function(e){return e.id===t.user.id})):null},winner:function(t){return t.players.find((function(t){return!0===t.isWinner}))},finished:function(t){return t.players.some((function(e){return e.score>=t.room.settings.points}))}});o["default"].use(p["a"]);var At=new p["a"].Store({state:Nt,actions:Wt,mutations:$t,getters:Bt});o["default"].config.productionTip=!1,o["default"].use(s["a"]),o["default"].use(a["a"]),o["default"].use(i.a),new o["default"]({store:At,render:function(t){return t(Lt)}}).$mount("#app")},"67d5":function(t,e,n){},"72ad":function(t,e,n){},"76c2":function(t,e,n){"use strict";n("a46c")},"7ae9":function(t,e,n){"use strict";n("72ad")},"7d3c":function(t,e,n){},"804a":function(t,e,n){},"85ec":function(t,e,n){},8679:function(t,e,n){"use strict";n("3b2c")},"8b47":function(t,e,n){"use strict";n("1d61")},"8f59":function(t,e,n){"use strict";n("c975")},a46c:function(t,e,n){},c975:function(t,e,n){},ca2a:function(t,e,n){},cb01:function(t,e,n){"use strict";n("67d5")},d082:function(t,e,n){},da77:function(t,e,n){"use strict";n("804a")}});
//# sourceMappingURL=app.7473d9df.js.map