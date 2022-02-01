import { UilSetting, UilBell } from "@iconscout/react-unicons";


function Header(props) {
  return (
    <div className="row-container">
      <div>
        <h1 className="title">{props.title}</h1>
        <h2 className="subtitle">{props.subtitle}</h2>
      </div>
      
      <div>
        <button><UilSetting size="30" color="#000" /></button>
        <button><UilBell size="30" color="#000" /></button>
      </div>
    </div>
  );
}


export default Header;