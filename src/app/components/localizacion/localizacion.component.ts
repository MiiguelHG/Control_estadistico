import { Component, inject } from '@angular/core';
import { MedidasService } from '../../services/medidas/medidas.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-localizacion',
  imports: [FormsModule],
  templateUrl: './localizacion.component.html',
  styleUrl: './localizacion.component.css'
})
export class LocalizacionComponent {
[x: string]: any;
  medidasService = inject(MedidasService);

  op = 0;
  prefix = 'Q'; // Prefijo para los cuartiles
  listCuartiles: number[] = [];
  percentil: number = 0; // Valor del percentil a calcular
  res: number = 0; // Resultado del percentil calculado

  // Método para calcular los cuartiles
  calcularCuartiles(k: number): void {
    if (k === 10) this.prefix = 'D'; // Cambiar el prefijo a 'D' para deciles
    else if (k === 5) this.prefix = 'K'; // Cambiar el prefijo a 'Q' para cuartiles
    else this.prefix = 'Q'; // Cambiar el prefijo a 'Q' para cuartiles

    this.listCuartiles = [];
    const n = this.medidasService.matrizToArray().length;
    if (n === 0) return;
    for (let j = 1; j < k; j++) {
      const value = this.medidasService.getLocalizacion(j, k);
      const formatted = Number.isInteger(value) ? value : Number(value.toFixed(1));
      this.listCuartiles.push(formatted);
    }
  }

  // Método para calcular el percentil
  calcularPercentil(): void {
    if (this.percentil < 1 || this.percentil > 99) {
      alert('El percentil debe estar entre 1 y 99');
      return;
    }
    const value = this.medidasService.getLocalizacion(this.percentil, 100);
    const formatted = Number.isInteger(value) ? value : Number(value.toFixed(1));
    this.res = formatted; // Asignar el resultado formateado al atributo res
  }
}
