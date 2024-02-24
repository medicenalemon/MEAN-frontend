import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Producto } from '../../models/producto';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-crear-producto',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './crear-producto.component.html',
  styleUrl: './crear-producto.component.css'
})
export class CrearProductoComponent implements OnInit {
  productoForm: FormGroup;
  titulo = "Crear Producto."
  id: string;
  constructor(private fb: FormBuilder, 
    private router: Router, 
    private toastr: ToastrService,
    private _productoService: ProductoService,
    private aRouter: ActivatedRoute) { 
    this.productoForm = this.fb.group({
      descripcion: ['', Validators.required],
      categoria: ['', Validators.required],
      distribuidora: ['', Validators.required],
      precio: ['', Validators.required],
    })
    this.id = this.aRouter.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.edicionProducto();
  }

  agregarProducto() {
    const p: Producto = {
      descripcion: this.productoForm.get('descripcion')?.value,
      categoria: this.productoForm.get('categoria')?.value,
      distribuidora: this.productoForm.get('distribuidora')?.value,
      precio: this.productoForm.get('precio')?.value,
    }
    console.log(p);
    if(this.id !== null){
      //editar
      this._productoService.editarProducto(this.id, p).subscribe(data => {
        this.toastr.info("El producto fue modificado con éxito", "Operación completada");
        this.router.navigate(["/"]);
      }, error => {
        console.log(error);
        this.productoForm.reset();
      });
    } else {
      //agregar
      console.log(p);
      this._productoService.guardarProducto(p).subscribe(data => {
        this.toastr.success("Producto cargado con éxito", "Operación completada");
        this.router.navigate(["/"]);
      }, error => {
        console.log(error);
        this.productoForm.reset();
      })
    }  
  }

  edicionProducto() {
    if(this.id !== null){
      this.titulo = 'Editar Producto.';
      this._productoService.obtenerProducto(this.id).subscribe(data => {
        this.productoForm.setValue({
          descripcion: data.descripcion,
          categoria: data.categoria,
          distribuidora: data.distribuidora,
          precio: data.precio
        })
      })
    }
  }
}
