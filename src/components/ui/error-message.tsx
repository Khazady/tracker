export default function ErrorMessage(props: {
  message: string | null | undefined;
}) {
  const { message } = props;
  return message && <p className="mt-2 text-sm text-red-500">{message}</p>;
}
