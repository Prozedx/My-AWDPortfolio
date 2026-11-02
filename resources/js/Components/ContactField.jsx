const inputClassName =
    'min-w-0 rounded-md border border-gray-800 bg-white px-4 py-3 text-base placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400';

export default function ContactField({
    id,
    label,
    name = id,
    type = 'text',
    as = 'input',
    className = '',
    ...props
}) {
    const Field = as;

    return (
        <>
            <label className="sr-only" htmlFor={id}>
                {label}
            </label>
            <Field
                className={`${inputClassName} ${className}`}
                id={id}
                name={name}
                type={as === 'input' ? type : undefined}
                {...props}
            />
        </>
    );
}
