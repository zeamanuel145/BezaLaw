import { ValidationError } from '@/lib/validation';

interface FormErrorsProps {
  errors: ValidationError[];
  fieldName?: string;
}

export function FormErrors({ errors, fieldName }: FormErrorsProps) {
  const fieldErrors = fieldName
    ? errors.filter(error => error.field === fieldName)
    : errors;

  if (fieldErrors.length === 0) return null;

  if (fieldName) {
    // Single field error display
    return (
      <p className="text-sm text-red-600 mt-1">
        {fieldErrors[0].message}
      </p>
    );
  }

  // Multiple errors display
  return (
    <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
      <h3 className="text-sm font-medium text-red-800 mb-2">
        Please fix the following errors:
      </h3>
      <ul className="space-y-1">
        {fieldErrors.map((error, index) => (
          <li key={index} className="text-sm text-red-700">
            <span className="font-medium">{error.field}:</span> {error.message}
          </li>
        ))}
      </ul>
    </div>
  );
}
