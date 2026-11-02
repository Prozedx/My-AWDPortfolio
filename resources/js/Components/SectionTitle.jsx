export default function SectionTitle({ id, className, children }) {
    return (
        <h2 id={id} className={className}>
            {children}
        </h2>
    );
}
