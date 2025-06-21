import { Component, inject } from '@angular/core';

import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { MedidasService } from '../../services/medidas/medidas.service';

@Component({
  selector: 'app-caja-bigotes',
  imports: [CanvasJSAngularChartsModule],
  templateUrl: './caja-bigotes.component.html',
  styleUrl: './caja-bigotes.component.css'
})
export class CajaBigotesComponent {
  medidasService = inject(MedidasService);

  chartOptions = {
    animationEnabled: true,
    title:{
      text: "Caja y Bigotes"
    },
    axisX: {
      labelTextAlign: "center"
    },
    axisY: {
      title: "Intervalos",
      interval: this.medidasService.getRango() / 5,
      // gridcColor: "#ccc",
      // gridDashType: "dot",
      lineColor: "#ccc",
    },
    data: [{
      type: "boxAndWhisker",
      upperBoxColor: "#0873FF",
      lowerBoxColor: "#9FB00E",
      color: "black",
      yValueFormatString: "#,##0.##",
      dataPoints: [
        { label: " ", y: [this.medidasService.getMinimo(),
                                          this.medidasService.getLocalizacion(1,4),
                                          this.medidasService.getLocalizacion(3,4),
                                          this.medidasService.getMaximo(),
                                          this.medidasService.getLocalizacion(2,4),
                                        ] },
      ]
    }]
  }
  
}
