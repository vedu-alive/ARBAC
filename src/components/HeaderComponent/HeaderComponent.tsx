import { Input } from 'antd';
import './HeaderComponent.css';
import SearchIcon from "../../assets/dashboardSearchIcon.svg";
import NotificationIcon from "../../assets/NotificationIcon.svg";
import HelpIcon from "../../assets/helpIcon.svg";
const HeaderComponent = () => {
    return (
      <div className="headerComponent">
        <div/>
        <Input placeholder="Global Search" prefix={<SearchIcon />} className='header-search' />
        <div className='header-rightt-btns'>
          <HelpIcon/>
          <NotificationIcon />
        </div>
      </div>
    );
}

export default HeaderComponent;