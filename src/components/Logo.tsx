// src/components/Logo.tsx
export default function Logo() {
  return (
    <div className="flex items-center gap-1 text-indigo-600 dark:text-indigo-400 font-bold text-2xl">
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        className="text-indigo-600 dark:text-indigo-400"
      >
        <path d="M13 2L3 14H13L11 22L21 10H11L13 2Z" />
      </svg>
      <span>GiniBlog</span>
    </div>
  );
}
