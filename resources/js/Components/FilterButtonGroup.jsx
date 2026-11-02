export default function FilterButtonGroup({
    options,
    value,
    onChange,
    label,
    buttonClassName = '',
}) {
    return (
        <div
            className="flex flex-wrap justify-center gap-2"
            role="group"
            aria-label={label}
        >
            {options.map((option) => {
                const isSelected = value === option.value;

                return (
                    <button
                        key={option.value === null ? 'all-filter' : option.value}
                        className={`rounded-md px-4 py-2 text-base ${
                            isSelected
                                ? 'bg-[#c9dafa] shadow-sm'
                                : 'bg-[#edf2fa]'
                        } ${buttonClassName}`}
                        type="button"
                        data-filter={option.value ?? 'all'}
                        aria-pressed={isSelected}
                        onClick={() => onChange(option.value)}
                    >
                        {option.label}
                    </button>
                );
            })}
        </div>
    );
}
