import { Component, inject, Input } from '@angular/core';
import { MedidasService } from '../../services/medidas/medidas.service';

@Component({
  selector: 'app-tendencias-central',
  imports: [],
  templateUrl: './tendencias-central.component.html',
  styleUrl: './tendencias-central.component.css'
})
export class TendenciasCentralComponent {
  medidasService = inject(MedidasService); // Inyectar el servicio MedidasService

  media = this.medidasService.getMedia(); // Obtener la media de los datos
  mediana = this.medidasService.getMediana(); // Obtener la mediana de los datos
  moda = this.medidasService.getModa(); // Obtener la moda de los datos
}
