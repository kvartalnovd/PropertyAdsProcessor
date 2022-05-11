import { useLocation } from "react-router-dom";

function NoMatchPage() {
    let location = useLocation();
  
    return (
        <section className="section">

        
      <div className="__container">
        <h3>
          No match for <code>{location.pathname}</code>
        </h3>
      </div>
      </section>
    );
  }

export default NoMatchPage