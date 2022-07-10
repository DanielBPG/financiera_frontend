import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PrestamosService {
  urlApi: string = "http://localhost/financiera_backend/";

  constructor(private http:HttpClient) { }

  obtenerPrestamos(): Observable<any> {
    let direccion = this.urlApi + 'prestamos';
    return this.http.get(direccion);
  }

  obtenerClientes(): Observable<any> {
    let direccion = this.urlApi + 'clientes';
    return this.http.get(direccion);
  }

  obtenerMontos(): Observable<any> {
    let direccion = this.urlApi + 'montos';
    return this.http.get(direccion);
  }

  buscarPrestamosCliente(nombreCliente: string): Observable<any> {
    let direccion = this.urlApi + 'prestamos?nombre=' + nombreCliente;
    return this.http.get(direccion);
  }

  agregarPrestamo(cliente: string, monto: string, plazo: string): Observable<any> {
    let direccion = this.urlApi + 'prestamos';
    const headers = { 'content-type': 'application/json'}
    let datos = {
      cliente,
      monto,
      plazo
    }
    let body=JSON.stringify(datos);
    return this.http.post(direccion, body, {'headers':headers})
  }

  obtenerReporte(nombreCliente: string, idPrestamo: string): Observable<any> {
    let direccion = this.urlApi + 'reportes?prestamo=' + idPrestamo + '&cliente=' + nombreCliente;
    return this.http.get(direccion, { responseType: 'blob' }).pipe(
      map(
        (res) => {
                return new Blob([res], { type: 'application/pdf' })
            }
      )
    );
  }
}
