import { MessageSquare } from "lucide-react";

const NoChatSelected = () => {
    return (
        <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-gray-900 text-gray-300">
            <div className="max-w-md text-center space-y-6">
                {/* Animated Icon */}
                <div className="flex justify-center gap-4 mb-4">
                    <div className="relative">
                        <div className="w-16 h-16 rounded-2xl bg-gray-800 flex items-center justify-center shadow-lg animate-bounce">
                            <MessageSquare className="w-8 h-8 text-blue-400" />
                        </div>
                    </div>
                </div>

                {/* Welcome Message */}
                <h1 className="text-3xl font-bold tracking-tight text-gray-100">
                    Welcome to Chatify
                </h1>
                <p className="text-lg text-gray-400">
                    Select a chat or start a new one to begin messaging.
                </p>
            </div>
        </div>
    );
};

export default NoChatSelected;
