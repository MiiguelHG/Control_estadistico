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
}
