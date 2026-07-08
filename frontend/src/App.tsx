import "./App.css";
import { useState } from "react";

import Navbar from "./components/features/Navbar";
import Toolbar from "./components/features/Toolbar";
import IssueTable from "./components/features/IssueTable";
import EmptyState from "./components/features/EmptyState";
import CreateIssueModal from "./components/features/CreateIssueModal";
import EditIssueModal from "./components/features/EditIssueModal";
import IssueDetailsModal from "./components/features/IssueDetailsModal";
import ConfirmDialog from "./components/features/ConfirmDialog";
import IssueTableSkeleton from "./components/features/IssueTableSkeleton";
import Pagination from "./components/features/Pagination";

import useIssues from "./hooks/useIssues";
import useIssueFilter from "./hooks/useIssueFilter";
import useModal from "./hooks/useModal";

import type { IssueResponse } from "./types/Issue";

export default function App() {
  const { issues,

    total,
    skip,
    limit,

    nextPage,
    previousPage,

    loading,
    initialized,

    createIssue,
    updateIssue,
    deleteIssue,
  } = useIssues();
  const [selectedIssue, setSelectedIssue] = useState<IssueResponse | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const filteredIssues = useIssueFilter({ issues, search, status: statusFilter });
  const createModal = useModal();
  const editModal = useModal();
  const detailsModal = useModal();
  const deleteModal = useModal();

  function handleSelectIssue(issue: IssueResponse) {
    setSelectedIssue(issue);
    detailsModal.open();
  }

  return (
    <div className="page">

      <Navbar />

      <main className="main">

        <div className="container">

          <Toolbar
            onCreate={createModal.open}
            search={search}
            onSearchChange={setSearch}
            status={statusFilter}
            onStatusChange={setStatusFilter}
          />

          {loading ? (
            <IssueTableSkeleton />
          ) : !initialized ? null : filteredIssues.length === 0 ? (
            <EmptyState />
          ) : (
            <IssueTable
              issues={filteredIssues}
              onSelect={handleSelectIssue}
            />
          )}

          <Pagination

            total={total}

            skip={skip}

            limit={limit}

            onPrevious={previousPage}

            onNext={nextPage}

          />
        </div>

      </main>

      {/* =======================
            Create
      ======================== */}

      <CreateIssueModal
        isOpen={createModal.isOpen}
        onClose={createModal.close}
        loading={loading}
        // error={error}
        onSubmit={async (data) => {
          await createIssue(data);
          createModal.close();
        }}
      />

      {/* =======================
            Details
      ======================== */}

      {selectedIssue && (
        <IssueDetailsModal
          issue={selectedIssue}
          isOpen={detailsModal.isOpen}
          onClose={detailsModal.close}

          onEdit={() => {
            detailsModal.close();
            editModal.open();
          }}

          onDelete={() => {
            detailsModal.close();
            deleteModal.open();
          }}
        />
      )}

      {/* =======================
            Edit
      ======================== */}

      {selectedIssue && (
        <EditIssueModal
          issue={selectedIssue}
          isOpen={editModal.isOpen}
          onClose={editModal.close}
          loading={loading}
          // error={error}
          onSubmit={async (data) => {
            await updateIssue(
              selectedIssue.id,
              data
            );

            editModal.close();
          }}
        />
      )}

      {/* =======================
            Delete
      ======================== */}

      {selectedIssue && (
        <ConfirmDialog
          isOpen={deleteModal.isOpen}
          title="Delete Issue"
          message="Are you sure you want to delete this issue?"

          onCancel={deleteModal.close}

          onConfirm={async () => {
            await deleteIssue(selectedIssue.id);

            deleteModal.close();

            detailsModal.close();

            setSelectedIssue(null);
          }}
        />
      )}

    </div>
  );
}
