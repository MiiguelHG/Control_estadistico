import { Component, inject } from '@angular/core';
import { MedidasService } from '../../services/medidas/medidas.service';

@Component({
  selector: 'app-dispersion',
  imports: [],
  templateUrl: './dispersion.component.html',
  styleUrl: './dispersion.component.css'
})
export class DispersionComponent {
  medidasService = inject(MedidasService); // Inyectar el servicio MedidasService

  varianzaPoblacional = Number(this.medidasService.getVarianzaPopulacional().toFixed(4)); // Obtener la varianza poblacional con 4 decimales
  varianzaMuestral = Number(this.medidasService.getVarianzaMuestral().toFixed(4)); // Obtener la varianza muestral con 4 decimales
  desviacionEstandarPoblacional = Number(this.medidasService.getDesviacionEstandarPopulacional().toFixed(4)); // Obtener la desviación estándar poblacional con 4 decimales
  desviacionEstandarMuestral = Number(this.medidasService.getDesviacionEstandarMuestral().toFixed(4)); // Obtener la desviación estándar muestral con 4 decimales
}
