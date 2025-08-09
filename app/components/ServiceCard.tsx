interface ServiceCardProps {
  title: string;
  description: string;
  icon: string;
  className?: string;
}

export default function ServiceCard({ title, description, icon, className = "" }: ServiceCardProps) {
  return (
    <div className={`bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 ${className}`}>
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
