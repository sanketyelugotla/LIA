// SectionTitle.js
const SectionTitle = ({ children, className = '' }) => (
    <h3 className={`text-4xl text-[#333333] mb-8 pb-2 ${className}`}>
        {children}
    </h3>
);

export default SectionTitle;