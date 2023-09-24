import CreateProjectModal from '@components/project/createProject.modal'
import EditProjectModal from '@components/project/editProject.modal'
// import DeleteProjectModal from '@components/project/deleteProject.modal'
import CreateTaskModal from '@components/task/createTask.modal'
// import EditTaskModal from '@components/task/editTask.modal'
// import DeleteTaskModal from '@components/task/deleteTask.modal'

export default function ModalList() {
  return (
    <>
      <CreateProjectModal />
      <EditProjectModal />
      {/* <DeleteProjectModal /> */}

      <CreateTaskModal />
      {/* <EditTaskModal />
      <DeleteTaskModal /> */}
    </>
  )
}
