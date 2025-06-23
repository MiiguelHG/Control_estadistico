import { Injectable } from '@angular/core';

export interface FrequencyData {
  class: number;
  limiteInferior: number;
  limiteSuperior: number;
  marcaDeClase: number;
  puntoMedio: number;
  frecuenciaPM: number;
  puntoPorFrecuencia: number;
  absolute: number;
  relative: number;
  cumulativeAbsolute: number;
  cumulativeRelative: number;
}

export interface Datos {
  numeroDatos: number;
  valorMaximo: number;
  valorMinimo: number;
  rango: number;
  numeroClases: number;
  amplitud: number;    
}

@Injectable({
  providedIn: 'root'
})

export class ParametrosService {
  private data: number[][] = [];

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

      // Ordenar el array para asegurar correcta distribución
      const sortedArray = [...array].sort((a, b) => a - b);
      const minValue = Math.min(...sortedArray);
      const maxValue = Math.max(...sortedArray);
      const rango = Number((maxValue - minValue).toFixed(2));
      const n = sortedArray.length;
      const numClasses = Math.ceil(1 + 3.322 * Math.log10(n));
      const amplitud = Number((rango / numClasses).toFixed(4));
      
      const limites: { inferior: number; superior: number }[] = [];
      for (let i = 0; i < numClasses; i++) {
        limites.push({
          inferior: minValue + i * amplitud,
          superior: minValue + (i + 1) * amplitud
        });
      }

      const limitesL = limites.length

      const frequencyData: FrequencyData[] = [];
      let cumulativeAbs = 0;
      let cumulativeRel = 0;
      const totalCount = sortedArray.length;

      limites.forEach((limites, index) => {
        const marcaDeClase = (limites.inferior + limites.superior) / 2;
        
        // Modificar la condición para el último intervalo
        const condition = index === limitesL - 1 
          ? (num: number) => num >= limites.inferior && num <= limites.superior
          : (num: number) => num >= limites.inferior && num < limites.superior;

        const absolute = sortedArray.filter(condition).length;

        const relative = absolute / totalCount;
        cumulativeAbs += absolute;
        cumulativeRel += relative;
        const puntoPorFrecuencia = Number((marcaDeClase * absolute).toFixed(4));

        frequencyData.push({
          class: frequencyData.length + 1,
          limiteInferior: Number(limites.inferior.toFixed(2)),
          limiteSuperior: Number(limites.superior.toFixed(2)),
          marcaDeClase: Number(marcaDeClase),
          puntoMedio: Number(marcaDeClase.toFixed(2)),
          frecuenciaPM: absolute,
          puntoPorFrecuencia: Number(puntoPorFrecuencia.toFixed(2)),
          absolute: absolute,
          relative: Number(relative.toFixed(4)),
          cumulativeAbsolute: cumulativeAbs,
          cumulativeRelative: Number(cumulativeRel.toFixed(4))
        });
      });

      return frequencyData;
    }
  
    getTotal(): number {
      const array = this.matrizToArray();
      return array?.length || 0;
    }

    public getHistogramaFrecuencias(): any{
      const frequencyData = this.getTable();
      
      return {
        animationEnabled: true,
        title: {
          text: "Histograma de Frecuencias"
        },
        axisX: {
          title: "Clases",
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
          content: "Clase: {label}<br/>Frecuencia Absoluta: {y}<br/>Frecuencia Relativa: {relative}%",
        },
        //dataPointWidth: 147, // Ancho máximo de las columnas
        data: [{
          type: "column",
          indexLabelFontSize: 11,
          indexLabelFontColor: "#000000",
          color: "#253cff",
          columnWidth: 1, // Ancho relativo de las columnas (0 a 1)
          gapWidth: 0,    // Espacio entre columnas (0 = pegadas)
          dataPoints: frequencyData.map(item => ({
            label: item.class.toString(),
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
        title: "Clases",
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
        content: "Clases: {label}<br/>Frecuencia Absoluta: {y}<br/>Frecuencia Relativa: {relative}%",
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
          label: item.class.toString(),
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
        title: "Clases",
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
        content: "Clases: {label}<br/>Frecuencia Acumulada: {y}<br/>Frecuencia Relativa: {relative}%",
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
          label: item.class.toString(),
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
        title: "Clases",
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
        content: "Clases: {label}<br/>Frecuencia Relativa acumulada: {y}<br/>Frecuencia Relativa: {relative}%",
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
          label: item.class.toString(),
          y: item.cumulativeRelative,
          relative: (item.relative * 100).toFixed(2) // Convertir a porcentaje
        }))
      }]
    }
  }

  public getDatos(): Datos[] {
      const array = this.matrizToArray();

      if (!array || array.length === 0) {
        return [];
      }

      // Ordenar el array para asegurar correcta distribución
      const sortedArray = [...array].sort((a, b) => a - b);
      const minValue = Math.min(...sortedArray);
      const maxValue = Math.max(...sortedArray);
      const rango = Number((maxValue - minValue).toFixed(2));
      const n = sortedArray.length;
      const numClasses = Math.ceil(1 + 3.322 * Math.log10(n));
      const amplitud = Number((rango / numClasses).toFixed(4));

      const datos: Datos[] = [];

        datos.push({
        numeroDatos: n,
        valorMaximo: Number(maxValue.toFixed(2)),
        valorMinimo: Number(minValue.toFixed(2)),
        rango: rango,
        numeroClases: numClasses,
        amplitud: amplitud
        });

      return datos;
    }

}
