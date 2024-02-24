import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  uri = 'http://localhost:4000/api/productos/';
  constructor(private http: HttpClient) { }

  getProductos(): Observable<any> {
    return this.http.get(this.uri);
  }

  eliminarProducto(id: string): Observable<any>{
    return this.http.delete(this.uri + id);
  }

  guardarProducto(producto: Producto): Observable<any>{
    return this.http.post(this.uri, producto);
  }

  obtenerProducto(id: string): Observable<any>{
    return this.http.get(this.uri + id);
  }

  editarProducto(id: string, producto: Producto): Observable<any>{
    return this.http.put(this.uri + id, producto);
  }
}
