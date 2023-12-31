export default function Form({
  type,
  placeholder,
  className,
  onChange,
  value,
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`flex h-[52px] w-full rounded-lg bg-gray-200 px-6 text-base font-bold text-gray-900 outline-none placeholder:text-[14px] placeholder:font-semibold placeholder:text-gray-600 focus:border focus:border-pink-500 focus:ring-4 focus:ring-pink-500/20 dark:bg-gray-900 dark:text-white dark:placeholder:text-gray-700 ${className}`}
      onChange={onChange}
      value={value}
    />
  );
}
