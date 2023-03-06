interface SaveMealProps {
  onUpdateMeal: () => void;
}
/**
 * A button component to save changes made to a meal.
 *
 * @param {Object} props - The component props.
 * @param {Function} props.onUpdateMeal - A callback function to handle updating the meal.
 * @returns {JSX.Element} - The rendered SaveMeal component.
 */
const SaveMeal: React.FC<SaveMealProps> = ({ onUpdateMeal }) => {
  return (
    <section className="pt-6 flex justify-between">
      <button
        onClick={onUpdateMeal}
        className="py-2 px-4 rounded-full bg-orange-400 hover:bg-orange-500 active:bg-orange-600"
      >
        Save changes
      </button>
    </section>
  );
};

export default SaveMeal;
