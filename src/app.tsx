import { PlusCircle } from "lucide-react";
import { Tasks } from "./components/tasks";
import { FormEvent, useState } from "react";

import { DragDropContext, Droppable } from "@hello-pangea/dnd";

interface TaskProps {
  id: string;
  title: string;
}

export function App() {
  const [text, setText] = useState("");
  const [tasks, setTasks] = useState<TaskProps[]>([]);

  function createNewTasks(event: FormEvent) {
    event.preventDefault();

    if (!text) return;

    const newTask = {
      id: crypto.randomUUID(),
      title: text,
    };

    setTasks((prevState) => [newTask, ...prevState]);
    setText("");
  }

  function reorder<T>(list: T[], startIndex: number, endIndex: number) {
    const result = Array.from(list);

    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  }

  function onDragEnd(result: any) {
    if (!result.destination) {
      return;
    }

    const items = reorder(tasks, result.source.index, result.destination.index);

    setTasks(items);
  }

  function handleDeleteTask(id: string) {
    const actionDelete = tasks.filter((task) => task.id !== id);
    setTasks(actionDelete)
  }
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-10">Drag and Drop</h1>
      <div className="w-[40rem]">
        <form className="flex gap-2 w-full shadow-shape p-4 rounded">
          <input
            type="text"
            placeholder="Digite uma tarefa..."
            className="w-full p-4 rounded bg-transparent text-white border border-zinc-700/30 outline-none placeholder:text-zinc-400"
            onChange={(event) => setText(event.target.value)}
            value={text}
          />
          <button
            onClick={createNewTasks}
            className="flex items-center gap-2 p-4 rounded bg-lime-200 hover:bg-lime-300 transition text-zinc-900 font-semibold"
          >
            <PlusCircle />
            Add
          </button>
        </form>
        {tasks.length === 0 ? (
          <p className="text-center text-zinc-400 mt-10">Nenhuma tarefa encontrada</p>
        ) : (
          <div className="mt-8 bg-zinc-800/30 p-4 rounded shadow-shape">
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="tasks" type="list" direction="vertical">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="flex flex-col gap-2"
                >
                  {tasks.map((task, index) => (
                    <Tasks
                      key={task.id}
                      task={task}
                      index={index}
                      onHandleDeleteTask={handleDeleteTask}
                    />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
        )}
        
      </div>
    </div>
  );
}
