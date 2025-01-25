const Loader = () => {
    return (
        <div className="h-max w-full flex justify-center items-center place-items-center">
            <div
                className="animate-spin inline-block size-16 border-[3px] border-current border-t-transparent text-primary rounded-full"
                role="status"
                aria-label="loading"
            >
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    );
};

export default Loader;
