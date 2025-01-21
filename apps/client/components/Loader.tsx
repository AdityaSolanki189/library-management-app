// If using TypeScript, you might want to add type definition:
interface LoaderProps {
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

const Loader = ({ size = 'md', className = '' }: LoaderProps) => {
    const sizeClasses = {
        sm: 'h-6 w-6',
        md: 'h-8 w-8',
        lg: 'h-10 w-10',
    };

    return (
        <div
            className={`inline-block animate-[spinner-grow_0.75s_linear_infinite] rounded-full bg-current align-[-0.125em] text-primary opacity-0 motion-reduce:animate-[spinner-grow_1.5s_linear_infinite] ${sizeClasses[size]} ${className}`}
        >
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                Loading...
            </span>
        </div>
    );
};

export default Loader;
