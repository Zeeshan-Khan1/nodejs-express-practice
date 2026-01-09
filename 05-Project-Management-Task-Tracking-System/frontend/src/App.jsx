import { Routes, Route, Navigate } from "react-router"

import Dashboard from "./pages/admin/dashboard/Dashboard"
import Stats from "./pages/admin/stats/Stats"
import Projects from "./pages/admin/projects/Projects"
import AddProject from "./pages/admin/projects/AddProject"
import EditProject from "./pages/admin/projects/EditProject"
import Tasks from "./pages/admin/tasks/Tasks"
import AddTask from "./pages/admin/tasks/AddTask"
import EditTask from "./pages/admin/tasks/EditTask"
import TeamMembers from "./pages/admin/teamMembers/TeamMembers"
import AddTeamMember from "./pages/admin/teamMembers/AddTeamMember"
import EditTeamMember from "./pages/admin/teamMembers/EditTeamMember"
import Users from "./pages/admin/users/Users"

import Home from "./pages/user/home/Home"

const App = () => {
  return (
    <Routes>
      {/* user routes */}
      <Route path="/" element={<Home />} />

      {/* admin routes */}
      <Route path="/admin" element={<Dashboard />} >
        {/* When user visits /admin → redirect */}
        <Route index element={<Navigate to="stats" replace />} />
        <Route path="stats" element={<Stats />} />
        
        {/* Projects routes */}
        <Route path="projects" element={<Projects />} />
        <Route path="add-project" element={<AddProject />} />
        <Route path="edit-project/:id" element={<EditProject />} />
        
        {/* Tasks routes */}
        <Route path="tasks" element={<Tasks />} />
        <Route path="add-task" element={<AddTask />} />
        <Route path="edit-task/:id" element={<EditTask />} />
        
        {/* Team Members routes */}
        <Route path="team-members" element={<TeamMembers />} />
        <Route path="add-team-member" element={<AddTeamMember />} />
        <Route path="edit-team-member/:id" element={<EditTeamMember />} />
        
        {/* Users routes */}
        <Route path="users" element={<Users />} />
      </Route>
    </Routes>
  )
}

export default App
