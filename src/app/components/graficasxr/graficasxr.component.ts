import { Component, OnInit } from '@angular/core';
import { GraficasxrService, FrequencyData } from '../../services/graficasxr/graficasxr.service';
import { inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';

@Component({
  selector: 'app-graficasxr',
  imports: [CommonModule, CanvasJSAngularChartsModule],
  templateUrl: './graficasxr.component.html',
  styleUrl: './graficasxr.component.css'
})
export class GraficasxrComponent implements OnInit{
  graficasXRService = inject(GraficasxrService);
  frequencyTable: FrequencyData[] = [];
  mediaDeMedias: number = 0;
  mediaDeRangos: number = 0;
  mostrarX: boolean = false;
  mostrarR: boolean = false;
  chartOptions: any;
  chartOptionsR: any;

  ngOnInit(): void {
    this.loadInitialData();
  }

  private loadInitialData(): void {
    this.calculateFrequencyTable();
    this.prepareChartOptions();
  }

  private calculateFrequencyTable(): void {
    this.frequencyTable = this.graficasXRService.getTable();
    this.mediaDeMedias = this.graficasXRService.getMediaDeMedias(this.frequencyTable);
    this.mediaDeRangos = this.graficasXRService.getMediaDeRangos(this.frequencyTable);
  }

  private prepareChartOptions(): void {
    this.chartOptions = this.graficasXRService.getGraficaX();
    this.chartOptionsR = this.graficasXRService.getGraficaR();
  }

  public updateData(data: number[][]): void {
    this.graficasXRService.setData(data);
    this.loadInitialData();
    if (this.mostrarX){
      this.mostrarX = true; 
      this.mostrarR = false; 
    }

    if (this.mostrarR){
      this.mostrarR = true; 
      this.mostrarX = false; 
    }
    
  }

  toggleX(): void {
    this.mostrarX = !this.mostrarX;
    if (this.mostrarX && !this.chartOptions) {
      this.prepareChartOptions();
    }
  }

  toggleR(): void {
    this.mostrarR = !this.mostrarR;
    if (this.mostrarR && !this.chartOptionsR) {
      this.prepareChartOptions();
    }
  }
}
