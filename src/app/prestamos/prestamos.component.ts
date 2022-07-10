import { Component, OnInit } from '@angular/core';
import { PrestamosService } from './prestamos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-prestamos',
  templateUrl: './prestamos.component.html',
  styleUrls: ['./prestamos.component.css']
})
export class PrestamosComponent implements OnInit {
  nombreCliente: string = "";
  clientePrestamo: string = "";
  montoPrestamo: string = "";
  plazoPrestamo: string = "";
  prestamos: Array<any> = [];
  clientes: Array<any> = [];
  montos: Array<any> = [];

  constructor(private apiService:PrestamosService) { }

  ngOnInit(): void {
    this.obtenerPrestamos();
    this.obtenerMontos();
    this.obtenerClientes();
  }

  obtenerPrestamos() {
    this.apiService.obtenerPrestamos()
    .subscribe({
      next: (response) => {
        if(response.status == 'ok' && response.result.length > 0){
          this.prestamos = response.result;
        } else {
          this.mostrarMensaje(response.mensaje);
        }
      },
      error: (error) => {
        this.mostrarMensajeError('Ocurrió un error al consultar prestamos');
      },
      complete: () => {
        this.nombreCliente = "";
      }
    });
  }

  obtenerClientes() {
    this.apiService.obtenerClientes()
    .subscribe({
      next: (response) => {
        if(response.status == 'ok' && response.result.length > 0){
          this.clientes = response.result;
        } else {
          this.mostrarMensaje(response.mensaje);
        }
      },
      error: (error) => {
        this.mostrarMensajeError('Ocurrió un error al consultar clientes');
      }
    });
  }

  obtenerMontos() {
    this.apiService.obtenerMontos()
    .subscribe({
      next: (response) => {
        if(response.status == 'ok' && response.result.length > 0){
          this.montos = response.result;
        } else {
          this.mostrarMensaje(response.mensaje);
        }
      },
      error: (error) => {
        this.mostrarMensajeError('Ocurrió un error al consultar montos');
      }
    });
  }

  buscarPrestamosCliente(nombreCliente: string) {
    if (nombreCliente === "") {
      this.obtenerPrestamos();
    } else {
      this.apiService.buscarPrestamosCliente(nombreCliente)
      .subscribe({
        next: (response) => {
          if(response.status == 'ok' && response.result.length > 0){
            this.prestamos = response.result;
          } else {
            this.mostrarMensaje(response.mensaje);
          }
        },
        error: (error) => {
          this.mostrarMensajeError('Ocurrió un error al consultar información');
        },
        complete: () => {
          this.nombreCliente = "";
        }
      });
    }
  }

  agregarPrestamo(){
    if (this.clientePrestamo === "") {
      this.mostrarMensaje('Favor de seleccionar cliente');
    } else if (this.montoPrestamo === "") {
      this.mostrarMensaje('Favor de seleccionar monto');
    } else if (this.plazoPrestamo === "") {
      this.mostrarMensaje('Favor de seleccionar plazo');
    } else {
      this.apiService.agregarPrestamo(this.clientePrestamo, this.montoPrestamo, this.plazoPrestamo)
      .subscribe({
        next: (response) => {
          if(response.status == 'ok'){
            this.mostrarMensajeExito('Se registró el préstamo correctamente');
            this.clientePrestamo = "";
            this.montoPrestamo = "";
            this.plazoPrestamo = "";
            this.obtenerPrestamos();
          } else {
            this.mostrarMensaje(response.mensaje);
          }
        },
        error: (error) => {
          this.mostrarMensajeError('Ocurrió un error al registrar préstamo');
        }
      });
    }
  }

  obtenerReporte(nombreCliente: string, idPrestamo: string) {
    this.apiService.obtenerReporte(nombreCliente, idPrestamo)
    .subscribe(
      (res) => {
        if (res.size > 0) {
          var fileURL = URL.createObjectURL(res);
          window.open(fileURL);
        } else {
          this.mostrarMensaje('No se encontró información del préstamo');
        }

      }
    );
  }

  mostrarMensajeError(mensaje: string) {
    Swal.fire({
      icon: 'error',
      title: 'Ocurrió un error',
      text: mensaje,
      confirmButtonText: 'Aceptar',
    })
  }

  mostrarMensaje(mensaje: string) {
    Swal.fire({
      icon: 'warning',
      title: 'Atención',
      text: mensaje,
      confirmButtonText: 'Aceptar',
    })
  }

  mostrarMensajeExito(mensaje: string) {
    Swal.fire({
      icon: 'success',
      title: mensaje,
      showConfirmButton: false,
      timer: 1500
    })
  }

}
