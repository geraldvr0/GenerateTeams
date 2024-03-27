import { Component, ViewChild, ElementRef } from '@angular/core';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'caso';
  titulo: string='';
  cantidadGrupos: number=0;
  listaNombres: string='';
  datos: number = 0; 
  integrantes: number = 0;
  grupos: string[][] = [];
  view:boolean=false;
  @ViewChild('content') content!: ElementRef;

  actualizarNombresPorLinea() {
    const nombresLineas = this.listaNombres.split('\n').map(line => line.trim()).filter(line => line !== ''); // Filtra las líneas en blanco
    this.datos = nombresLineas.length; // Actualiza la cantidad de líneas
    this.integrantes = this.datos/this.cantidadGrupos;
  }

  descargarImagen() {
    html2canvas(this.content.nativeElement).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = imgData;
      link.download = 'imagen.png';
      link.click();
    });
  }
  clear() {
    this.view=false;
    this.titulo='';
    this.cantidadGrupos=0;
    this.listaNombres='';
  }
  crearGrupos() {
    this.grupos = []; // Reinicia los grupos
    const nombresLineas = this.listaNombres.split('\n').map(line => line.trim()).filter(line => line !== '');
    this.view=true;
    // Divide los nombres en la cantidad de grupos ingresados
    const cantidadNombresPorGrupo = Math.ceil(nombresLineas.length / this.cantidadGrupos);

    for (let i = 0; i < this.cantidadGrupos; i++) {
      const grupo: string[] = [];

      // Selecciona nombres al azar para cada grupo
      for (let j = 0; j < cantidadNombresPorGrupo; j++) {
        const nombreIndex = Math.floor(Math.random() * nombresLineas.length);
        if (nombresLineas[nombreIndex]) {
          grupo.push(nombresLineas.splice(nombreIndex, 1)[0]);
        }
      }

      this.grupos.push(grupo);
    }
  }
}
