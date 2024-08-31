import { useState } from 'react';
import './NewUser.css';
import { Checkbox } from 'antd';

type Props = {
    selectedOptions: string[];
    title: string;
    description: string;
    label: string;
    icon: JSX.Element;
    id: string;
};

const Card = ({ description, icon, label, selectedOptions, title, id }: Props) => {
    const [selected, setSelected] = useState(false);
    const handleCardClick = () => {
        if (selectedOptions.includes(id)) {
            const index = selectedOptions.indexOf(id);
            selectedOptions.splice(index, 1);
            setSelected(false);
        } else {
            selectedOptions.push(id);
            setSelected(true);
        }
    };
    
  return (
    <div className={`card ${selected && "selected"}` } onClick={handleCardClick}>
      <div>
        {icon}
        <p>{title}</p>
        <p>{description}</p>
      </div>
      <Checkbox rootClassName="selected-options-symbol" checked={selected} />
      <div>{label}</div>
    </div>
  );
}

export default Card;