import { jsPDF } from 'jspdf';
import { CompanyData } from '../models/CompanyModel';

export const generateQuotePDF = async (data: CompanyData) => {
  const doc = new jsPDF();
  
  // Load Logo
  const logoUrl = '/logo.png';
  
  try {
    const response = await fetch(logoUrl);
    const blob = await response.blob();
    const imgData = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
    
    // Original dimensions are 400x194. Aspect ratio ~ 2.06
    // Width 60, height ~ 29.1
    doc.addImage(imgData, 'PNG', 20, 12, 60, 29.1);
  } catch (error) {
    console.warn("Could not load logo image for PDF", error);
  }

  const pageWidth = doc.internal.pageSize.getWidth();
  const rightMargin = 20;
  
  // Right side text (Left-aligned column on the right side)
  const rightColumnX = 105;
  
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text('Luna Multi Service Ltda', rightColumnX, 22);
  
  doc.setFontSize(12);
  doc.text('CNPJ 07.287.119/0001-36', rightColumnX, 30);
  doc.text('(62) 9 8212-2525', rightColumnX, 38);

  // Add horizontal line
  let yPos = 48;
  doc.setLineWidth(0.5);
  doc.line(20, yPos, pageWidth - rightMargin, yPos);
  
  yPos += 10;
  
  // Contratante Info
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text(`Contratante: ${data.companyName}`, 20, yPos);
  yPos += 6;
  doc.text(`CNPJ: ${data.cnpj}`, 20, yPos);

  yPos += 8;
  // Add second horizontal line
  doc.line(20, yPos, pageWidth - rightMargin, yPos);
  yPos += 12;

  // Title
  doc.setFontSize(16);
  doc.text('Orçamento', pageWidth / 2, yPos, { align: 'center' });
  yPos += 16;

  // Body
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text('Serviço a ser contratado:', 20, yPos);
  doc.setFont("helvetica", "normal");
  yPos += 8;
  doc.text('Locação de caminhão Munck, com operador, para realização de transporte.', 20, yPos);
  yPos += 12;
  
  doc.text('\u2022 Medição do período se inicia e se encerra na nossa base.', 20, yPos);
  yPos += 20;

  doc.setFont("helvetica", "bold");
  doc.text('Valores:', 20, yPos);
  doc.setFont("helvetica", "normal");
  yPos += 12;

  if (data.contractType === 'hourly') {
    doc.text(`\u2022 Valor por hora: ${data.hourlyValue}, sendo o mínimo de 4 horas`, 20, yPos);
    yPos += 12;
  } else if (data.contractType === 'daily') {
    doc.text(`\u2022 Valor por diária: ${data.dailyValue}`, 20, yPos);
    yPos += 12;
  } else if (data.contractType === 'both') {
    doc.text(`\u2022 Valor por hora: ${data.hourlyValue}, sendo o mínimo de 4 horas`, 20, yPos);
    yPos += 12;
    doc.text(`\u2022 Valor por diária: ${data.dailyValue}`, 20, yPos);
    yPos += 12;
  }
  
  doc.text(`\u2022 Caso necessário, será cobrado ${data.additionalHourlyValue} por hora adicional.`, 20, yPos);
  yPos += 40;

  doc.setFont("helvetica", "bold");
  doc.text('Valores para pagamento à vista.', pageWidth / 2, yPos, { align: 'center' });
  yPos += 12;
  doc.text('Orçamento válido por 3 dias', pageWidth / 2, yPos, { align: 'center' });

  // Save the PDF
  doc.save(`Orcamento_${data.companyName.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`);
};
