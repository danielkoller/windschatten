import Forum from './Forum';

export default function GroupPage() {
  return (
    <div className=" flex flex-col items-center justify-center px-4 py-8">
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        Group Page
      </h1>
      <Forum />
    </div>
  );
}
