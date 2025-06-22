import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MedidasService {
  private data: number[][] = []; // Matriz para almacenar los datos de la tabla Handsontable
  private arrayData: number[] = []; // Array para almacenar los datos de la tabla Handsontable

  constructor() { }

  // Método para obtener los datos almacenados en la matriz ---------------------------------------------
  public setData(data: number[][]): void {
    this.data = data; // Actualizar la matriz de datos
  }

  // Metodo para pasar los datos a un array ---------------------------------------------
  public matrizToArray(): number[] {
    const arrData = this.data.flat(); // Aplanar la matriz a un array
    return arrData; // Retornar el array
  }

  // Metodo para obtener la mediana de los datos ---------------------------------------------
  public getMediana(): number {
    const array = this.matrizToArray(); // Obtener el array de datos
    if (array.length === 0) return 0; // Retornar 0 si el array está vacío

    const sortedArray = [...array].sort((a, b) => a - b); // Ordenar el array
    const mid = Math.floor(sortedArray.length / 2); // Calcular el índice medio

    // Si la longitud del array es impar, retornar el valor del medio
    if (sortedArray.length % 2 !== 0) {
      return sortedArray[mid];
    } else {
      // Si es par, retornar el promedio de los dos valores del medio
      return (sortedArray[mid - 1] + sortedArray[mid]) / 2;
    }
  }

  // Método para obtener la media de los datos ---------------------------------------------
  public getMedia(): number {
    const array = this.matrizToArray(); // Obtener el array de datos
    if (array.length === 0) return 0; // Retornar 0 si el array está vacío

    const sum = array.reduce((acc, val) => acc + val, 0); // Sumar todos los valores del array
    return sum / array.length; // Retornar la media
  }

  // Método para obtener la moda de los datos ---------------------------------------------
  public getModa(): number {
    const array = this.matrizToArray(); // Obtener el array de datos
    // if (array.length === 0) return 0; // Retornar un array vacío si el array está vacío

    const frequency: { [key: number]: number } = {}; // Objeto para contar la frecuencia de cada número
    let maxFreq = 0; // Variable para almacenar la frecuencia máxima

    // Contar la frecuencia de cada número
    array.forEach(num => {
      frequency[num] = (frequency[num] || 0) + 1;
      if (frequency[num] > maxFreq) {
        maxFreq = frequency[num]; // Actualizar la frecuencia máxima
      }
    });

    // Obtener el valor con la frecuencia máxima
    const modes = Object.keys(frequency)
      .filter((key: any) => frequency[key] === maxFreq)
      .map(Number); // Filtrar los números con la frecuencia máxima y convertirlos a números

    // console.log('Modas:', modes); // Mostrar las modas en la consola
    return modes.length > 0 ? modes[0] : 0; // Retornar la primera moda o 0 si no hay modas
  }

  // Método para obtener la varianza populacional de los datos ---------------------------------------------
  public getVarianzaPopulacional(): number {
    const array = this.matrizToArray(); // Obtener el array de datos
    if (array.length === 0) return 0; // Retornar 0 si el array está vacío

    const media = this.getMedia(); // Obtener la media
    const variance = array.reduce((acc, val) => acc + Math.pow(val - media, 2), 0) / array.length; // Calcular la varianza
    return variance; // Retornar la varianza
  }

  // Método para obtener la varianza muestral de los datos ---------------------------------------------
  public getVarianzaMuestral(): number {
    const array = this.matrizToArray(); // Obtener el array de datos
    if (array.length <= 1) return 0; // Retornar 0 si el array tiene 1 o menos elementos

    const media = this.getMedia(); // Obtener la media
    const variance = array.reduce((acc, val) => acc + Math.pow(val - media, 2), 0) / (array.length - 1); // Calcular la varianza muestral
    return variance; // Retornar la varianza muestral
  }

  // Método para obtener la desviación estándar poblacional de los datos ---------------------------------------------
  public getDesviacionEstandarPopulacional(): number {
    const varianza = this.getVarianzaPopulacional(); // Obtener la varianza poblacional
    return Math.sqrt(varianza); // Retornar la raíz cuadrada de la varianza
  }

  // Método para obtener la desviación estándar muestral de los datos ---------------------------------------------
  public getDesviacionEstandarMuestral(): number {
    const varianza = this.getVarianzaMuestral(); // Obtener la varianza muestral
    return Math.sqrt(varianza); // Retornar la raíz cuadrada de la varianza muestral
  }

  // Medidas de forma 
  // Método para obtener el coeficiente de asimetría de Pearson ---------------------------------------------
  public getCoeficienteAsimetriaPearson(): number {
    const media = this.getMedia(); // Obtener la media
    const mediana = this.getMediana(); // Obtener la mediana
    const desviacionEstandar = this.getDesviacionEstandarPopulacional(); // Obtener la desviación estándar populacional

    if (desviacionEstandar === 0) return 0; // Retornar 0 si la desviación estándar es 0

    // Calcular el coeficiente de asimetría de Pearson
    return (3 * (media - mediana)) / desviacionEstandar;
  }

  // Método para obtener el sesgo estandarizado de skewness ---------------------------------------------
  public getSesgoEstandarizadoSkewness(): number {
    const sesgo = this.getCoeficienteAsimetriaPearson(); // Obtener el sesgo
    return sesgo / Math.sqrt(6 / this.data.length); // Calcular el sesgo estandarizado de skewness
  }

  // Calculo de persentiles
  // Método para obtener el percentil de un conjunto de datos ---------------------------------------------
  public getLocalizacion(p: number, k: number): number {
    const array = this.matrizToArray(); // Obtener el array de datos
    if (array.length === 0) return 0; // Retornar 0 si el array está vacío

    const sortedArray = [...array].sort((a, b) => a - b); // Ordenar el array
    const index = (p / k) * (sortedArray.length - 1); // Calcular el índice del percentil
    const lowerIndex = Math.floor(index); // Índice inferior
    return sortedArray[lowerIndex] + ((index-lowerIndex)*(sortedArray[lowerIndex + 1] -  sortedArray[lowerIndex])); // Retornar el valor del percentil
  }

  // Método para obtener el coheficiente de curtosis ---------------------------------------------
  public getCurtosis(): number {
    const array = this.matrizToArray(); // Obtener el array de datos
    if (array.length === 0) return 0; // Retornar 0 si el array está vacío
    const sortedArray = [...array].sort((a, b) => a - b); // Ordenar el array
    const pc75 = this.getLocalizacion(75, 100); // Obtener el percentil 75 (Q3)
    const pc25 = this.getLocalizacion(25, 100); // Obtener el percentil 25 (Q1)
    const pc90 = this.getLocalizacion(90, 100); // Obtener el percentil 90 (P90)
    const pc10 = this.getLocalizacion(10, 100); // Obtener el percentil 10 (P10)

    // Calcular la curtosis utilizando la fórmula
    return (pc75 - pc25) / (2 * (pc90 - pc10));
  }

  // Metodo para obterner el rango de los datos ---------------------------------------------
  public getRango(): number {
    const array = this.matrizToArray(); // Obtener el array de datos
    if (array.length === 0) return 0; // Retornar 0 si el array está vacío

    const max = Math.max(...array); // Obtener el valor máximo
    const min = Math.min(...array); // Obtener el valor mínimo
    return max - min; // Retornar el rango
  }

  // Metodo para obtener el valor máximo de los datos ---------------------------------------------
  public getMaximo(): number {
    const array = this.matrizToArray(); // Obtener el array de datos
    if (array.length === 0) return 0; // Retornar 0 si el array está vacío

    return Math.max(...array); // Retornar el valor máximo
  }

  // Metodo para obtener el valor mínimo de los datos ---------------------------------------------
  public getMinimo(): number {
    const array = this.matrizToArray(); // Obtener el array de datos
    if (array.length === 0) return 0; // Retornar 0 si el array está vacío

    return Math.min(...array); // Retornar el valor mínimo
  }
}

