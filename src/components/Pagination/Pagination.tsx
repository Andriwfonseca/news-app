import styles from "./Pagination.module.css";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  onChange,
}: PaginationProps) {
  return (
    <div className={styles.paginationContainer}>
      <button
        className={styles.paginationButton}
        disabled={currentPage === 1}
        onClick={() => onChange(1)}
      >
        {"<<"}
      </button>

      <button
        className={styles.paginationButton}
        disabled={currentPage === 1}
        onClick={() => onChange(currentPage - 1)}
      >
        {"<"}
      </button>

      <span className={styles.paginationText}>
        Página {currentPage} de {totalPages}
      </span>

      <button
        className={styles.paginationButton}
        disabled={currentPage === totalPages}
        onClick={() => onChange(currentPage + 1)}
      >
        {">"}
      </button>

      <button
        className={styles.paginationButton}
        disabled={currentPage === totalPages}
        onClick={() => onChange(totalPages)}
      >
        {">>"}
      </button>
    </div>
  );
}
