import { Component, inject } from '@angular/core';

import { HotTableModule, HotTableRegisterer } from '@handsontable/angular';
import Handsontable from 'handsontable';
import { TendenciasCentralComponent } from "../tendencias-central/tendencias-central.component";
import { HistogramaComponent } from '../histograma/histograma.component';
import { MedidasService } from '../../services/medidas/medidas.service';
import { DispersionComponent } from "../dispersion/dispersion.component";
import { FormaComponent } from "../forma/forma.component";
import { CajaBigotesComponent } from "../caja-bigotes/caja-bigotes.component";
import { LocalizacionComponent } from "../localizacion/localizacion.component";
import { HistogramaService } from '../../services/histograma/histograma.service';
import { ParametrosService } from '../../services/parametros/parametros.service';
import { ParametrosComponent } from '../parametros/parametros.component';
import { CommonModule } from '@angular/common';
import { GraficasxrComponent } from '../graficasxr/graficasxr.component';
import { GraficasxrService } from '../../services/graficasxr/graficasxr.service';

@Component({
  selector: 'app-ingresar-datos',
  imports: [HotTableModule, TendenciasCentralComponent, HistogramaComponent, ParametrosComponent, DispersionComponent, FormaComponent, CajaBigotesComponent, LocalizacionComponent, CommonModule, GraficasxrComponent],
  templateUrl: './ingresar-datos.component.html',
  styleUrl: './ingresar-datos.component.css'
})
export class IngresarDatosComponent {
  medidasService = inject(MedidasService); // Inyectar el servicio MedidasService
  histogramaService = inject(HistogramaService); // Inyectar el servicio HistogramaService
  parametrosService = inject(ParametrosService); // Inyectar el servicio de parámetros
  graficasXRService = inject(GraficasxrService)

  data = [[]]; // Matriz para almacenar los datos de la tabla Handsontable

  private hotRegisterer = new HotTableRegisterer();
  id = 'myTable'; // ID de la tabla Handsontable

  // Ejemplo de tabla con Handsontable
  settingsTable = {
    data: [[]],          // matriz con una fila/columna vacía
    rowHeaders: true,
    colHeaders: true,
    minRows: 15,         // cantidad mínima de filas visibles
    minCols: 20,          // cantidad mínima de columnas visibles
    minSpareRows: 1,
    minSpareCols: 1,
    width: 700,       // para ajustar al contenedor
    height: 350,
    plugings: [Handsontable.plugins.CopyPaste],
    copyPaste: true, // Habilitar el plugin de copiar y pegar
    licenseKey: 'non-commercial-and-evaluation',
  };

  mostrarTendenciasCentrales = false; // Bandera para mostrar u ocultar tendencias centrales
  mostrarTabla = false; // Bandera para mostrar u ocultar la tabla
  mostrarTablaParametros = false; // Bandera para mostrar u ocultar la tabla de parámetros
  mostrarDispersion = false; // Bandera para mostrar u ocultar medidas de dispersión
  mostrarForma = false; // Bandera para mostrar u ocultar medidas de forma
  mostrarCajaBigotes = false; // Bandera para mostrar u ocultar caja y bigotes
  mostrarLocalizacion = false; // Bandera para mostrar u ocultar localización
  mostrarGraficasXR = false; // Bandera para mostrar u ocultar gráficas X-R

  mostrarHistograma: boolean = false;
  mostrarParametros: boolean = false;
  datosAgrupados: boolean = false; // Controla si los datos están agrupados o no

  constructor() {
    this.desagruparDatos(); // Inicialmente, los datos no están agrupados
  }

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
    this.histogramaService.setData(this.data); // Actualizar el servicio de histograma con los datos
    this.parametrosService.setData(this.data); // Actualizar el servicio de parámetros con los datos
    // this.graficasXRService.setData(this.data);
  }

  getTableDataXR() {
    const hotInstance = this.hotRegisterer.getInstance(this.id);
    const data = hotInstance?.getData() || [];

    // Conservar los datos numericos en la matriz data y elimiminar el resto de los datos
    const datosLimpios = data.map(row => row.filter((valor: any) => this.esNumeroValido(valor)).map((valor: any) => Number(valor)));

    this.data = datosLimpios.filter(row => row.length > 0); // Filtrar filas vacías y eliminar filas sin datos

    this.graficasXRService.setData(this.data);
  }

  // Método para limpiar la tabla
  clearTable() {
    const hotInstance = this.hotRegisterer.getInstance(this.id);
    hotInstance?.clear();
    this.data = [[]]; // Reiniciar la matriz de datos
  }

  // Métodos para manejar los botones
  agruparDatos() {
    this.datosAgrupados = true;
    this.mostrarHistograma = false;
    this.mostrarParametros = true; // Asegura que Parámetros sea visible
    // Lógica de agrupación
  }

  desagruparDatos() {
    this.datosAgrupados = false;
    this.mostrarParametros = false;
    this.mostrarHistograma = true; // Asegura que Histograma sea visible
    // Lógica de desagrupación
  }


}
