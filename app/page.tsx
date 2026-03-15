'use client';

import { useCompanyController } from '../src/controllers/useCompanyController';
import { CompanyFormView } from '../src/views/CompanyFormView';

export default function Home() {
  const { 
    data, 
    errors, 
    isSubmitting, 
    handleChange, 
    handleSubmit,
    addServiceDescription,
    removeServiceDescription,
    handleServiceDescriptionChange,
  } = useCompanyController();

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center text-zinc-900">
          <h1 className="text-3xl font-extrabold tracking-tight pb-2">Luna Munck</h1>
        </div>

        <CompanyFormView
          data={data}
          errors={errors}
          onChange={handleChange}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          onAddDescription={addServiceDescription}
          onRemoveDescription={removeServiceDescription}
          onChangeDescription={handleServiceDescriptionChange}
        />
      </div>
    </div>
  );
}
