import { PlusCircle, Pencil, Trash2, Save } from "lucide-react";

const Select = ({ setSelectedPanel }) => {
  const buttonStyles =
    "flex flex-col items-center justify-center w-full py-4 mb-4 border rounded-lg bg-white shadow hover:bg-gray-100 transition";

  const iconStyles = "w-8 h-8 text-blue-500";

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Select</h2>

      <button className={buttonStyles} onClick={() => setSelectedPanel("add")}>
        <PlusCircle className={iconStyles} />
        <span className="mt-2 text-sm font-medium">Add Elements</span>
      </button>

      <button className={buttonStyles} onClick={() => setSelectedPanel("edit")}>
        <Pencil className={iconStyles} />
        <span className="mt-2 text-sm font-medium">Edit Elements</span>
      </button>

      <button className={buttonStyles} onClick={() => setSelectedPanel("delete")}>
        <Trash2 className={iconStyles} />
        <span className="mt-2 text-sm font-medium">Delete Elements</span>
      </button>

      <button className={buttonStyles} onClick={() => setSelectedPanel("save")}>
        <Save className={iconStyles} />
        <span className="mt-2 text-sm font-medium">Save & Get Code</span>
      </button>
    </div>
  );
};

export default Select;