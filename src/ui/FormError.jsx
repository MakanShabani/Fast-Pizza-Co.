export default function FormError({ text }) {
  return (
    <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
      {text}
    </p>
  );
}
