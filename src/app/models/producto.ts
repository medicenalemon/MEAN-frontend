export class Producto {
    _id?: number;
    descripcion: string;
    categoria: string;
    distribuidora: string;
    precio: number;

    constructor(descripcion: string, categoria: string, distribuidora: string, precio: number){
        this.descripcion = descripcion;
        this.categoria = categoria;
        this.distribuidora = distribuidora;
        this.precio = precio;
    }
}