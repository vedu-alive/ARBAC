import { Dispatch, useEffect, useState } from "react";
import "./NewUser.css";
import { Checkbox } from "antd";
import { Values } from "../../constants/enums";

type Props = {
  selectedOptions: Values | undefined;
  setSelectedOptions: Dispatch<React.SetStateAction<Values>>;
  title: string;
  description: string;
  label: string;
  icon: JSX.Element;
  id: Values.createType | Values.inviteType;
};

const Card = ({
  description,
  icon,
  label,
  selectedOptions,
  title,
  id,
  setSelectedOptions,
}: Props) => {
  const [selected, setSelected] = useState(false);
  const handleCardClick = () => {
    setSelectedOptions(id);
  };
  useEffect(() => {
    if (selectedOptions === id) {
      setSelected(true);
    } else {
      setSelected(false);
    }
  }, [selectedOptions, id]);

  return (
    <div className={`card ${selected && "selected"}`} onClick={handleCardClick}>
      <div>
        {icon}
        <p>{title}</p>
        <p>{description}</p>
      </div>
      <Checkbox rootClassName="selected-options-symbol" checked={selected} />
      <div>{label}</div>
    </div>
  );
};

export default Card;
