import { Button } from '../../ui/button';

interface BlockButtonProps {
  isSelected: boolean;
  texture?: string;
  icon?: React.ReactNode;
  label: string;
  onClick: () => void;
}

export const BlockButton: React.FC<BlockButtonProps> = ({
  isSelected,
  texture,
  icon,
  label,
  onClick,
}) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <Button
        className={`${
          isSelected
            ? 'border-green-500 text-green-500 hover:bg-green-950 hover:text-green-500'
            : ''
        } p-3 w-max h-max [&_svg]:size-6`}
        variant="outline"
        size="icon"
        onClick={onClick}
      >
        {icon || <img className="w-6 h-6" src={texture} />}
      </Button>

      <p>{label}</p>
    </div>
  );
};
