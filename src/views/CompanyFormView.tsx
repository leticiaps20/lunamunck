import React from 'react';
import { CompanyData } from '../models/CompanyModel';
import { Input } from '../components/Input';
import { Select } from '../components/Select';

interface CompanyFormViewProps {
  data: CompanyData;
  errors: Partial<Record<keyof CompanyData, string>>;
  onChange: (field: keyof CompanyData, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
}

export const CompanyFormView: React.FC<CompanyFormViewProps> = ({
  data,
  errors,
  onChange,
  onSubmit,
  isSubmitting,
}) => {
  return (
    <form 
      onSubmit={onSubmit} 
      className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-gray-100"
    >
      <h2 className="text-2xl font-bold mb-6 text-gray-900 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600"><rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/></svg>
        Novo Orçamento
      </h2>
      
      <Input
        label="CNPJ"
        placeholder="Apenas números (14 dígitos)"
        value={data.cnpj}
        onChange={(e) => onChange('cnpj', e.target.value)}
        error={errors.cnpj}
        maxLength={18}
        minLength={18}
        required
      />

      <Input
        label="Nome da Empresa"
        placeholder="Razão Social ou Nome Fantasia"
        value={data.companyName}
        onChange={(e) => onChange('companyName', e.target.value)}
        error={errors.companyName}
        required
      />

      <Select
        label="Tipo de Serviço"
        value={data.contractType}
        onChange={(e) => onChange('contractType', e.target.value)}
        error={errors.contractType}
        options={[
          { value: 'both', label: 'Por Hora e Diária' },
          { value: 'hourly', label: 'Por Hora' },
          { value: 'daily', label: 'Por Diária' },
        ]}
        required
      />

      {(data.contractType === 'hourly' || data.contractType === 'both') && (
        <Input
          label="Valor por hora"
          placeholder="R$ 0,00"
          value={data.hourlyValue}
          onChange={(e) => onChange('hourlyValue', e.target.value)}
          error={errors.hourlyValue}
          maxLength={20}
          required
        />
      )}

      {(data.contractType === 'daily' || data.contractType === 'both') && (
        <Input
          label="Valor por diária"
          placeholder="R$ 0,00"
          value={data.dailyValue}
          onChange={(e) => onChange('dailyValue', e.target.value)}
          error={errors.dailyValue}
          maxLength={20}
          required
        />
      )}

      <Input
        label="Valor por hora adicional"
        placeholder="R$ 0,00"
        value={data.additionalHourlyValue}
        onChange={(e) => onChange('additionalHourlyValue', e.target.value)}
        error={errors.additionalHourlyValue}
        maxLength={20}
        required
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg shadow-sm transition-all hover:shadow focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Gerando Orçamento...' : 'Gerar Orçamento'}
      </button>
    </form>
  );
};
