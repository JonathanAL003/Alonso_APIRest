import ExcelJS from 'exceljs';

async function generarArchivoExcel() {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Sample Sheet');

  worksheet.columns = [
    { header: 'Nombre', key: 'nombre', width: 20 },
    { header: 'Edad', key: 'edad', width: 10 },
  ];

  worksheet.addRow({ nombre: 'Jonathan', edad: 21 });
  worksheet.addRow({ nombre: 'Liliana', edad: 22 });
  worksheet.addRow({ nombre: 'Fernando', edad: 21 });

  await workbook.xlsx.writeFile('archivo.xlsx');
  console.log('Archivo creado exitosamente.');
}

generarArchivoExcel().catch((error) => {
  console.error('Error al generar el archivo:', error);
});