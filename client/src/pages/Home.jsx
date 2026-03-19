import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";
import { useChatStore } from "../store/useChatStore";

const HomePage = () => {
  const { selectedUser } = useChatStore();
  return (
    <div className="min-h-screen bg-base-200 pt-16">
      <div className="h-[calc(100dvh-4rem)] px-2 py-2 sm:px-4 sm:py-4">
        <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-full mx-auto overflow-hidden">
          <div className="flex h-full rounded-lg overflow-hidden">
            <div className={`${selectedUser ? "hidden md:flex" : "flex"}`}>
              <Sidebar />
            </div>

            <div
              className={`flex-1 ${selectedUser ? "flex" : "hidden md:flex"}`}
            >
              {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomePage;
