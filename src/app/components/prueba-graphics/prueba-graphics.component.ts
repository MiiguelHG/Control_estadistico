import { Component, ViewChild } from '@angular/core';

import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { HotTableModule, HotTableRegisterer } from '@handsontable/angular';
import Handsontable from 'handsontable';

@Component({
  selector: 'app-prueba-graphics',
  imports: [CanvasJSAngularChartsModule, HotTableModule],
  templateUrl: './prueba-graphics.component.html',
  styleUrl: './prueba-graphics.component.css'
})
export class PruebaGraphicsComponent {
  data = [[]]; // Matriz para almacenar los datos de la tabla Handsontable

  private hotRegisterer = new HotTableRegisterer();
  id = 'myTable'; // ID de la tabla Handsontable

  // Ejemplo de tabla con Handsontable
  settingsTable = {
    data: [[]],          // matriz con una fila/columna vacía
    rowHeaders: true,
    colHeaders: true,
    minRows: 10,         // cantidad mínima de filas visibles
    minCols: 20,          // cantidad mínima de columnas visibles
    minSpareRows: 1,
    minSpareCols: 1,
    width: 650,       // para ajustar al contenedor
    height: 280,
    plugings: [Handsontable.plugins.CopyPaste],
    copyPaste: true, // Habilitar el plugin de copiar y pegar
    licenseKey: 'non-commercial-and-evaluation',
  };

  // Funcion para verificar si un valor es un número válido
  private esNumeroValido(valor: any): boolean {
    // Verifica si el valor es un número válido
    // Acepta strings o números válidos
    return (
      (typeof valor === 'number' && !isNaN(valor)) ||
      (typeof valor === 'string' && /^[+-]?(\d+(\.\d+)?|\.\d+)$/.test(valor.trim()))
    );
  }

  // Método para obtener la instancia de Handsontable
  getTableData() {
    const hotInstance = this.hotRegisterer.getInstance(this.id);
    const data = hotInstance?.getData() || [];

    // Conservar los datos numericos en la matriz data y elimiminar el resto de los datos
    const datosLimpios = data.map(row => row.filter((valor: any) => this.esNumeroValido(valor)).map((valor: any) => Number(valor)));

    this.data = datosLimpios.filter(row => row.length > 0); // Filtrar filas vacías y eliminar filas sin datos

    console.log('Datos de la tabla:', data);
    console.log('Datos filtrados:', this.data);
    // return data;
  }


  // Ejemplo de histograma con CanvasJS--------------------------------------------------------------------
  chartOptions = {
    animationEnabled: true,
    // Configuración del gráfico
      // Titulo del gráfico
    title: {
      text: "Monthly Sales Data"
    },
      // Ejes del gráfico
    axisY: {
      title: "Sales (in USD)"
    },
      // Datos del gráfico
    data: [{
      type: "column",
      dataPoints: [
        { label: "January", y: 3000 },
        { label: "February", y: 2000 },
        { label: "March", y: 4000 },
        { label: "April", y: 5000 },
        { label: "May", y: 6000 }
      ]
    }]
  }
}
