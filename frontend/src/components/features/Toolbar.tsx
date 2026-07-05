import Button from "../base/Button"
import Input from "../base/Input"
import Select from "../base/Select"

interface ToolbarProps {

    onCreate: () => void

}

export default function Toolbar({

    onCreate,

}: ToolbarProps) {
    return (
        <div className="toolbar">

            <Button

                onClick={onCreate}

            >

                Add Issue

            </Button>
            <Input
                value=""
                placeholder="Search by name"
                onChange={() => { }}
            />

            <Select
                value=""
                onChange={() => { }}
            >
                <option value="">
                    All statuses
                </option>

                <option value="open">
                    Open
                </option>

                <option value="in_progress">
                    In Progress
                </option>

                <option value="closed">
                    Closed
                </option>

            </Select>

        </div>
    )
}