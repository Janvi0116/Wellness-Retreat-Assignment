export const fetchRetreats = async (page = 1, limit = 5, search = null, date = null, type = null) => {
    let formattedDate;
    if(date){
      const timestamp = new Date(date).getTime();
      formattedDate = Math.floor(timestamp / (1000));
    }
    try {
      const queryParams = new URLSearchParams({
        page,
        limit,
        ...search && {search},
        ...date && {date : formattedDate},
        ...type && {filter:type}
      }).toString();

      const response = await fetch(`https://669f704cb132e2c136fdd9a0.mockapi.io/api/v1/retreats?${queryParams}`);
      if(response.status === 404){
        return { status : "No Data Found"}
      }
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching retreats:', error);
      throw error;
    }
  };