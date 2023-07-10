import React from "react";

function LogTemplate(item) {
  const cardStyle = {
    backgroundColor: "#f2f2f2",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
    borderLeft: "2rem",
    width: "70%",
    padding:"15px"
  };
  return (
    <div style={cardStyle}>
      <div>{item.message}</div>
      <div style={{ fontSize: "14px", fontWeight: "500", right: "20px" }}>
        <span>
          {item.time} {item.date}
        </span>
      </div>
    </div>
  );
}

export default LogTemplate;
