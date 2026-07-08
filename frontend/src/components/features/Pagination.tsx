import Button from "../base/Button";

interface PaginationProps {
    total: number;
    skip: number;
    limit: number;

    onPrevious: () => void;
    onNext: () => void;
}

export default function Pagination({
    total,
    skip,
    limit,
    onPrevious,
    onNext,
}: PaginationProps) {

    const currentPage = Math.floor(skip / limit) + 1;

    const totalPages = Math.ceil(total / limit);

    return (

        <div className="pagination">
            <Button
                variant="secondary"
                disabled={currentPage === 1}
                onClick={onPrevious}
            >
                Previous
            </Button>

            <span>
                Page {currentPage} of {totalPages}
            </span>

            <Button
                variant="secondary"
                disabled={currentPage === totalPages}
                onClick={onNext}
            >
                Next
            </Button>
        </div>
    );
}