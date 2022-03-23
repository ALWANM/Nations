"use strict";(self.webpackChunkInternationsFrontend=self.webpackChunkInternationsFrontend||[]).push([[341],{9341:(K,f,n)=>{n.r(f),n.d(f,{UsersModule:()=>D});var l=n(9808),d=n(1083),p=n(1159),t=n(5e3),v=n(3071),x=n(1271),U=n(4594),c=n(7093),u=n(7423),h=n(8099),i=n(9224),Z=n(7322),m=n(6688);function C(o,r){if(1&o&&(t.TgZ(0,"mat-chip",17),t._uU(1),t.qZA()),2&o){const e=r.$implicit;t.xp6(1),t.hij(" ",e.groupName," ")}}function y(o,r){if(1&o){const e=t.EpF();t.TgZ(0,"div",9)(1,"mat-card",10)(2,"mat-card-header")(3,"mat-card-title"),t._uU(4),t.qZA()(),t._UZ(5,"img",11),t.TgZ(6,"mat-card-content")(7,"mat-label"),t._uU(8),t.qZA(),t._UZ(9,"br"),t.TgZ(10,"mat-label"),t._uU(11),t.qZA()(),t.TgZ(12,"mat-card-content")(13,"div",12)(14,"mat-chip-list",13,14),t.YNc(16,C,2,1,"mat-chip",15),t.qZA()()(),t.TgZ(17,"mat-card-actions")(18,"button",2),t.NdJ("click",function(){const g=t.CHM(e).$implicit;return t.oxw(2).goEditUser(g.userid)}),t.TgZ(19,"mat-icon",16),t._uU(20,"edit"),t.qZA(),t._uU(21,"EDIT "),t.qZA(),t.TgZ(22,"button",2),t.NdJ("click",function(){const g=t.CHM(e).$implicit;return t.oxw(2).deleteUser(g)}),t.TgZ(23,"mat-icon",16),t._uU(24,"delete"),t.qZA(),t._uU(25,"DELETE "),t.qZA()()()()}if(2&o){const e=r.$implicit;t.xp6(4),t.AsE("",e.firstName," ",e.lastName,""),t.xp6(4),t.AsE(" ",e.firstName," ",e.lastName," "),t.xp6(3),t.hij(" ",e.email," "),t.xp6(5),t.Q6J("ngForOf",e.groups)}}function A(o,r){if(1&o&&(t.ynx(0),t.TgZ(1,"div",7),t.YNc(2,y,26,6,"div",8),t.qZA(),t.BQk()),2&o){const e=r.ngIf;t.xp6(2),t.Q6J("ngForOf",e)}}function T(o,r){1&o&&(t.TgZ(0,"div",18)(1,"h3"),t._uU(2,"findind users ...."),t.qZA()())}const F=[{path:"",component:(()=>{class o{constructor(e,s,a){this.userService=e,this.router=s,this.snackBar=a,this.visible=!0,this.selectable=!0,this.removable=!1,this.addOnBlur=!0,this.separatorKeysCodes=[p.K5,p.OC]}ngOnInit(){this.users$=this.userService.getUsers()}deleteUser(e){console.log("delettion user "+e.userid),this.userService.deleteUserByKey(e.userid).subscribe({next:s=>{this.users$=this.userService.getUsers(),this.showSnackbarDuration("User"+e.firstName+" "+e.lastName+" deleted ","Done","5000"),console.log("Delete user ",s)},error:s=>console.error("error occur during deletion user "+s),complete:()=>console.info("delete user complete")})}goEditUser(e){return this.router.navigate(["/addEditUser"],{queryParams:{userid:e}})}goAddUser(){return this.router.navigate(["/addEditUser"],{queryParams:{selected:"new"}})}showSnackbarDuration(e,s,a){this.snackBar.open(e,s,a)}}return o.\u0275fac=function(e){return new(e||o)(t.Y36(v.K),t.Y36(d.F0),t.Y36(x.ux))},o.\u0275cmp=t.Xpm({type:o,selectors:[["app-users"]],decls:11,vars:4,consts:[["color","accent","fxLayout","row","fxLayoutAlign","space-between center",1,"content"],["fxLayout","row","fxLayoutAlign","start center"],["mat-button","","color","primary",3,"click"],["color","primary"],["fxLayoutGap","16px grid",1,"content"],[4,"ngIf","ngIfElse"],["loading",""],["fxLayout","row wrap","fxLayout.lt-lg"," row wrap","fxLayoutGap","16px grid"],["fxFlex","25%","fxFlex.xs","100%","fxFlex.sm","33%",4,"ngFor","ngForOf"],["fxFlex","25%","fxFlex.xs","100%","fxFlex.sm","33%"],[1,"mat-elevation-z4"],["mat-card-image","","src","../../assets/img/pngwing.png"],[1,"scrollable"],["FormArrayName","Groups"],["chipList",""],["removable","false",4,"ngFor","ngForOf"],["color","accent"],["removable","false"],[1,"loaing-container"]],template:function(e,s){if(1&e&&(t.TgZ(0,"mat-toolbar",0),t._UZ(1,"div",1),t.TgZ(2,"button",2),t.NdJ("click",function(){return s.goAddUser()}),t.TgZ(3,"mat-icon",3),t._uU(4,"add"),t.qZA(),t._uU(5," Add "),t.qZA()(),t.TgZ(6,"div",4),t.YNc(7,A,3,1,"ng-container",5),t.ALo(8,"async"),t.qZA(),t.YNc(9,T,3,0,"ng-template",null,6,t.W1O)),2&e){const a=t.MAs(10);t.xp6(7),t.Q6J("ngIf",t.lcZ(8,2,s.users$))("ngIfElse",a)}},directives:[U.Ye,c.xw,c.Wh,u.lW,h.Hw,c.SQ,l.O5,l.sg,c.yH,i.a8,i.dk,i.n5,i.G2,i.dn,Z.hX,m.qn,m.HS,i.hq],pipes:[l.Ov],styles:[".mat-card[_ngcontent-%COMP%]{background:#fafafa;color:#1f70a1}.mat-table[_ngcontent-%COMP%]{background:#e5e6ec;color:#000}.mat-cell[_ngcontent-%COMP%], .mat-footer-cell[_ngcontent-%COMP%]{color:#070707}.mat-header-cell[_ngcontent-%COMP%]{color:#0c0c0cb3}ul[_ngcontent-%COMP%]{margin:0;padding:0}.scrollable[_ngcontent-%COMP%]{width:auto;height:100px;overflow-y:auto;overflow-x:hidden;white-space:nowrap}"]}),o})()}];let M=(()=>{class o{}return o.\u0275fac=function(e){return new(e||o)},o.\u0275mod=t.oAB({type:o}),o.\u0275inj=t.cJS({imports:[[d.Bz.forChild(F)],d.Bz]}),o})();var O=n(508),N=n(7446),E=n(7238),P=n(7531),L=n(4999),S=n(6087),b=n(2638),B=n(2368),I=n(5899),J=n(8029),Y=n(9764),$=n(4449);let D=(()=>{class o{}return o.\u0275fac=function(e){return new(e||o)},o.\u0275mod=t.oAB({type:o}),o.\u0275inj=t.cJS({providers:[v.K],imports:[[l.ez,M,u.ot,O.us,i.QW,U.g0,u.ot,N.p9,E.AV,P.c,L.p0,S.TU,h.Ps,b.SJ,B.rP,m.Hi,I.Cv,x.ZX,J.KP,Y.o9,$.ie]]}),o})()}}]);