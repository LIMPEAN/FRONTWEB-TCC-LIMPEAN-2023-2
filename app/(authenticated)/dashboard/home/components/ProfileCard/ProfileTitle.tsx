import { useProfileCardContext } from "./ProfileCardContext";




export default function ProfileTitle(){
    const {profile} = useProfileCardContext()
    return (
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            <p>{profile.name}</p>
        </h5>
    )
}