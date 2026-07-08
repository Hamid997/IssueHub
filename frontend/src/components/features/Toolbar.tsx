import Button from "../base/Button";
import Input from "../base/Input";
import Select from "../base/Select";

interface ToolbarProps {
  onCreate: () => void;

  search: string;
  status: string;

  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
}

export default function Toolbar({
  onCreate,
  search,
  status,
  onSearchChange,
  onStatusChange,
}: ToolbarProps) {
  return (
    <div className="toolbar">
      <Button type="button" onClick={onCreate} >
        + Add issue
      </Button>

      <div className="toolbar-actions">
        <Input
          value={search}
          placeholder="Search by name"
          onChange={(e) => onSearchChange(e.target.value)}
        />

        <Select
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="open">Open</option>
          <option value="in_progress">In Progress</option>
          <option value="closed">Closed</option>
        </Select>
      </div>
    </div>
  );
}