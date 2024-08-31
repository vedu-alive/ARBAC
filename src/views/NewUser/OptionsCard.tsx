import CreateUserIcon from '../../assets/createUser.svg';
import InviteUser from '../../assets/inviteUser.svg';
import Card from './card';
import './NewUser.css'

type Props = {selectedOptions:string[]}
const options = [
    {
        id: "1",
        name: "Create user",
        description:"Create a new user in your organization.\n This user will have a user name like alice@acme.com.",
        label: "I want to create users in bulk",
        icon: <CreateUserIcon />,
    },
    {
        id: "2",
        name: "Invite user",
        description: "Invite a guest to collaborate!\nSend an email and they can accept to join.",
        label: "I want to invite users in bulk",
        icon: <InviteUser />,
    }
];
const OptionsCard = ({selectedOptions}: Props) => { 
  return (
    <div className='optionsCard'>
          {
              options.map((option) => (
                <Card
                    id={option.id}
                    selectedOptions={selectedOptions}
                    key={option.id}
                    title={option.name}
                    description={option.description}
                    label={option.label}
                    icon={option.icon}
                />
              ))
        }
    </div>
  )
}

export default OptionsCard