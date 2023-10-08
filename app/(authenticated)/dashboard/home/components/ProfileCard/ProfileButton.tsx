
import {Button} from 'flowbite-react'


interface ProfileButtonProps{
    name: string;
    action: () => void;
    color: string;
}
export default function ProfileButton({name, action}: ProfileButtonProps){
    return (
        <Button 
            onClick={action}
            >
                {name}
        </Button>
    )


}