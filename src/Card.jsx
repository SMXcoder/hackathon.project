import React, { useState } from 'react';
function Card(){
    const [isExpanded, setIsExpanded] = useState(false);

  const handleClick = () => {
    setIsExpanded(!isExpanded);
  };

    return(
<p >
 

  <div className={`card-container ${isExpanded ? 'fullscreen':'' }`}
  onClick={handleClick} >
   
    <div className="card-title">AAPL</div>
    <div className="card-price">$192.58</div>
    <div className="card-chart">Live Chart Here</div>
  </div>
    
  
</p>

    );
} 
export default Card