import './App.css'
import { useState } from "react";

import Navbar from './components/features/Navbar'
import Toolbar from './components/features/Toolbar'
import IssueTable from './components/features/IssueTable'
import CreateIssueModal from './components/features/CreateIssueModal'
import EditIssueModal from './components/features/EditIssueModal'
import IssueDetailsModal from './components/features/IssueDetailsModal'

import type { IssueResponse } from "./types/Issue";
import useIssues from "./hooks/useIssues";
import useIssueFilter from "./hooks/useIssueFilter";
import useModal from "./hooks/useModal";

export default function App() {
  const { issues, createIssue, updateIssue, deleteIssue } = useIssues();
  const [selectedIssue, setSelectedIssue] = useState<IssueResponse | null>(issues[0]);

  const createModal = useModal();
  const editModal = useModal();
  const detailsModal = useModal();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const filteredIssues = useIssueFilter({ issues, search, status: statusFilter });

  return (
    <>
      <Navbar />

      <Toolbar
        onCreate={createModal.open}
        search={search}
        onSearchChange={setSearch}
        status={statusFilter}
        onStatusChange={setStatusFilter}
      />

      <IssueTable issues={filteredIssues}
        onSelect={(issue) => {
          setSelectedIssue(issue);
          detailsModal.open();
        }}
        onEdit={(issue) => {
          setSelectedIssue(issue);
          editModal.open();
        }}
        onDelete={deleteIssue}
      />

      <CreateIssueModal
        isOpen={createModal.isOpen}
        onClose={createModal.close}
        onSubmit={async (data) => {
          await createIssue(data);
          createModal.close();
        }}
      />

      {selectedIssue && (
        <IssueDetailsModal
          issue={selectedIssue}
          isOpen={detailsModal.isOpen}
          onClose={detailsModal.close} />
      )}

      {selectedIssue && (
        <EditIssueModal
          issue={selectedIssue}
          isOpen={editModal.isOpen}
          onClose={editModal.close} 
          onSubmit={async (data) => {
            if (selectedIssue) {
              await updateIssue(selectedIssue.id, data);
            }
            editModal.close();
          }} />
      )}
    </>
  )
}
