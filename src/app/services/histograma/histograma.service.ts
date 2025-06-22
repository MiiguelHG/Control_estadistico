import { Injectable } from '@angular/core';

export interface FrequencyData {
  value: number;
  absolute: number;
  relative: number;
  cumulativeAbsolute: number;
  cumulativeRelative: number;
}

@Injectable({
  providedIn: 'root'
})
export class HistogramaService {
  private data: number[][] = [];
  private arrayData: number[] = [];

  constructor() { }

  public setData(data: number[][]): void {
    this.data = data;
  }

  public matrizToArray(): number[] {
    return this.data.flat();
  }

  public getTable(): FrequencyData[] {
    const array = this.matrizToArray();
    if (!array || array.length === 0) {
      return [];
    }

    // Paso 1: Calcular frecuencias absolutas
    const frequencyMap = new Map<number, number>();
    array.forEach(num => {
      frequencyMap.set(num, (frequencyMap.get(num) || 0) + 1);
    });

    const totalCount = array.length;

    // Paso 2: Crear array de datos sin acumulados
    const frequencyData: FrequencyData[] = [];
    frequencyMap.forEach((absolute, value) => {
      frequencyData.push({
        value,
        absolute,
        relative: absolute / totalCount,
        cumulativeAbsolute: 0, // Temporal, se calculará después
        cumulativeRelative: 0 // Temporal, se calculará después
      });
    });

    // Paso 3: Ordenar por valor ascendente
    frequencyData.sort((a, b) => a.value - b.value);

    // Paso 4: Calcular acumulados después de ordenar
    let cumulativeAbs = 0;
    let cumulativeRel = 0;
    for (const item of frequencyData) {
      cumulativeAbs += item.absolute;
      cumulativeRel += item.relative;
      
      item.cumulativeAbsolute = cumulativeAbs;
      item.cumulativeRelative = Number(cumulativeRel.toFixed(2));
      
      // Redondeamos solo los valores que se muestran (no los acumulados intermedios)
      item.absolute = Number(item.absolute.toFixed(2));
      item.relative = Number(item.relative.toFixed(2));
    }

    return frequencyData;
  }

  getTotal(): number {
    const array = this.matrizToArray();
    return array?.length || 0;
  }

  public getHistogramaFrecuencias(): any{
    const frequencyData = this.getTable();
    // const numItems = frequencyData.length;
    
    // // Cálculo dinámico del dataPointWidth basado en el número de elementos
    // const baseWidth = 147; // Ancho base para un número estándar de categorías
    // const minWidth = 30;   // Ancho mínimo para muchas categorías
    // const maxWidth = 175;  // Ancho máximo para pocas categorías
    
    // // Fórmula para calcular el ancho dinámico
    // let dynamicWidth: number;
    // let baseWidthAdjusted = (baseWidth * (5.5 / numItems))+12;
    
    // if (numItems <= 5) {
    //     dynamicWidth = maxWidth;
    // } else if(numItems == 6){
    //     dynamicWidth = baseWidth;
    // } else if (numItems <= 14) {
    //     dynamicWidth = (baseWidth * (5.5 / numItems))+12;
    // } else {
    //     dynamicWidth = Math.max(minWidth, baseWidthAdjusted);
    // }
    // console.log(`Número de elementos: ${numItems}, Ancho dinámico: ${dynamicWidth}`);
    // console.log(baseWidthAdjusted)
    
    return {
      animationEnabled: true,
      title: {
        text: "Histograma de Frecuencias"
      },
      axisX: {
        title: "Valores",
        interval: 1,
        lineColor: "#000000", 
        tickColor: "#000000"
      },
      axisY: {
        title: "Frecuencia Absoluta",
        includeZero: true,
        lineColor: "#000000", 
        tickColor: "#000000"
      },
      toolTip: {
        shared: true,
        content: "Valor: {label}<br/>Frecuencia Absoluta: {y}<br/>Frecuencia Relativa: {relative}%",
      },
      // dataPointWidth: dynamicWidth, // Ancho máximo de las columnas
      data: [{
        type: "column",
        indexLabelFontSize: 11,
        indexLabelFontColor: "#000000",
        color: "#253cff",
        columnWidth: 1, // Ancho relativo de las columnas (0 a 1)
        gapWidth: 0,    // Espacio entre columnas (0 = pegadas)
        dataPoints: frequencyData.map(item => ({
          label: item.value.toString(),
          y: item.absolute,
          relative: (item.relative * 100).toFixed(2) // Convertir a porcentaje
        }))
      }]
    }
  }

  public getHistogramaRelativas(): any{
    const frequencyData = this.getTable();
    
    return {
      animationEnabled: true,
      title: {
        text: "Histograma de Frecuencias relativas"
      },
      axisX: {
        title: "Valores",
        interval: 1,
        lineColor: "#000000", 
        tickColor: "#000000"
      },
      axisY: {
        title: "Frecuencia Relativa",
        includeZero: true,
        lineColor: "#000000", 
        tickColor: "#000000"
      },
      toolTip: {
        shared: true,
        content: "Valor: {label}<br/>Frecuencia Absoluta: {y}<br/>Frecuencia Relativa: {relative}%",
      },
    // dataPointWidth: 145, // Ancho máximo de las columnas
      data: [{
        type: "column",
        indexLabelFontSize: 11,
        indexLabelFontColor: "#000000",
        color: "#253cff",
        columnWidth: 1, // Ancho relativo de las columnas (0 a 1)
        gapWidth: 0,    // Espacio entre columnas (0 = pegadas)
        dataPoints: frequencyData.map(item => ({
          label: item.value.toString(),
          y: item.relative,
          relative: (item.relative * 100).toFixed(2) // Convertir a porcentaje
        }))
      }]
    }
  }

  public getHistogramaAcumuladas(): any{
    const frequencyData = this.getTable();
    
    return {
      animationEnabled: true,
      title: {
        text: "Histograma de Frecuencias Acumuladas"
      },
      axisX: {
        title: "Valores",
        interval: 1,
        lineColor: "#000000", 
        tickColor: "#000000"
      },
      axisY: {
        title: "Frecuencia Acumulada",
        includeZero: true,
        lineColor: "#000000", 
        tickColor: "#000000"
      },
      toolTip: {
        shared: true,
        content: "Valor: {label}<br/>Frecuencia Acumulada: {y}<br/>Frecuencia Relativa: {relative}%",
      },
      // dataPointWidth: 147, // Ancho máximo de las columnas
      data: [{
        type: "column",
        indexLabelFontSize: 11,
        indexLabelFontColor: "#000000",
        color: "#253cff",
        columnWidth: 1, // Ancho relativo de las columnas (0 a 1)
        gapWidth: 0,    // Espacio entre columnas (0 = pegadas)
        dataPoints: frequencyData.map(item => ({
          label: item.value.toString(),
          y: item.cumulativeAbsolute,
          relative: (item.relative * 100).toFixed(2) // Convertir a porcentaje
        }))
      }]
    }
  }

  public getHistogramaRelativasAcumuladas(): any{
    const frequencyData = this.getTable();
    
    return {
      animationEnabled: true,
      title: {
        text: "Histograma de Frecuencias relativas acumuladas"
      },
      axisX: {
        title: "Valores",
        interval: 1,
        lineColor: "#000000", 
        tickColor: "#000000"
      },
      axisY: {
        title: "Frecuencia Relativa Acumulada",
        includeZero: true,
        lineColor: "#000000", 
        tickColor: "#000000"
      },
      toolTip: {
        shared: true,
        content: "Valor: {label}<br/>Frecuencia Relativa acumulada: {y}<br/>Frecuencia Relativa: {relative}%",
      },
      // dataPointWidth: 147, // Ancho máximo de las columnas
      data: [{
        type: "column",
        indexLabelFontSize: 11,
        indexLabelFontColor: "#000000",
        color: "#253cff",
        columnWidth: 1, // Ancho relativo de las columnas (0 a 1)
        gapWidth: 0,    // Espacio entre columnas (0 = pegadas)
        dataPoints: frequencyData.map(item => ({
          label: item.value.toString(),
          y: item.cumulativeRelative,
          relative: (item.relative * 100).toFixed(2) // Convertir a porcentaje
        }))
      }]
    }
  }

}