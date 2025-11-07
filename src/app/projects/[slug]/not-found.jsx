import Link from 'next/link';

export default function ProjectNotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-4">
      <h1 className="text-6xl font-bold text-teal-700 mb-4">404</h1>
      <p className="text-xl text-gray-700 mb-6">
        Oops! The project you’re looking for doesn’t exist.
      </p>
      <Link
        href="/projects"
        className="px-6 py-3 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition"
      >
        Back to projects
      </Link>
    </div>
  );
}
