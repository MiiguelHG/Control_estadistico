import { Component, inject } from '@angular/core';
import { MedidasService } from '../../services/medidas/medidas.service';

@Component({
  selector: 'app-forma',
  imports: [],
  templateUrl: './forma.component.html',
  styleUrl: './forma.component.css'
})
export class FormaComponent {
  medidasService = inject(MedidasService);

  sesgo = Number(this.medidasService.getCoeficienteAsimetriaPearson().toFixed(4));
  sesgoEstandar = Number(this.medidasService.getSesgoEstandarizadoSkewness().toFixed(4));
  curtosis = Number(this.medidasService.getCurtosis().toFixed(4));

}
