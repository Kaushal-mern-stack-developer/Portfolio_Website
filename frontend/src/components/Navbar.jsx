import { useState } from 'react'
import profile_image from '../assets/profile_image.png'
import { AiOutlineMenu } from "react-icons/ai";
import { IoCloseSharp } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { Link } from 'react-scroll';
import { useAuth } from '../context/AuthContext';
import AuthModal from './AuthModal';
import AdminPanelModal from './AdminPanelModal';


const Navbar = ({ onProjectsChanged }) => {
    const [menu,setMenu]=useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const [authOpen, setAuthOpen] = useState(false);
    const [authMode, setAuthMode] = useState('login');
    const [adminOpen, setAdminOpen] = useState(false);
    const { user, logout, isAdmin } = useAuth();

    const NavItems=[
        {
            id:1,
            name:"Home"
        },
        {
            id:2,
            name:"About"
        },
        {
            id:3,
            name:"Skills"
        },
        {
            id:4,
            name:"Projects"
        },
        {
            id:5,
            name:"Contact"
        }
    ]

    const openAuth = (mode) => {
        setAuthMode(mode);
        setAuthOpen(true);
        setProfileOpen(false);
        setMenu(false);
    };

  return (
    <>
        <div className="max-w-screen-2xl container mx-auto px-4 md:px-20 h-16 shadow-md fixed left-0 right-0 top-0 bg-white z-50">
            <div className="flex justify-between items-center h-16">
                <div className="flex space-x-2">
                    <img src={profile_image} className="h-14 w-14 rounded-full" alt="Profile Image"/>
                    <h1 className='font-semibold text-xl cursor-pointer'><span className='text-red-500'>K</span>aushal
                    <p className='text-sm text-gray-400'>Full Stack Developer</p>
                    </h1>
                </div>

                {/* Desktop Navbar */}
                <div className="hidden md:flex items-center">
                    <ul className="flex flex-row gap-5 m-5 items-center">
                        {NavItems.map((item) => (
                            <li key={item.id} className="cursor-pointer hover:scale-110 border-b-2 border-transparent hover:border-blue-300 duration-500 px-2 ">
                                <Link to={item.name}
                                smooth={true}
                                duration={500}
                                offset={-70}
                                activeClass='active'
                                >
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <div className="relative">
                        <button onClick={() => setProfileOpen(!profileOpen)} className="text-3xl text-gray-700 hover:text-black" title="Profile">
                            <FaUserCircle />
                        </button>
                        {profileOpen && (
                            <div className="absolute right-0 mt-2 w-44 rounded-md border border-gray-200 bg-white shadow-lg p-2 flex flex-col gap-2 z-50">
                                {!user ? (
                                    <>
                                        <button onClick={() => openAuth('login')} className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 text-sm font-semibold">Login</button>
                                        <button onClick={() => openAuth('signup')} className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 text-sm font-semibold">Sign Up</button>
                                        <button onClick={() => openAuth('login')} className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 text-sm font-semibold">Admin Login</button>
                                    </>
                                ) : (
                                    <>
                                        <div className="px-3 py-1 text-sm font-semibold text-gray-700 border-b border-gray-200">{user.name}</div>
                                        {isAdmin && (
                                            <button onClick={() => { setAdminOpen(true); setProfileOpen(false); }} className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 text-sm font-semibold">Admin Panel</button>
                                        )}
                                        <button onClick={() => { logout(); setProfileOpen(false); }} className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 text-sm font-semibold">Logout</button>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </div>
                <div className="md:hidden flex items-center gap-3">
                    <button onClick={() => setProfileOpen(!profileOpen)} className="text-3xl text-gray-700" title="Profile">
                        <FaUserCircle />
                    </button>
                    <button onClick={()=>setMenu(!menu)}>
                        {menu ? <IoCloseSharp size={24} /> : <AiOutlineMenu size={24} />}
                    </button>
                </div>
            </div>

            {profileOpen && (
                <div className="md:hidden absolute right-4 top-16 w-44 rounded-md border border-gray-200 bg-white shadow-lg p-2 flex flex-col gap-2 z-50">
                    {!user ? (
                        <>
                            <button onClick={() => openAuth('login')} className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 text-sm font-semibold">Login</button>
                            <button onClick={() => openAuth('signup')} className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 text-sm font-semibold">Sign Up</button>
                            <button onClick={() => openAuth('login')} className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 text-sm font-semibold">Admin Login</button>
                        </>
                    ) : (
                        <>
                            <div className="px-3 py-1 text-sm font-semibold text-gray-700 border-b border-gray-200">{user.name}</div>
                            {isAdmin && (
                                <button onClick={() => { setAdminOpen(true); setProfileOpen(false); }} className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 text-sm font-semibold">Admin Panel</button>
                            )}
                            <button onClick={() => { logout(); setProfileOpen(false); }} className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 text-sm font-semibold">Logout</button>
                        </>
                    )}
                </div>
            )}

            {/* Mobile Navbar */}
            {
                menu && (
                    <div className="bg-white flex justify-center items-center md:hidden flex-col min-h-screen space-y-4 text-2xl">
                        <ul className="md:hidden flex flex-col gap-5 m-5 items-center">
                            {NavItems.map((item) => (
                                <li key={item.id} className="cursor-pointer hover:scale-110 border-b-2 border-transparent hover:border-blue-300 duration-500 px-2 ">
                                    <Link to={item.name}
                                    onClick={()=>setMenu(!menu)}
                                smooth={true}
                                duration={500}
                                offset={-70}
                                activeClass='active'
                                >
                                    {item.name}
                                </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                )
            }

        </div>
        <AuthModal open={authOpen} mode={authMode} onClose={() => setAuthOpen(false)} onModeChange={setAuthMode} />
        <AdminPanelModal open={adminOpen} onClose={() => setAdminOpen(false)} onProjectAdded={onProjectsChanged} />
    </>
    
  )
}

export default Navbar
