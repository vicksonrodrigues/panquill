import SignInSiteHeader from "./_components/SignInSiteHeader";
import { siteLogoUrl, siteName } from "@/data/siteDetails";

export default function ClerkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="[--header-height:calc(--spacing(16))]">
      <SignInSiteHeader siteName={siteName} siteLogo={siteLogoUrl} />
      <div className="flex h-screen w-screen items-center justify-center bg-muted">
        {children}
      </div>
    </div>
  );
}
