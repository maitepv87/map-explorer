interface EmptyStateProps {
  title: string;
  subtitle?: string;
}

export const EmptyState = ({ title, subtitle }: EmptyStateProps) => (
  <div className="text-center mt-4">
    <p className="text-sm font-semibold text-blue-700">{title}</p>
    {subtitle && (
      <span className="block text-gray-500 text-xs">{subtitle}</span>
    )}
  </div>
);
