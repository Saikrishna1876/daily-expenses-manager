import Navbar from "@/components/navbar";

function GuestLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <div className="mx-7 my-6">{children}</div>
    </>
  );
}

export default GuestLayout;
