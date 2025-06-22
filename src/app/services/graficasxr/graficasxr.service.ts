import { Injectable } from '@angular/core';

export interface FrequencyData {
  media: number;
  lc: number;
  lcs: number;
  lci: number;
  rango: number;
  lcr: number;
  lcsr: number;
  lcir: number;
}

@Injectable({
  providedIn: 'root'
})
export class GraficasxrService {
  private data: number[][] = [];
  private subgroupSize: number = 0; // Se determinará automáticamente
  
  private CONTROL_CHART_CONSTANTS = {
    2: { A2: 1.880, D3: 0, D4: 3.267 },
    3: { A2: 1.023, D3: 0, D4: 2.574 },
    4: { A2: 0.729, D3: 0, D4: 2.282 },
    5: { A2: 0.577, D3: 0, D4: 2.114 },
    6: { A2: 0.483, D3: 0, D4: 2.004 },
    7: { A2: 0.419, D3: 0.076, D4: 1.924 },
    8: { A2: 0.373, D3: 0.136, D4: 1.864 },
    9: { A2: 0.337, D3: 0.184, D4: 1.816 },
    10: { A2: 0.308, D3: 0.223, D4: 1.777 },
    11: { A2: 0.285, D3: 0.256, D4: 1.744 },
    12: { A2: 0.266, D3: 0.283, D4: 1.717 },
    13: { A2: 0.249, D3: 0.307, D4: 1.693 },
    14: { A2: 0.235, D3: 0.328, D4: 1.672 },
    15: { A2: 0.223, D3: 0.347, D4: 1.653 },
    16: { A2: 0.212, D3: 0.363, D4: 1.637 },
    17: { A2: 0.203, D3: 0.378, D4: 1.622 },
    18: { A2: 0.194, D3: 0.391, D4: 1.608 },
    19: { A2: 0.187, D3: 0.403, D4: 1.597 },
    20: { A2: 0.180, D3: 0.415, D4: 1.585 }
  };

  constructor() { }

  public setData(data: number[][]): void {
    this.data = data;
    this.determinarSubgroupSize();
  }

  private determinarSubgroupSize(): void {
    if (!this.data || this.data.length === 0) {
      this.subgroupSize = 0;
      return;
    }

    // Tomar el tamaño de la primera fila como referencia
    const firstRowLength = this.data[0]?.length || 0;
    
    // // Verificar que todas las filas tengan el mismo tamaño
    // const allSameLength = this.data.every(row => row.length === firstRowLength);
    
    // if (!allSameLength) {
    //   throw new Error('Todas las filas deben tener la misma cantidad de elementos');
    // }

    // Validar que el tamaño esté soportado (2-20)
    if (firstRowLength < 2 || firstRowLength > 20) {
      alert(`Tamaño de subgrupo no soportado: ${firstRowLength}. Debe estar entre 2 y 20.`);
    }

    this.subgroupSize = firstRowLength;
  }

  public getTable(): FrequencyData[] {
    if (!this.data || this.data.length === 0) {
      return [];
    }

    if (this.subgroupSize === 0) {
      throw new Error('No se ha determinado el tamaño de subgrupo. Datos no válidos.');
    }

    // Calcular medias y rangos por fila
    const resultados: FrequencyData[] = this.data.map(fila => {
      const valores = fila.filter(val => !isNaN(val));
      return {
        media: this.calcularMedia(valores),
        rango: this.calcularRango(valores),
        lc: 0, lcs: 0, lci: 0, lcr: 0, lcsr: 0, lcir: 0
      };
    });

    // Calcular límites de control
    this.calcularLimitesControl(resultados);

    return resultados;
  }

  private calcularLimitesControl(resultados: FrequencyData[]): void {
    if (resultados.length === 0) return;

    // Obtener constantes para el tamaño de subgrupo detectado
    const {A2, D3, D4} = this.CONTROL_CHART_CONSTANTS[this.subgroupSize as keyof typeof this.CONTROL_CHART_CONSTANTS];
    console.log(`Tamaño de subgrupo: ${this.subgroupSize}, A2: ${A2}, D3: ${D3}, D4: ${D4}`);
    
    // Calcular promedios globales
    const mediaDeMedias = this.calcularMedia(resultados.map(r => r.media));
    const mediaDeRangos = this.calcularMedia(resultados.map(r => r.rango));

    // Calcular límites para todos los registros
    resultados.forEach(item => {
      item.lc = mediaDeMedias;
      item.lcs = Number((mediaDeMedias + A2 * mediaDeRangos).toFixed(3));
      item.lci = Number((mediaDeMedias - A2 * mediaDeRangos).toFixed(3));
      item.lcr = mediaDeRangos;
      item.lcsr = Number((D4 * mediaDeRangos).toFixed(3));
      item.lcir = Number((D3 * mediaDeRangos).toFixed(3));
    });
  }

  // Métodos auxiliares (sin cambios)
  private calcularMedia(valores: number[]): number {
    const sum = valores.reduce((a, b) => a + b, 0);
    return Number((sum / valores.length).toFixed(2));
  }

  private calcularRango(valores: number[]): number {
    const max = Math.max(...valores);
    const min = Math.min(...valores);
    return Number((max - min).toFixed(2));
  }

  // Método para obtener el tamaño de subgrupo detectado (opcional)
  public getDetectedSubgroupSize(): number {
    return this.subgroupSize;
  }

  public getMediaDeMedias(resultados: FrequencyData[]): number {
    if (resultados.length === 0) return 0;
    return this.calcularMedia(resultados.map(r => r.media));
  }

  public getMediaDeRangos(resultados: FrequencyData[]): number { 
    if (resultados.length === 0) return 0;
    return this.calcularMedia(resultados.map(r => r.rango));
  }

  public getGraficaX(): any {
    const frequencyData = this.getTable();
    const mediaDeMedias = this.getMediaDeMedias(frequencyData);
    const mediaDeRangos = this.getMediaDeRangos(frequencyData);
    
    // Obtener constantes para el tamaño de subgrupo
    const {A2} = this.CONTROL_CHART_CONSTANTS[this.subgroupSize as keyof typeof this.CONTROL_CHART_CONSTANTS];
    const lcs = mediaDeMedias + A2 * mediaDeRangos;
    const lci = mediaDeMedias - A2 * mediaDeRangos;

    return {
      animationEnabled: true,
      theme: "light2",
      title: {
        text: "Gráfico de Control X - Medias"
      },
      axisX: {
        title: "Número de Subgrupo",
        interval: 1
      },
      axisY: {
        title: "Media",
        includeZero: false,
        stripLines: [
          {
            value: mediaDeMedias,
            label: "LC",
            labelPlacement: "inside",
            color: "#0070C0",
            thickness: 1
          },
          {
            value: lcs,
            label: "LCS",
            labelPlacement: "inside",
            color: "red",
            thickness: 1
          },
          {
            value: lci,
            label: "LCI",
            labelPlacement: "inside",
            color: "red",
            thickness: 1
          }
        ]
      },
      toolTip: {
        shared: true,
        content: "Subgrupo {x}: Media = {y}<br/>LCS = {lcs}<br/>LC = {lc}<br/>LCI = {lci}"
      },
      data: [{
        type: "line",
        name: "Medias",
        markerType: "circle",
        toolTipContent: "Subgrupo {x}: {y}",
        dataPoints: frequencyData.map((item, index) => ({
          x: index + 1,
          y: item.media,
          lcs: item.lcs.toFixed(3),
          lc: item.lc.toFixed(3),
          lci: item.lci.toFixed(3)
        }))
      },
      {
        type: "line",
        name: "LCS",
        color: "red",
        lineDashType: "dash",
        showInLegend: true,
        dataPoints: frequencyData.map((item, index) => ({
          x: index + 1,
          y: item.lcs
        }))
      },
      {
        type: "line",
        name: "LC",
        color: "#0070C0",
        showInLegend: true,
        dataPoints: frequencyData.map((item, index) => ({
          x: index + 1,
          y: item.lc
        }))
      },
      {
        type: "line",
        name: "LCI",
        color: "red",
        lineDashType: "dash",
        showInLegend: true,
        dataPoints: frequencyData.map((item, index) => ({
          x: index + 1,
          y: item.lci
        }))
      }]
    };
}

public getGraficaR(): any {
    const frequencyData = this.getTable();
    const mediaDeMedias = this.getMediaDeMedias(frequencyData);
    const mediaDeRangos = this.getMediaDeRangos(frequencyData);
    
    // Obtener constantes para el tamaño de subgrupo
    const {A2} = this.CONTROL_CHART_CONSTANTS[this.subgroupSize as keyof typeof this.CONTROL_CHART_CONSTANTS];
    const lcs = mediaDeMedias + A2 * mediaDeRangos;
    const lci = mediaDeMedias - A2 * mediaDeRangos;

    return {
      animationEnabled: true,
      theme: "light2",
      title: {
        text: "Gráfico de Control R - Rangos"
      },
      axisX: {
        title: "Número de Subgrupo",
        interval: 1
      },
      axisY: {
        title: "Rango",
        includeZero: false,
        stripLines: [
          {
            value: mediaDeMedias,
            label: "LC",
            labelPlacement: "inside",
            color: "#0070C0",
            thickness: 1
          },
          {
            value: lcs,
            label: "LCS",
            labelPlacement: "inside",
            color: "red",
            thickness: 1
          },
          {
            value: lci,
            label: "LCI",
            labelPlacement: "inside",
            color: "red",
            thickness: 1
          }
        ]
      },
      toolTip: {
        shared: true,
        content: "Subgrupo {x}: Rango = {y}<br/>LCS = {lcsr}<br/>LC = {lcr}<br/>LCI = {lcir}"
      },
      data: [{
        type: "line",
        name: "Rangos",
        markerType: "circle",
        toolTipContent: "Subgrupo {x}: {y}",
        dataPoints: frequencyData.map((item, index) => ({
          x: index + 1,
          y: item.rango,
          lcs: item.lcs.toFixed(3),
          lc: item.lc.toFixed(3),
          lci: item.lci.toFixed(3)
        }))
      },
      {
        type: "line",
        name: "LCS",
        color: "red",
        lineDashType: "dash",
        showInLegend: true,
        dataPoints: frequencyData.map((item, index) => ({
          x: index + 1,
          y: item.lcsr
        }))
      },
      {
        type: "line",
        name: "LC",
        color: "#0070C0",
        showInLegend: true,
        dataPoints: frequencyData.map((item, index) => ({
          x: index + 1,
          y: item.lcr
        }))
      },
      {
        type: "line",
        name: "LCI",
        color: "red",
        lineDashType: "dash",
        showInLegend: true,
        dataPoints: frequencyData.map((item, index) => ({
          x: index + 1,
          y: item.lcir
        }))
      }]
    };
}

}
