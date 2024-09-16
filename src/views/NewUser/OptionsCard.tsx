import { Dispatch } from 'react';
import { Values } from '../../constants/enums';
import { cardOptions } from '../../mock';
import Card from './card';
import './NewUser.css'

type Props = {
  selectedOptions: Values|undefined;
  setSelectedOptions: Dispatch<React.SetStateAction<Values>>;
};

const OptionsCard = ({selectedOptions,setSelectedOptions}: Props) => { 
  return (
    <div className="optionsCard">
      {cardOptions.map((option) => (
        <Card
          id={option.id}
          setSelectedOptions={setSelectedOptions}
          selectedOptions={selectedOptions}
          key={option.id}
          title={option.name}
          description={option.description}
          label={option.label}
          icon={option.icon}
        />
      ))}
    </div>
  );
}

export default OptionsCard