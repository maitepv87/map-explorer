interface LoadingSpinnerProps {
  text?: string;
}

export const LoadingSpinner = ({
  text = "Loading...",
}: LoadingSpinnerProps) => (
  <div className="flex items-center justify-center mt-4">
    <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-blue-500" />
    <p className="text-sm text-gray-500 ml-2">{text}</p>
  </div>
);
