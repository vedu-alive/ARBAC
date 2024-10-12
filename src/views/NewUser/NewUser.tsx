import { useState } from "react";
import NewUserBody from "./NewUserBody";
import NewUserHeader from "./NewUserHeader";
import NewUserBodySecond from "./NewUserBodySecond";
import "./NewUser.css";
const NewUser = () => {
  const [current, setCurrent] = useState(1);
  return (
    <div className="new-user">
      <NewUserHeader current={current} setCurrent={setCurrent} />
      {current === 1 && (
        <NewUserBody current={current} setCurrent={setCurrent} />
      )}
      {current === 2 && (
        <NewUserBodySecond current={current} setCurrent={setCurrent} />
      )}
    </div>
  );
};

export default NewUser;
