export type ContractType = 'hourly' | 'daily' | 'both' | '';

export interface CompanyData {
  cnpj: string;
  companyName: string;
  contractType: ContractType;
  hourlyValue: string;
  dailyValue: string;
  additionalHourlyValue: string;
}

export const initialCompanyData: CompanyData = {
  cnpj: '',
  companyName: '',
  contractType: 'both',
  hourlyValue: '',
  dailyValue: '',
  additionalHourlyValue: '',
};

export const validateCompanyData = (data: CompanyData) => {
  const errors: Partial<Record<keyof CompanyData, string>> = {};
  
  if (!data.cnpj.trim()) {
    errors.cnpj = "CNPJ é obrigatório.";
  } else if (data.cnpj.replace(/\D/g, '').length !== 14) {
    errors.cnpj = "CNPJ deve conter 14 dígitos.";
  }

  if (!data.companyName.trim()) {
    errors.companyName = "Nome da empresa é obrigatório.";
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
