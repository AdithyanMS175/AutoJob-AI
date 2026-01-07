const InputGroup = ({ label, placeholder, type = "text" }) => (
    <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300">{label}</label>
        <input
            type={type}
            placeholder={placeholder}
            className="w-full bg-[#161616] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all placeholder:text-gray-600"
        />
    </div>
);

export default InputGroup