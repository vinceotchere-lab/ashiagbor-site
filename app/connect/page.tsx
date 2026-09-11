import ConnectForm from "@/components/connect/ConnectForm";

export const metadata = {
  title: "Connect",
  description:
    "Contact Ing. Dr. George Ashiagbor for research collaboration, consultancy, supervision, and speaking — or find him on LinkedIn, Google Scholar, and ORCID.",
};

const PROFILES = [
  {
    label: "Email",
    value: "gashiagbor.canr@knust.edu.gh",
    href: "mailto:gashiagbor.canr@knust.edu.gh",
    tone: "bg-[#e9f1ed] text-[#1e7a4c]",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/ing-ashiagbor",
    href: "https://www.linkedin.com/in/ing-ashiagbor",
    tone: "bg-[#e8f2f8] text-[#2b83b8]",
  },
  {
    label: "Google Scholar",
    value: "Citations and publication list",
    href: "https://scholar.google.com/citations?user=rw2tffMAAAAJ&hl=en",
    tone: "bg-[#f5e8dc] text-[#b76a25]",
  },
  {
    label: "ORCID",
    value: "0000-0001-9215-9366",
    href: "https://orcid.org/0000-0001-9215-9366",
    tone: "bg-[#eceaf7] text-[#5f5da9]",
  },
  {
    label: "KNUST Directory",
    value: "Official staff profile",
    href: "https://webapps.knust.edu.gh/staff/dirsearch/profile/summary/c4d93e9be7a3.html",
    tone: "bg-[#f3f6f8] text-[#111111]",
  },
];

export default function ConnectPage() {
  return (
    <main className="site-shell py-10 md:py-16">
      <section>
        <p className="section-label">Connect</p>
        <h1 className="mt-4 max-w-2xl font-display text-3xl font-semibold tracking-[-0.06em] text-ink sm:text-4xl md:text-5xl">
          Research collaborations and inquiries
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-[#59656d]">
          Open to research collaboration, consultancy on forest monitoring and deforestation-free supply chains, supervision, and speaking engagements.
        </p>

        <div className="mt-8 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="space-y-3">
            {PROFILES.map((profile) => (
              <a
                key={profile.label}
                href={profile.href}
                target={profile.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="data-panel flex items-center gap-4 p-4 transition-colors hover:border-[#bfcfda]"
              >
                <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px] text-sm font-semibold ${profile.tone}`}>
                  {profile.label.slice(0, 2).toUpperCase()}
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-semibold text-ink">{profile.label}</span>
                  <span className="block truncate text-sm text-[#59656d]">{profile.value}</span>
                </span>
                <span className="ml-auto text-sm text-[#59656d]">↗</span>
              </a>
            ))}

            <div className="data-panel p-6">
              <h2 className="font-display text-xl font-semibold tracking-[-0.04em] text-ink">Office</h2>
              <p className="mt-3 text-sm leading-relaxed text-[#59656d]">
                Dept. of Wildlife &amp; Range Management
                <br />
                Faculty of Renewable Natural Resources
                <br />
                KNUST, Kumasi, Ghana
              </p>
              <a
                href="https://www.google.com/maps/search/?api=1&query=KNUST+Faculty+of+Renewable+Natural+Resources+Kumasi"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block text-sm font-semibold text-[#d96b28] hover:underline"
              >
                Open in Google Maps
              </a>
            </div>
          </div>

          <ConnectForm />
        </div>
      </section>
    </main>
  );
}
