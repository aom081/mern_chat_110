import { Send } from "lucide-react";
import { THEMES } from "../constants";
import { useThemeStore } from "../store/useThemeStore";

const Setting = () => {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="min-h-screen bg-base-200 pt-20">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold">Theme</h2>
            <p className="text-sm text-base-content/70">
              Choose a theme for your chat interface
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
            {THEMES.map((themeName) => (
              <button
                key={themeName}
                type="button"
                className={`group flex flex-col items-center gap-1.5 p-1.5 rounded-lg transition-colors ${
                  theme === themeName ? "bg-base-300" : "hover:bg-base-300/60"
                }`}
                onClick={() => setTheme(themeName)}
              >
                <div
                  data-theme={themeName}
                  className="w-full rounded-md border border-base-content/20 p-1"
                >
                  <div className="grid grid-cols-4 gap-1">
                    <div className="h-5 rounded bg-primary" />
                    <div className="h-5 rounded bg-secondary" />
                    <div className="h-5 rounded bg-accent" />
                    <div className="h-5 rounded bg-neutral" />
                  </div>
                </div>
                <span className="text-[11px] capitalize">{themeName}</span>
              </button>
            ))}
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Preview</h3>
            <div className="rounded-xl border border-base-300 bg-base-100 p-4 sm:p-6">
              <div className="max-w-md mx-auto rounded-xl border border-base-300 bg-base-100 shadow-sm overflow-hidden">
                <div className="px-4 py-3 border-b border-base-300 flex items-center gap-3">
                  <div className="avatar placeholder">
                    <div className="bg-primary text-primary-content rounded-full w-8">
                      <span className="text-xs">J</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium">John Doe</p>
                    <p className="text-xs text-success">Online</p>
                  </div>
                </div>

                <div className="p-4 space-y-3 bg-base-100">
                  <div className="chat chat-start">
                    <div className="chat-bubble text-sm">
                      Hey! How&apos;s it going?
                    </div>
                  </div>

                  <div className="chat chat-end">
                    <div className="chat-bubble bg-primary text-primary-content text-sm">
                      I&apos;m doing great! Just working on some new features.
                    </div>
                  </div>
                </div>

                <div className="p-3 border-t border-base-300 flex items-center gap-2">
                  <input
                    type="text"
                    value="This is a preview"
                    readOnly
                    className="input input-bordered input-sm w-full"
                  />
                  <button
                    type="button"
                    className="btn btn-primary btn-sm btn-square"
                  >
                    <Send className="size-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setting;
