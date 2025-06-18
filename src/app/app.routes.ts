import { Routes } from '@angular/router';
import { PruebaGraphicsComponent } from './components/prueba-graphics/prueba-graphics.component';

export const routes: Routes = [
    {path: '', redirectTo: 'prueba-graphics', pathMatch: 'full'},
    {path: 'prueba-graphics', component: PruebaGraphicsComponent}
];
