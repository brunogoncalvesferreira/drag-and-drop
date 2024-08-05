import { Draggable } from '@hello-pangea/dnd'
import { Trash2 } from 'lucide-react'

interface TasksProps {
  task: {
    id: string
    title: string
  },
  index: number,
  onHandleDeleteTask: (id: string) => void
}

export function Tasks({ task, index, onHandleDeleteTask } : TasksProps) {

  function handleDeleteTask() {
    onHandleDeleteTask(task.id)
  }

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div 
          {...provided.dragHandleProps} 
          {...provided.draggableProps} 
          ref={provided.innerRef} 
          className="w-full flex items-center justify-between bg-zinc-700/30 p-4 shadow-shape">
        <p>{task.title}</p>

        <button onClick={handleDeleteTask}>
          <Trash2 className='size-5 text-zinc-700 hover:text-red-500'/>
        </button>
      </div>
      )}
    </Draggable>
  )
}