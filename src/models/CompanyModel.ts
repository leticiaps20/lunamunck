export type ContractType = 'hourly' | 'daily' | 'both' | '';

export interface CompanyData {
  cnpj: string;
  companyName: string;
  contractType: ContractType;
  hourlyValue: string;
  dailyValue: string;
  additionalHourlyValue: string;
  serviceDescriptions: string[];
}

export const initialCompanyData: CompanyData = {
  cnpj: '',
  companyName: '',
  contractType: 'both',
  hourlyValue: '',
  dailyValue: '',
  additionalHourlyValue: '',
   serviceDescriptions: [],
};

export const validateCompanyData = (data: CompanyData) => {
  const errors: Partial<Record<keyof CompanyData, string>> = {};
  
  const cnpjDigits = data.cnpj.replace(/\D/g, '');
  if (cnpjDigits && cnpjDigits.length !== 14) {
    errors.cnpj = "CNPJ deve conter 14 dígitos ou ficar em branco.";
  }

  if (!data.contractType) {
    errors.contractType = "O tipo de serviço é obrigatório.";
  }

  if (data.contractType === 'hourly' || data.contractType === 'both') {
    if (!data.hourlyValue.trim()) {
      errors.hourlyValue = "O valor por hora é obrigatório.";
    }
  }

  if (data.contractType === 'daily' || data.contractType === 'both') {
    if (!data.dailyValue.trim()) {
      errors.dailyValue = "O valor por diária é obrigatório.";
    }
  }

  if (!data.additionalHourlyValue.trim()) {
    errors.additionalHourlyValue = "O valor por hora adicional é obrigatório.";
  }

  return errors;
};
