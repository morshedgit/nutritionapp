interface IconProps {
  title: string;
  className?: string;
}
/**
 * Icon component that renders a Material Design icon with an optional CSS class.
 * @param title - The title of the icon to display.
 * @param className - An optional CSS class to add to the icon element.
 * @returns A React component that renders the specified Material Design icon with an optional CSS class.
 */
const Icon: React.FC<IconProps> = ({ title, className }) => {
  return (
    <i className={`material-symbols-outlined ${className ?? ""}`}>{title}</i>
  );
};

export default Icon;
