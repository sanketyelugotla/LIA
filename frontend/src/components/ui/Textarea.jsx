const Textarea = ({ label, value, onChange, rows = 4, required = false }) => {
    return (
        <div className="flex flex-col space-y-1">
            {label && (
                <label className="text-sm font-medium text-gray-700">
                    {label}
                </label>
            )}
            <textarea
                value={value}
                onChange={onChange}
                rows={rows}
                required={required}
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
            />
        </div>
    );
};

export default Textarea;
