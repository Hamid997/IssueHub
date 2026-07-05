import './App.css'
import { useState } from "react";

import Navbar from './components/features/Navbar'
import Toolbar from './components/features/Toolbar'
import IssueTable from './components/features/IssueTable'
import CreateIssueModal from './components/features/CreateIssueModal'
import EditIssueModal from './components/features/EditIssueModal'
import IssueDetailsModal from './components/features/IssueDetailsModal'

import type { IssueResponse } from "./types/Issue";

function App() {
  const [issues] = useState<IssueResponse[]>([
    {
      id: "1",
      title: "Login Bug",
      description: "Cannot login",
      status: "open",
      priority: "high",
      date_added: new Date().toISOString(),
      date_completed: null,
    },
    {
      id: "2",
      title: "Navbar UI",
      description: "Improve navbar",
      status: "closed",
      priority: "medium",
      date_added: new Date().toISOString(),
      date_completed: new Date().toISOString(),
    },
  ]);

  const [selectedIssue] = useState<IssueResponse | null>(issues[0]);

  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const [isEditOpen, setIsEditOpen] = useState(false);

  const [isDetailsOpen, setIsDetailOpen] = useState(false);


  return (
    <>
      <Navbar />

      <Toolbar
        onCreate={() => setIsCreateOpen(true)}
      />

      <IssueTable issues={issues} />

      <CreateIssueModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onSubmit={(data) => { 
              console.log(data);
    setIsCreateOpen(false);
        }}
      />

      {selectedIssue && (
        <IssueDetailsModal
          issue={selectedIssue}
          isOpen={isDetailsOpen}
          onClose={() => setIsDetailOpen(false)}
        />
      )}

      {selectedIssue && (
        <EditIssueModal
          issue={selectedIssue}
          isOpen={isEditOpen}
          onClose={() => setIsEditOpen(false)}
          onSubmit={() => { }}
        />
      )}
    </>
  )
}

export default App
