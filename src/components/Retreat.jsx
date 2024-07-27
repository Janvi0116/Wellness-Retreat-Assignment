
import './Retreat.css';

// eslint-disable-next-line react/prop-types
function Retreat({ image, title, description, date, location, price }) {
  return (
    <div className="retreat-box">
      <img src={image} alt={title} className="retreat-image" />
      <div className="retreat-info">
        <h2>{title}</h2>
        <p>{description}</p>
        <p>Date: {date}</p>
        <p>Location: {location}</p>
        <p>Price: {price}</p>
      </div>
    </div>
  );
}

export default Retreat;