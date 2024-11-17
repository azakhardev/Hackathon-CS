export function SectionHeader({ title }: { title: string }) {
  return (
    <h1 className="w-full text-4xl font-extrabold tracking-tight text-center scroll-m-20 lg:text-5xl">
      {title}
    </h1>
  );
}
