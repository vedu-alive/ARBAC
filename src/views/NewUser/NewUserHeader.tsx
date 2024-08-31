import { useNavigate } from 'react-router-dom';
import LeftArrowIcon from '../../assets/arrowLeftIcon.svg';
import StepperDoneIcon from '../../assets/stepperDone.svg';
import StepperOneActiveIcon from '../../assets/stepperOneIconActive.svg';
import StepperTwoIcon from '../../assets/stepperTwo.svg';
import StepperTwoActiveIcon from '../../assets/stepperTwoActive.svg';
import './NewUser.css';
type NewUserHeaderProps = {
  current: number;
  setCurrent: (value: React.SetStateAction<number>) => void;
};
const NewUserHeader = ({current,setCurrent}:NewUserHeaderProps) => {
    const nav = useNavigate();
  return (
    <div className="newUser-header">
      <div className="newUserHeader-back" onClick={() => nav(-1)}>
        <LeftArrowIcon />
        {"Back to User management"}
      </div>
      <div className="stepper-container">
        <span
          onClick={() => {
            current === 2 ? setCurrent(1) : null;
          }}
          className={`${current === 1 ? "stepper-active" : "stepper-label"}`}
        >
          {current === 1 ? <StepperOneActiveIcon /> : <StepperDoneIcon />}
          {"User Detail"}
        </span>
        <span
          className={`${current === 2 ? "stepper-active" : "stepper-label"}`}
        >
          {current === 2 ? <StepperTwoActiveIcon /> : <StepperTwoIcon />}
          {"Roles & Permission"}
        </span>
      </div>
    </div>
  );
}

export default NewUserHeader