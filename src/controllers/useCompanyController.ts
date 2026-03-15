'use client';

import { useState } from 'react';
import { CompanyData, initialCompanyData, validateCompanyData } from '../models/CompanyModel';

// Basic CNPJ mask formatting
const formatCNPJ = (value: string) => {
  return value
    .replace(/\D/g, '')
    .replace(/^(\d{2})(\d)/, '$1.$2')
    .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/\.(\d{3})(\d)/, '.$1/$2')
    .replace(/(\d{4})(\d)/, '$1-$2')
    .substring(0, 18);
};

// Monetary mask formatting (BRL)
const formatCurrency = (value: string) => {
  let numericValue = value.replace(/\D/g, '');
  if (!numericValue) return '';
  
  const numberValue = parseInt(numericValue, 10) / 100;
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(numberValue);
};

export const useCompanyController = () => {
  const [data, setData] = useState<CompanyData>(initialCompanyData);
  const [errors, setErrors] = useState<Partial<Record<keyof CompanyData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: keyof CompanyData, value: string) => {
    // Apply basic mask for CNPJ to improve UX
    let processedValue = value;
    if (field === 'cnpj') {
      processedValue = formatCNPJ(value);
    } else if (field === 'companyName') {
      // Converte tudo para maiúsculo diretamente, o que lida corretamente com acentos (ex: ã -> Ã)
      processedValue = value.toUpperCase();
    } else if (field === 'hourlyValue' || field === 'dailyValue' || field === 'additionalHourlyValue') {
      processedValue = formatCurrency(value);
    }

    setData((prev) => ({ ...prev, [field]: processedValue }));
    
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const addServiceDescription = () => {
    setData((prev) => ({
      ...prev,
      serviceDescriptions: [...(prev.serviceDescriptions || []), ''],
    }));
  };

  const removeServiceDescription = (index: number) => {
    setData((prev) => ({
      ...prev,
      serviceDescriptions: prev.serviceDescriptions.filter((_, i) => i !== index),
    }));
  };

  const handleServiceDescriptionChange = (index: number, value: string) => {
    setData((prev) => {
      const next = [...(prev.serviceDescriptions || [])];
      next[index] = value;
      return { ...prev, serviceDescriptions: next };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationErrors = validateCompanyData(data);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API network request
      await new Promise((resolve) => setTimeout(resolve, 800));
      
      // Generate PDF based on the provided data
      try {
        const { generateQuotePDF } = await import('../utils/pdfGenerator');
        await generateQuotePDF(data);
      } catch (pdfErr) {
        console.error('Failed to generate PDF', pdfErr);
      }

      alert(`Empresa "${data.companyName}" (CNPJ: ${data.cnpj}) salva com sucesso! O orçamento foi gerado.`);
      setData(initialCompanyData); 
    } catch (error) {
      console.error(error);
      alert('Ocorreu um erro ao salvar os dados.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    data,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    addServiceDescription,
    removeServiceDescription,
    handleServiceDescriptionChange,
  };
};
