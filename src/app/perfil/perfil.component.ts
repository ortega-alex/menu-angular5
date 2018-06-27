import { Component, OnInit } from '@angular/core';
import { EntityService } from '../services/entity.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
  providers: [EntityService]
})
export class PerfilComponent implements OnInit {

  private readonly NOMBRE_ENTIDAD: string = "usuario";

  private usuario: any;
  private usuarios: Array<any> = [];

  constructor(
    private _entityService: EntityService
  ) {
    this.usuario = new Object();
  }

  public getEntity(){
    this._entityService.getEntity(this.NOMBRE_ENTIDAD).then((res) => {
        this.usuarios = res.usuario;
        console.log('usuarios: ' + JSON.stringify(this.usuarios));
    }).catch(err => console.log('err: ' + JSON.stringify(err)));
  }

  ngOnInit() {
    this.getEntity();
  }
}