import { Button } from "@/components/ui/button";

export default function SubmitButton({onClick,children,icon,className,...rest}: {
        onClick?: () => void;
        children: React.ReactNode;
        icon?: React.ReactNode;
        className?: string;
        [key: string]: any;
    }) {
    return (
        <Button onClick={onClick} className={`flex items-center ${className}`} {...rest}>
            {icon && <span className="mr-2">{icon}</span>}
            {children}
        </Button>
    );
}