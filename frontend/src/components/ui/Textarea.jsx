const Textarea = ({ label, value, onChange, ...props }) => {
    return (
        <div className="space-y-1">
            {label && <label className="block text-sm font-medium text-gray-700">{label}</label>}
            <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                value={value}
                onChange={onChange}
                {...props}
            />
        </div>
    );
  };