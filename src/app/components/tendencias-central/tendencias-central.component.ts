import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tendencias-central',
  imports: [],
  templateUrl: './tendencias-central.component.html',
  styleUrl: './tendencias-central.component.css'
})
export class TendenciasCentralComponent {
  @Input() data: number[][] = []; // Matriz para almacenar los datos de la tabla Handsontable

  showData() {
    // Método para mostrar los datos en la consola
    console.log('Datos de Tendencias Centrales:', this.data);
  }
}
