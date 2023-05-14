import React from "react";
import "./Loading.css";

export function loadPage() {
  const loadingElement = document.querySelector(".loading-div");
  if (loadingElement.style.display == "flex") {
    loadingElement.style.display = "none";
  } else {
    loadingElement.style.display = "flex";
  }
}

const Loading = () => {
  return (
    <div className="loading-div">
      <p>Loading...</p>
    </div>
  );
};

export default Loading;
