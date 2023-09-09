import { getUsers } from "./services/get-users"

interface IUserCard {
  id: string | number,
  email: string,
  first_name: string,
  last_name: string,
  avatar: string
}

export default async function UserPage() {
  const users = await getUsers();


  return (
    <>
      <h2 className="text-green-500 ">User Page</h2>
      <div className="grid min-w-fit md:grid-cols-2 xl:grid-cols-3 grid-cols-1 m-4 gap-4 bg-black ">
        {users.map((user: IUserCard) => (
          <div className="flex bg-white/70 w-96 p-4 gap-4 rounded-xl drop-shadow-sm">
            <img src={user.avatar} />
            <div className='flex flex-col'>
              <span>
                <span className="pl-4 font-bold">Name:</span> 
                  <span>
                    {user.first_name} {user.last_name}
                  </span>
              </span>
                <span className="pl-4 font-bold">email:
                  <span className="font-normal">
                    {user.email}
                  </span> 
              </span>
            </div>
          </div>

        ))}
      </div>
    </>
  )
} 