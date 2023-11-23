"use client"

const StripeButton = () => {
    const balloonClass = 'bg-blue-500 text-white'

    return (
      <>

        <div className="flex items-center justify-between border-b p-2">

          <div className="flex items-center">
            <img className="rounded-full w-10 h-10"
              src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" />
            <div className="pl-2">
              <div className="font-semibold">
                <a className="hover:underline" href="#">John Doe</a>
              </div>
              <div className="text-xs text-gray-600">Online</div>
            </div>
          </div>

          <div>
            <a className="inline-flex hover:bg-indigo-50 rounded-full p-2" href="#">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
            </a>

            <button className="inline-flex hover:bg-indigo-50 rounded-full p-2" type="button">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

        </div>
        <div className="flex items-center mb-4">
          <div className="flex-none flex flex-col items-center space-y-1 mr-4">
            <img className="rounded-full w-10 h-10"
              src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" />
            <a href="#" className="block text-xs hover:underline">John Doe</a>
          </div>
          <div className="flex-1 bg-indigo-400 text-white p-2 rounded-tl-lg rounded-tr-lg rounded-br-lg   mb-2 relative">
            <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</div>

            <div className="absolute left-[-6px] bottom-[1.5px] transform rotate-[135deg] translate-x-1/2 w-2 h-2 bg-indigo-400"></div>

          </div>
          <div className={`max-w-md mx-2 my-1 ml-auto`}>
            <div className={`relative py-2 px-4 ${balloonClass} rounded-lg`}>
              <div
                className={`absolute left-full ml-1 -top-1 w-0 h-0 border-6 border-solid border-transparent border-blue-500border-gray-200`}
              ></div>
              <p className="mb-0">Texto</p>
            </div>
          </div>

        </div>

      </>
    );
  };

  export default StripeButton;
