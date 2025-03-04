import { DeviceUserIcon } from "../components/icons/icons"; // Import your icons

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  deviceUser: DeviceUserIcon,
};

export function getIconComponent(iconName: string) {
  console.log("Getting icon: " +iconName);
  return iconMap[iconName] || null; 
}
