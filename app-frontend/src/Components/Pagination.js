const Pagination = (props) => {
    const {handlePageChange,totalPages}=props
    const pageNumbers = [];
  
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  
    return (
      <nav>
        <ul className="pagination">
          {pageNumbers.map((pageNumber) => (
            <li key={pageNumber} className="page-item">
              <button
                className="page-link"
                onClick={() => handlePageChange(pageNumber)}
              >
                {pageNumber}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    )
  }
  export default Pagination
  