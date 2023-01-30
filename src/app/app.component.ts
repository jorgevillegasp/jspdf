import { Component, ElementRef, ViewChild } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  VIDEOGAMES = [
    {
      id: 1,
      name: 'Animal Crossing',
      platform: 'Nintendo Switch',
      reference: '1-770-736-8031',
    },
    {
      id: 2,
      name: 'The Legend of Zelda: Ocarina of Time CV',
      platform: 'Wii U',
      reference: '1-770-736-2323',
    },
    {
      id: 3,
      name: 'Metal Gear Solid',
      platform: 'Playstation (PSX)',
      reference: '1-4564-736-334',
    },
    {
      id: 4,
      name: 'ShenMue',
      platform: 'Sega Dreamcast',
      reference: '3-770-736-4532',
    },
    {
      id: 5,
      name: 'Rise of the Tomb Raider',
      platform: 'Playstation 4',
      reference: '1-324-736-3245',
    },
    {
      id: 6,
      name: 'Resident Evil 2',
      platform: 'Playstation',
      reference: '1-123-3336-4321',
    },
  ];
  title = 'JsPDF';
  /**
   * Asignamos en “DATA” el contenido de la tabla 
   * y el título “Lista de videojuegos…” para poder 
   * usarlo en la generación del PDF como la 
   * información que queremos mostrar.
   */
  
  generatePDF() {
    const doc = new jsPDF('p', 'mm', 'a4');
    
    // Encabezado
    doc.setFontSize(20);
    doc.text(`<h1>Encabezado</h1>`, 10, 20);
 
    // Cuerpo
    doc.setFontSize(14);
    doc.text(JSON.stringify(this.VIDEOGAMES), 10, 40);
 
    // Pie de página
    doc.setFontSize(12);
    doc.text('Pie de página', 10, 280);
    
    doc.save('data.pdf');
  }
  
  
  // tslint:disable-next-line:typedef
  descargarPDF() {
    
    /**
     * Iniciamos el valor “doc” que será el objeto del documento 
     * para generar el PDF añadiendo la orientación “p” 
     * (Portrait = vertical), la unidad de media como “pt” 
     * y el tamaño del PDF, “A4”.
    */
   // La exportación predeterminada es papel A4, 
   // retrato, utilizando milímetros para las unidades
   // const doc = new jsPDF();
   const DATA: any = document.getElementById('htmlData');
   const options = {
      background: 'white',
      scale: 3
    };
    
    html2canvas(DATA, options).then((canvas) => {
      
      const img = canvas.toDataURL('image/PNG');
      
      const pdf = new jsPDF('p', 'pt', 'a4');
      // Add image Canvas to PDF
      /**Establecer un margen en funcion de X para el PDF  */
      const bufferX = 15;
      /**Establecer un margen en funcion de Y para el PDF  */
      const bufferY = 15;
      /** También se calcula el tamaño del PDF en función del tamaño de la imagen capturada. */
      const imgProps = (pdf as any).getImageProperties(img);
      const pdfWidth = pdf.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      //addImage (imageData, formato, x, y, ancho, alto, alias, compresión, rotación) 
      pdf.addImage(
        img, 
        'PNG', 
        bufferX, 
        bufferY, 
        pdfWidth, 
        pdfHeight, 
        undefined, 
        'FAST'
      );
      
      return pdf;
      
    }).then((docResult) => {

      this.convertiloEnBase64(docResult);
      
      /** Nombre del documento que se descargara */
      docResult.save(`${ this.title +"_" + new Date().toISOString()}.pdf`);
    });

    
  }

  convertiloEnBase64(docResult:any){
    /** Obtén el contenido binario del PDF con la función output de JsPDF: */
      // ... agrega contenido al PDF
      const pdfData = docResult.output('datauristring');

      //Convierte el contenido binario en una cadena base64:
      const base64 = btoa(pdfData);

      //Almacena el contenido base64 en un objeto JSON:
      const json = { pdfData: base64 };

      console.log("JSON = ",json);

      this.decodificarUnBase64(json);
      
      


      // Ahora puedes almacenar este objeto JSON en MongoDB 
      // usando una operación de inserción. También puedes 
      // enviar este objeto a una API para su almacenamiento 
      // en la base de datos.
      

      // Cuando necesites recuperar el PDF desde la base de datos, 
      // simplemente convierte el contenido base64 en una cadena 
      // binaria y crea un nuevo objeto JsPDF con ese contenido.



  }

  decodificarUnBase64(json:any){
    //decodificando la base64
    const pdfData = atob(json.pdfData);
    console.log("Retorno = ",pdfData);
    


    const pdf = new jsPDF('p', 'pt', 'a4');
    pdf.save('documentoDecodificado.pdf');


    // Or open the PDF file in a new tab
    var blobUrl = URL.createObjectURL(json.pdfData);
    window.open(blobUrl);
   
  }


}
