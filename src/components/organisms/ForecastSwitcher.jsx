import { Clock, Calendar } from "lucide-react";
import DropdownSelect from "../molecules/DropdownSelect";

export default function ForecastSwitcher({ value, onChange }) {
    return (
        <DropdownSelect
            value={value}
            onChange={onChange}
            options={[
                { value: "hourly", label: "Per-5 menit", icon: <Clock className="h-4 w-4" /> }
            ]}
            className="min-w-[180px]"
        />
    );
}
