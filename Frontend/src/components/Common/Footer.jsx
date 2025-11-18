export default function Footer() {
  return (
    <footer className="bg-unila-deep text-unila-light p-4 mt-8 shadow-inner">
      <div className="container mx-auto text-center text-sm">
        &copy; {new Date().getFullYear()} UnilaFest. All rights reserved.
        {/* Anda bisa menambahkan link media sosial atau info kontak di sini */}
      </div>
    </footer>
  );
}