// With the Tauri API npm package:
import { invoke } from "@tauri-apps/api/tauri";
import { useState } from "react";
// With the Tauri global script, enabled when `tauri.conf.json > build > withGlobalTauri` is set to true:
import data from "../../src-tauri/data.json";
import Task from "./Task";
import Select from "react-select";

// Invoke the command
const Taskboard = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState(null);
  const options = [
    { value: 7, label: "7 dias" },
    { value: 15, label: "15 dias" },
    { value: 30, label: "1 mês" },
  ];

  const getResultantDate = (days) => {
    const result = new Date();
    result.setDate(result.getDate() + days);
    return result;
  };

  return (
    <div className="grid grid-flow-row grid-cols-2">
      <div className="grid grid-flow-row mx-4">
        <input
          onInput={(e) => setTitle(e.target.value)}
          value={title}
          placeholder="Digite aqui seu título"
          className="border-4 rounded my-2 text-black text-xl"
        ></input>
        <textarea
          onInput={(e) => setDescription(e.target.value)}
          value={description}
          placeholder="Digite aqui sua descrição"
          className="border-4 rounded my-2 text-black text-xl"
        ></textarea>
        <Select
          className="border-4 rounded my-2 text-black text-xl"
          value={time}
          onChange={setTime}
          options={options}
        />
        <button
          className="border-4 rounded p-4 m-2 hover:bg-green-500 transition-colors border-green-700"
          onClick={() => {
            invoke("add_new_task", {
              title: title,
              description: description,
              time: getResultantDate(time.value).toString(),
              previous_revision_time: time.value,
            });
            setTitle("");
            setDescription("");
          }}
        >
          Salvar
        </button>
      </div>
      <div>
        {Object.keys(data).map((id) => (
          <Task key={id} task={data[id]} id={id} />
        ))}
      </div>
    </div>
  );
};

export default Taskboard;
