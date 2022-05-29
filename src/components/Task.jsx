import { invoke } from "@tauri-apps/api/tauri";
import { useTimer } from "react-timer-hook";

const Job = ({ task, id }) => {
  const conclusionDate = new Date(Date.parse(task.time));
  const { seconds, minutes, hours, days } = useTimer({
    autoStart: true,
    expiryTimestamp: conclusionDate,
    onExpire: () => console.warn("onExpire called"),
  });

  let nextTime;
  if (task.previous_revision_time === 7) {
    nextTime = 15;
  } else if (task.previous_revision_time === 15) {
    nextTime = 30;
  } else {
    nextTime = 30;
  }
  return (
    <div
      className={`border-4 p-4 m-2 ${
        days > 3 ? "bg-green-500 " : "bg-red-500"
      } text-white`}
    >
      <h1 className="text-xl">{task.title}</h1>
      <h4 className="text-sm">{task.description}</h4>
      <h5 className="text-sm">
        <span>{days} dias</span> e{" "}
        <span>{hours} horas até a próxima revisão</span>
      </h5>
      <button
        className="text-white p-2 border-green-500 hover:shadow-lg shadow-black transition-shadow text-sm border-4 rounded bg-green-500"
        onClick={() =>
          invoke("update_task", {
            id: id,
            title: task.title,
            description: task.description,
            previous_revision_time: nextTime,
          })
        }
      >
        Revisei
      </button>
      <button
        className="text-red-500"
        onClick={() =>
          invoke("remove_task", {
            id: id,
          })
        }
      >
        X
      </button>
    </div>
  );
};

export default Job;
