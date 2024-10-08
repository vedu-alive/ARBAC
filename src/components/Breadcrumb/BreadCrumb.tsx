import { Breadcrumb } from "antd"
import { useLocation, useNavigate } from "react-router-dom";
import Separator from '@/assets/breadcrumbSeparator.svg';
import './Breadcrumb.css'
import { useDispatch } from "react-redux";
import { reset } from "@/redux/slices/Administration/users";
import { AppDispatch } from "@/types";
const BreadCrumb = () => {
    const data = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const paths = data.pathname.trim().split("/").filter((path) => path !== '');
    const handleBreadcumbClick = (value: string) => {
      dispatch(reset());
        let navAddress = "";
        for (let i = 0; i < paths.length; i++) {
            navAddress += "/" + paths[i];
            if (value == paths[i]) break;
        }
        navigate(navAddress);
    }
    
  return (
    <div>
        <Breadcrumb separator={<Separator/>}>
          {paths.map((path, index) => {
            if (path) {
              let title;
              if (path === "role-administration")
                title = "role & Administration";
                path.includes('-') ? title = path.replace('-', '  ') : title = path;
              return <Breadcrumb.Item key={index} onClick={() => { handleBreadcumbClick(path);  console.log(path,"path");
              }}  className="breadcrumb-typo">{title.toString()}</Breadcrumb.Item>
            }
          })}
        </Breadcrumb>
    </div>
  )
}

export default BreadCrumb;