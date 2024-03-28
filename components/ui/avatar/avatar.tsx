import {
  Avatar as AvatarPrimitive,
  AvatarFallback,
  AvatarImage,
} from './avatar-atoms';

type Props = {
  className?: string;
  url: string | undefined | null;
  name: string | undefined | null;
};

export default function Avatar({ url, name, className = 'h-8 w-8' }: Props) {
  return (
    <AvatarPrimitive className={className}>
      <AvatarImage src={url ?? undefined} alt={name || 'Avatar Image'} />
      <AvatarFallback>{name?.at(0)}</AvatarFallback>
    </AvatarPrimitive>
  );
}
