// With the Tauri API npm package:
import { invoke } from "@tauri-apps/api/tauri";
// With the Tauri global script, enabled when `tauri.conf.json > build > withGlobalTauri` is set to true:

// Invoke the command

const Task = () => {
  return (
    <div>
      Task{" "}
      <button
        onClick={() =>
          invoke("my_custom_command", { invokeMessage: "agora foi" })
        }
      >
        Salvar
      </button>
    </div>
  );
};

export default Task;
