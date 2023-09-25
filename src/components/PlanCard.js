import "./PlanStyles.css";

export const PlanCard = (props) => {
  return (
    <div className="p-card">
      <div className="p-image">
        <img src={props.image} alt="trip" />
      </div>
      <div className="texts">
        <h4 style={{ textAlign: "center" }}>{props.heading}</h4>
        <p style={{ marginBottom: "10px", textIndent: "8px" }}>{props.text}</p>
        <p style={{ textIndent: "5px" }}>{props.secondText}</p>
        <p className="price">{props.price}</p>
      </div>
    </div>
  );
};

export default PlanCard;
