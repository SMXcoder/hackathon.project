function Nav(){
    return(
        <body>
            
         <nav class="navbar">
    <div class="logo">StockTracker</div>
    <div class="nav-links">
      <a href="#">Home</a>
      <a href="#">Live Stocks</a>
      <a href="#">Analytics</a>
    </div>
    <div class="search">
      <input type="text" placeholder="Search Symbol (e.g., AAPL)" />
      <div class="profile-icon">S</div>
    </div>
  </nav>
  </body> 
    );
}
export default Nav