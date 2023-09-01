import ExcelJS from 'exceljs';

async function generarArchivoExcel() {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Sample Sheet');

  worksheet.columns = [
    { header: 'Nombre', key: 'nombre', width: 20 },
    { header: 'Edad', key: 'edad', width: 10 },
  ];

  worksheet.addRow({ nombre: 'Juan', edad: 25 });
  worksheet.addRow({ nombre: 'María', edad: 30 });
  worksheet.addRow({ nombre: 'Carlos', edad: 40 });

  await workbook.xlsx.writeFile('archivo.xlsx');
  console.log('Archivo creado exitosamente.');
}

generarArchivoExcel().catch((error) => {
  console.error('Error al generar el archivo:', error);
});