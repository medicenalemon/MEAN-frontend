import { Routes, RouterModule } from '@angular/router';
import { ListarProductosComponent } from './components/listar-productos/listar-productos.component';
import { CrearProductoComponent } from './components/crear-producto/crear-producto.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
    { path: '', component: ListarProductosComponent },
    { path: 'crear-producto', component: CrearProductoComponent },
    { path: 'editar-producto/:id', component: CrearProductoComponent },
    { path: '', redirectTo: '/listar-productos', pathMatch: 'full' }
];