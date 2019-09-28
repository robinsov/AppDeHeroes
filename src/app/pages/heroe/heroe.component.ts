import { Component, OnInit } from '@angular/core';
import { HeroeModel } from 'src/app/models/heroe.model';
import { NgForm } from '@angular/forms';
import { HeroesService } from '../../services/heroes.service';
import Swal from 'sweetalert2'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html'
})
export class HeroeComponent implements OnInit {

  heroe: HeroeModel = new HeroeModel();

  constructor(private heroeService: HeroesService) { }

  ngOnInit() {
  }


  guardar(form: NgForm ){
    if(form.invalid){return}


    Swal.fire({
      title: 'Espere',
      text: 'Guardando Informacion',
      type: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();

    let peticion: Observable<any>;


    if(this.heroe.id){
      peticion = this.heroeService.actualizarHeroe(this.heroe);
    }else{
      peticion = this.heroeService.crearHeroe(this.heroe);
    }

    peticion.subscribe( resp => {
      console.log(resp);
        Swal.fire({
          title: this.heroe.nombre,
          text: 'Se actualizo correctamente',
          type: 'success'
        });

    });
  }
}
