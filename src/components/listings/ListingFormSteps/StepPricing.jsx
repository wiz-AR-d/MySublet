import { DollarSign, Calendar } from 'lucide-react';

export default function StepPricing({ formData, updateFormData, errors }) {
  const today = new Date().toISOString().split('T')[0];
  const oneYearFromNow = new Date();
  oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);
  const maxDate = oneYearFromNow.toISOString().split('T')[0];

  return (
    <div className="space-y-6">
      {/* Price per Month */}
      <div>
        <label htmlFor="price_per_month" className="block text-sm font-medium text-gray-700 mb-2">
          <DollarSign className="inline w-5 h-5 mr-2" />
          Price per Month (USD) *
        </label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
            $
          </span>
          <input
            type="number"
            id="price_per_month"
            value={formData.price_per_month}
            onChange={(e) => updateFormData({ price_per_month: e.target.value })}
            placeholder="2500"
            min="1"
            className={`w-full pl-8 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.price_per_month ? 'border-red-500' : 'border-gray-300'
            }`}
          />
        </div>
        {errors.price_per_month && (
          <p className="mt-1 text-sm text-red-600">{errors.price_per_month}</p>
        )}
        <p className="mt-2 text-sm text-gray-500">
          This is the monthly rental price. Total price will be calculated based on the rental period.
        </p>
      </div>

      {/* Availability Dates */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="available_from" className="block text-sm font-medium text-gray-700 mb-2">
            <Calendar className="inline w-5 h-5 mr-2" />
            Available From *
          </label>
          <input
            type="date"
            id="available_from"
            value={formData.available_from}
            onChange={(e) => updateFormData({ available_from: e.target.value })}
            min={today}
            max={maxDate}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.available_from ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.available_from && (
            <p className="mt-1 text-sm text-red-600">{errors.available_from}</p>
          )}
        </div>

        <div>
          <label htmlFor="available_to" className="block text-sm font-medium text-gray-700 mb-2">
            <Calendar className="inline w-5 h-5 mr-2" />
            Available To *
          </label>
          <input
            type="date"
            id="available_to"
            value={formData.available_to}
            onChange={(e) => updateFormData({ available_to: e.target.value })}
            min={formData.available_from || today}
            max={maxDate}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.available_to ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.available_to && (
            <p className="mt-1 text-sm text-red-600">{errors.available_to}</p>
          )}
        </div>
      </div>

      {/* Price Info */}
      {formData.available_from && formData.available_to && formData.price_per_month && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-blue-900 mb-2">Estimated Total</h4>
          <p className="text-sm text-blue-800">
            Based on your dates and monthly price, here's an estimate:
          </p>
          <div className="mt-2">
            <p className="text-2xl font-bold text-blue-900">
              ${(
                parseFloat(formData.price_per_month) *
                (Math.ceil(
                  (new Date(formData.available_to) - new Date(formData.available_from)) /
                    (1000 * 60 * 60 * 24 * 30)
                ) || 1)
              ).toLocaleString()}
            </p>
            <p className="text-sm text-blue-700">
              for{' '}
              {Math.ceil(
                (new Date(formData.available_to) - new Date(formData.available_from)) /
                  (1000 * 60 * 60 * 24)
              ) || 0}{' '}
              days
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

