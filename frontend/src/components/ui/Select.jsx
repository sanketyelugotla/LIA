const Select = ({
    label,
    value,
    onChange,
    options = [],
    required = false,
    className = '',
    disabled = false,
    error = null,
    ...props
}) => {
    return (
        <div className={`space-y-1 ${className}`}>
            {label && (
                <label className={`block text-sm font-medium ${error ? 'text-red-600' : 'text-gray-700'}`}>
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}

            <select
                value={value}
                onChange={onChange}
                required={required}
                disabled={disabled}
                className={`block w-full px-3 py-2 border ${error ? 'border-red-300' : 'border-gray-300'
                    } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'
                    }`}
                {...props}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>

            {error && (
                <p className="mt-1 text-sm text-red-600">{error}</p>
            )}
        </div>
    );
};

export default Select;