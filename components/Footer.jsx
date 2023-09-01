export default function Footer() {
  return (
    <footer className="mx-auto mt-8 max-w-[1440px]">
      <div className="container flex h-24 items-center justify-center border-t-2 border-gray-200">
        <span className="font-semibold text-gray-900">
          Hak cipta {new Date().getFullYear()} - Di kembangkan oleh ❤️
        </span>
      </div>
    </footer>
  );
}
