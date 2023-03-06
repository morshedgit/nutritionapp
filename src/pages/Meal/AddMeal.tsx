import { useRef } from "react";
import Icon from "../../components/Icon";

interface AddMealProps {
  onUpdateTitle: (title: string) => void;
}

/**
 * Component to add a meal
 * @param {AddMealProps} props - Component props
 * @returns {JSX.Element} - Rendered component
 */
const AddMeal: React.FC<AddMealProps> = ({ onUpdateTitle }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const handleOpenDialog = () => {
    dialogRef.current?.showModal();
  };
  return (
    <section className="pt-6 flex justify-between">
      <dialog
        ref={dialogRef}
        className="[&::backdrop]:bg-gray-800/50 rounded-lg"
      >
        <form
          method="dialog"
          className="flex items-start justify-between w-[20rem]"
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.currentTarget;
            const formData = new FormData(form);
            const { title } = Object.fromEntries(formData.entries()) as {
              title?: string;
            };
            if (!title) return;
            onUpdateTitle(title);
          }}
        >
          <fieldset className="flex-grow flex flex-col items-stretch gap-2">
            <label htmlFor="title">Add your meal's name</label>
            <input
              className="px-2"
              placeholder="Pizza"
              id="title"
              name="title"
              defaultValue={""}
            />
            <button
              type="submit"
              className="py-2 px-4 rounded-full bg-orange-400 hover:bg-orange-500 active:bg-orange-600 flex items-center gap-2 justify-center self-center"
            >
              Save
            </button>
          </fieldset>
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            className="leading-[0]"
          >
            <Icon title="close" className="text-orange-600" />
          </button>
        </form>
      </dialog>
      <button
        onClick={handleOpenDialog}
        className="py-2 px-4 rounded-full bg-orange-400 hover:bg-orange-500 active:bg-orange-600"
      >
        Add to my meals
      </button>
    </section>
  );
};

export default AddMeal;
