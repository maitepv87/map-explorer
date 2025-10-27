interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage = ({ message }: ErrorMessageProps) => (
  <p className="text-sm text-red-700 bg-red-50 border border-red-400 shadow-sm px-4 py-2 rounded mt-4">
    {message}
  </p>
);
