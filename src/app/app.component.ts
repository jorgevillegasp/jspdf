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

  base64 = "";
  title = 'JsPDF';

  
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

      this.almacenamosElPDFenUnJson(img);
      
      return pdf;
      
    }).then((docResult) => {
      //this.convertiloEnBase64(docResult);
      /** Nombre del documento que se descargara */
      docResult.save(`${ this.title +"_" + new Date().toISOString()}.pdf`);
      
    });

    
  }

  almacenamosElPDFenUnJson(img:any){
    let objetoJSON = {
      pdf: img,
    };

    this.decodificarUnBase64(objetoJSON);
  }


  decodificarUnBase64(Json:any){

    const img = Json.pdf;

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
      pdf.save("download.pdf"); 
  }


}
