import { Component, inject } from '@angular/core';

import { HotTableModule, HotTableRegisterer } from '@handsontable/angular';
import Handsontable from 'handsontable';
import { TendenciasCentralComponent } from "../tendencias-central/tendencias-central.component";
import { MedidasService } from '../../services/medidas/medidas.service';

@Component({
  selector: 'app-ingresar-datos',
  imports: [HotTableModule, TendenciasCentralComponent],
  templateUrl: './ingresar-datos.component.html',
  styleUrl: './ingresar-datos.component.css'
})
export class IngresarDatosComponent {
  medidasService = inject(MedidasService); // Inyectar el servicio MedidasService

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

  mostrarTendenciasCentrales = false; // Bandera para mostrar u ocultar tendencias centrales

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

    this.medidasService.setData(this.data) // Actualizar el servicio con los datos
  }

  // Método para limpiar la tabla
  clearTable() {
    const hotInstance = this.hotRegisterer.getInstance(this.id);
    hotInstance?.clear();
    this.data = [[]]; // Reiniciar la matriz de datos
  }


}
