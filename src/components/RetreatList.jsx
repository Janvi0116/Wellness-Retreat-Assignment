import { useState, useEffect } from 'react';
import Retreat from './Retreat';
import SearchBar from './SearchBar';
import Filter from './Filter';
import { fetchRetreats } from '../api/fetchRetreats';
import './RetreatList.css';

function RetreatList() {
  const [retreats, setRetreats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [date, setDate] = useState('');
  const [type, setType] = useState('');
  const [isNoDataOnCurrentPage, setNoData] = useState(false);

  useEffect(() => {
    const getRetreats = async () => {
      try {
        setIsLoading(true);
        setNoData(false);
        const data = await fetchRetreats(page, 5, search, date, type);
        if(data && data.status && data.status === "No Data Found"){
          setNoData(true);
        }
        else{
          setRetreats(data);
        }
        setIsLoading(false);
      } catch (err) {
        setError('Failed to fetch retreats');
        setIsLoading(false);
      }
    };

    getRetreats();
  }, [page, search, date, type]);

  const handleSearchChange = (value) => {
    setSearch(value);
    setPage(1);
  };

  const handleDateChange = (value) => {
    setDate(value);
    setPage(1);
  };

  const handleTypeChange = (value) => {
    setType(value);
    setPage(1);
  };

  return (
    <div className="retreat-container">
      { isLoading && <div>Loading...</div> }
      { error && <div>{error}</div>}
      { isNoDataOnCurrentPage && <div id = "noResults">No data found</div>}
      {!(isLoading || error) && <>
          <div className="search-filter-container">
          <SearchBar currentSearchValue =  {search} onSubmit={handleSearchChange} />
            <Filter
              date={date}
              onDateChange={handleDateChange}
              type={type}
              onTypeChange={handleTypeChange}
          />
          </div>
          {
            !isNoDataOnCurrentPage && <div className="retreat-grid">
              {retreats.map(retreat => (
                <Retreat key={retreat.id} {...retreat} />
              ))}
            </div>
          }
          <div className="pagination">
            <button onClick={() => setPage(prev => Math.max(prev - 1, 1))} disabled={page === 1}>
              Previous
            </button>
            <span id = "currentPage">Current Page {page}</span>
            <button onClick={() => setPage(prev => prev + 1)} disabled={retreats.length < 5}>
              Next
            </button>
          </div>
        </>
      }
    </div>
  );
}

export default RetreatList;