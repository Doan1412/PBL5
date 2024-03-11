import DesktopSidebar from "./DesktopSidebar";
import MobileFooter from "./MobileFooter";

export default async function SidebarMess({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen">
      <DesktopSidebar />
      <MobileFooter />
      <main className="lg:pl-20 h-full">{children}</main>
    </div>
  );
}
