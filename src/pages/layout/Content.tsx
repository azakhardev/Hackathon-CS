interface IProps {
  children: JSX.Element[];
}

export default function Content({ children }: IProps) {
  return <main className="grid grid-cols-[200px_1fr] h-full">{children}</main>;
}
