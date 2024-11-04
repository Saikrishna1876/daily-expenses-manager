import AdminNavbar from "@/components/admin-navbar";

function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AdminNavbar />
      <div className="px-10 my-4">{children}</div>
    </>
  );
}

export default AdminLayout;
