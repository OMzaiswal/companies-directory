
interface Props {
    page: number;
    setPage: (val: number) => void;
    itemsPerPage: number;
    totalItems: number;
}

export const Pagination = ({
    page,
    setPage,
    itemsPerPage,
    totalItems
}: Props) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage); 

    return (
        <div className="flex gap-2 text-lg mt-4">
            <button
                disabled={page === 1}
                onClick={() => setPage(page-1)}
                className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            >
                prev
            </button>
            {[...Array(totalPages)].map((_, idx) => (
                <button
                    onClick={() => setPage(idx+1)}
                    className={`px-3 py-1 rounded ${page === idx + 1 ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                >
                    {idx + 1}
                </button>
            ))}
            <button
                disabled={page === totalPages}
                onClick={() => setPage(page+1)}
                className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            >
                next
            </button>
        </div>
    )
}