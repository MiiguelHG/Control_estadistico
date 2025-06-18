import { Routes } from '@angular/router';
import { PruebaGraphicsComponent } from './components/prueba-graphics/prueba-graphics.component';
import { IngresarDatosComponent } from './components/ingresar-datos/ingresar-datos.component';

export const routes: Routes = [
    {path: '', redirectTo: 'Bienvenido', pathMatch: 'full'},
    {path: 'Bienvenido', component: IngresarDatosComponent}
];
