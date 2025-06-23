import { Component, inject, OnInit } from '@angular/core';
import { ParametrosService, FrequencyData, Datos } from '../../services/parametros/parametros.service';
import { CommonModule } from '@angular/common';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';

@Component({
  selector: 'app-parametros',
  imports: [CommonModule, CanvasJSAngularChartsModule],
  templateUrl: './parametros.component.html',
  styleUrl: './parametros.component.css'
})
export class ParametrosComponent implements OnInit {
  chartOptions: any;
  chartOptionsRelative: any;
  chartOptionsAcumulado: any;
  chartOptionsRelativeAcumulado: any;
  parametrosSevice = inject(ParametrosService); // Inyectar el servicio ParametrosService
  frequencyTable: FrequencyData[] = [];
  datosTable: Datos[] = [];
  total: number = 0;
  mostrarHistograma: boolean = false;
  mostrarHistogramaRelativo: boolean = false;
  mostrarHistogramaAcumulado: boolean = false;
  mostrarHistogramaRelativoAcumulado: boolean = false;


  ngOnInit(): void {
    this.loadInitialData();
  }

  private loadInitialData(): void {
    this.calculateFrequencyTable();
    this.prepareChartOptions();
    this.prepareChartOptionsRelative();
    this.prepareChartOptionsAcumulado();
    this.prepareChartOptionsRelativeAcumulado();
  }

  private calculateFrequencyTable(): void {
    this.datosTable = this.parametrosSevice.getDatos();
    this.frequencyTable = this.parametrosSevice.getTable();
    this.total = this.parametrosSevice.getTotal();
    this.getTotalPuntoFrecuencia();
  }

  getTotalPuntoFrecuencia(): number {
    return this.frequencyTable.reduce((sum, item) => sum + item.puntoPorFrecuencia, 0);
  }

  private prepareChartOptions(): void {
    this.chartOptions = this.parametrosSevice.getHistogramaFrecuencias();
  }

  private prepareChartOptionsRelative(): void {
    this.chartOptionsRelative = this.parametrosSevice.getHistogramaRelativas();
  }

  private prepareChartOptionsAcumulado(): void {
    this.chartOptionsAcumulado = this.parametrosSevice.getHistogramaAcumuladas();
  }

  private prepareChartOptionsRelativeAcumulado(): void {
    this.chartOptionsRelativeAcumulado = this.parametrosSevice.getHistogramaRelativasAcumuladas();
  }

  public updateData(data: number[][]): void {
    this.parametrosSevice.setData(data);
    this.loadInitialData();
    if (this.mostrarHistograma){
      this.mostrarHistograma = true; // Mostrar el histograma al actualizar datos
      this.mostrarHistogramaRelativo = false; // Ocultar el histograma relativo
      this.mostrarHistogramaAcumulado = false; // Ocultar el histograma acumulado
      this.mostrarHistogramaRelativoAcumulado = false; // Ocultar el histograma relativo acumulado
    }

    if (this.mostrarHistogramaRelativo) {
      this.mostrarHistogramaRelativo = true; // Mostrar el histograma relativo al actualizar datos
      this.mostrarHistograma = false
      this.mostrarHistogramaAcumulado = false; // Ocultar el histograma acumulado
      this.mostrarHistogramaRelativoAcumulado = false; // Ocultar el hist
    }

    if (this.mostrarHistogramaAcumulado) {
      this.mostrarHistogramaAcumulado = true; // Mostrar el histograma acumulado al actualizar datos
      this.mostrarHistogramaRelativoAcumulado = false; // Ocultar el histograma relativo acumulado
      this.mostrarHistograma = false; // Ocultar el histograma
      this.mostrarHistogramaRelativo = false; // Ocultar el histograma relativo
    }

    if (this.mostrarHistogramaRelativoAcumulado) {
      this.mostrarHistogramaRelativoAcumulado = true; // Mostrar el histograma relativo acumulado al actualizar datos
      this.mostrarHistograma = false; // Ocultar el histograma
      this.mostrarHistogramaRelativo = false; // Ocultar el histograma relativo
      this.mostrarHistogramaAcumulado = false; // Ocultar el histograma acumulado
    }
    
  }

  toggleHistograma(): void {
    this.mostrarHistograma = !this.mostrarHistograma;
    if (this.mostrarHistograma && !this.chartOptions) {
      this.prepareChartOptions();
    }
  }

  toggleHistogramaRelativo(): void {
    this.mostrarHistogramaRelativo = !this.mostrarHistogramaRelativo;
    if (this.mostrarHistogramaRelativo && !this.chartOptionsRelative) {
      this.prepareChartOptionsRelative();
    }
  }

  toggleHistogramaAcumulado(): void {
    this.mostrarHistogramaAcumulado = !this.mostrarHistogramaAcumulado;
    if (this.mostrarHistogramaAcumulado && !this.chartOptionsAcumulado) {
      this.prepareChartOptionsAcumulado();
    }
  }

  toggleHistogramaRelativoAcumulado(): void {
    this.mostrarHistogramaRelativoAcumulado = !this.mostrarHistogramaRelativoAcumulado;
    if (this.mostrarHistogramaRelativoAcumulado && !this.chartOptionsRelativeAcumulado) {
      this.prepareChartOptionsRelativeAcumulado();
    }
  }
}