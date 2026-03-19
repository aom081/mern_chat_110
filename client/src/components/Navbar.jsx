import { Link } from "react-router";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageSquare, Settings, User } from "lucide-react";

const Navbar = () => {
  const { logOut, authUser } = useAuthStore();
  return (
    <header
      className="border-b border-base-300 fixed w-full top-0 z-40 
    backdrop-blur-lg bg-base-100/80"
    >
      <div className="container mx-auto px-2 sm:px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center min-w-0">
            <Link
              to="/"
              className="flex items-center gap-2.5 hover:opacity-80 transition-all"
            >
              <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-primary" />
              </div>
              <h1 className="text-lg font-bold hidden sm:block">SE Chat</h1>
            </Link>
          </div>

          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            <Link
              to={"/settings"}
              className="btn btn-sm gap-2 transition-colors"
            >
              <Settings className="w-4 h-4" />
              <span className="hidden lg:inline">Settings</span>
            </Link>
            {authUser && (
              <>
                <Link to={"/profile"} className="btn btn-sm gap-2">
                  <User className="size-5" />
                  <span className="hidden lg:inline">Profile</span>
                </Link>
                <button
                  className="btn btn-sm gap-2"
                  onClick={logOut}
                  type="button"
                >
                  <LogOut className="size-5" />
                  <span className="hidden lg:inline">LogOut</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
export default Navbar;
