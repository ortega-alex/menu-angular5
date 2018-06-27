import { Component } from '@angular/core';
import { EntityService } from './services/entity.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [EntityService]
})
export class AppComponent {
  private viewMain: boolean = false;
  private errorLogin: boolean = false;
  private user: any;
  private messangeError: string;
  private registrando : boolean = false;

  constructor(private _entityService: EntityService) {
    this.user = new Object();
    this.checkCookie();
  }

  public login(arg: any) {
    this.user.email = arg.email;
    this.user.password = arg.password;
    this._entityService.login(this.user).then((res) => {
      if (res.success == true) {
        this.errorLogin = false;
        this.setCookie("email", arg.email, 2);
        window.location.href = "/";
      } else {
        this.errorLogin = true;
        this.messangeError = res.msj;
        this.setCookie("email", "", 0);
      }
    }).catch((res) => {
      this.errorLogin = true;
      this.messangeError = res.msj;
      this.setCookie("email", "", 0);
    });
  }

  public logout() {
    this.setCookie("email", "", 0); window.location.href = "/";
  }

  public setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

  public getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  public checkCookie() {
    var user = this.getCookie("email");
    if (user != "") {
      console.log("esta logueado");
      this.viewMain = true;
    } else {
      console.log("no esta logueado");
      this.viewMain = false;
    }
  }

  public registro(){
    this.registrando = !this.registrando;
    
  }

  public setUsuario(arg : any){
    this.user.name = arg.name;
    this.user.email = arg.email;
    this.user.password = arg.password;
    this._entityService.saveEntity( "registro" , this.user).then((res) => {
      if (res.success == true) {
        this.registro();
      } else {
        this.messangeError = res.msj;
      }
    }).catch((res) => {
      this.messangeError = res.msj;
    });
  }
}
