import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
    return (
        <div>
            <nav class="bg-slate-300 border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900">
                <div class="container flex flex-wrap items-center justify-between mx-auto">
                    <a href="#" class="flex items-center">
                        <img height='auto' src="/event logo.png" class="h-6 mr-3 sm:h-9" alt="Not working Logo" />
                        <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Event Tech</span>
                    </a>
                    <button data-collapse-toggle="navbar-default" type="button" class="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
                        <span class="sr-only">Open main menu</span>
                        <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
                    </button>
                    <div class="hidden w-full md:block md:w-auto" id="navbar-default">
                        <ul class="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            <li>
                                <a href="#" class="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Admin</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar

// components/layout/Navbar.tsx
// import React from "react";
// import classNames from "classnames";
// type Props = {
//   onMenuButtonClick(): void;
// };
// const Navbar = (props: Props) => {
//   return (
//     <nav
//       className={
//         "bg-white text-zinc-500 flex items-center w-full fixed z-10 px-4 shadow-sm h-16"
//       }
//     >
//       <div className="font-bold text-lg">My Logo</div>
//       <div className="flex-grow"></div> {/** spacer */}
//       <button className="md:hidden" onClick={props.onMenuButtonClick}>
        
//       </button>
//     </nav>
//   );
// };
// export default Navbar;



// import React, { useState } from 'react';
// // import SearchModal from './header/SearchModal';
// // import Notifications from './header/Notifications';
// // import Help from './header/Help';
// // import UserMenu from './header/UserMenu';

// function Navbar({
//   sidebarOpen,
//   setSidebarOpen
// }) {

//   // const [searchModalOpen, setSearchModalOpen] = useState(false)

//   return (
//     <header className="sticky top-0 bg-white border-b border-slate-200 z-30">
//       <div className="px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-16 -mb-px">

//           {/* Header: Left side */}
//           <div className="flex">

//             {/* Hamburger button */}
//             <button
//               className="text-slate-500 hover:text-slate-600 lg:hidden"
//               aria-controls="sidebar"
//               aria-expanded={sidebarOpen}
//               onClick={(e) => { e.stopPropagation(); setSidebarOpen(!sidebarOpen); }}
//             >
//               <span className="sr-only">Open sidebar</span>
//               <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                 <rect x="4" y="5" width="16" height="2" />
//                 <rect x="4" y="11" width="16" height="2" />
//                 <rect x="4" y="17" width="16" height="2" />
//               </svg>
//             </button>

//           </div>

//           {/* Header: Right side */}
//           {/* <div className="flex items-center">

//             <button
//               className={`w-8 h-8 flex items-center justify-center bg-slate-100 hover:bg-slate-200 transition duration-150 rounded-full ml-3 ${searchModalOpen && 'bg-slate-200'}`}
//               onClick={(e) => { e.stopPropagation(); setSearchModalOpen(true); }}
//               aria-controls="search-modal"
//             >
//               <span className="sr-only">Search</span>
//               <svg className="w-4 h-4" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
//                 <path className="fill-current text-slate-500" d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z" />
//                 <path className="fill-current text-slate-400" d="M15.707 14.293L13.314 11.9a8.019 8.019 0 01-1.414 1.414l2.393 2.393a.997.997 0 001.414 0 .999.999 0 000-1.414z" />
//               </svg>
//             </button>
//             {/* <SearchModal id="search-modal" searchId="search" modalOpen={searchModalOpen} setModalOpen={setSearchModalOpen} />
//             <Notifications />
//             <Help /> */}
//             {/*  Divider */}
//             {/* <hr className="w-px h-6 bg-slate-200 mx-3" /> */}
//             {/* <UserMenu /> */}

//           {/* </div> */}

//         </div>
//       </div>
//     </header>
//   );
// }

// export default Navbar;