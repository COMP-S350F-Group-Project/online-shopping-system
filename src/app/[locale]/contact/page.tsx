import { ContactForm } from "@/components/forms/contact-form";
import { supportChannels } from "@/lib/site";
import { getMessages } from "@/lib/i18n";
import { resolveLocale } from "@/lib/request";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = await resolveLocale(params);
  const messages = getMessages(locale);

  return (
    <div className="container-shell space-y-8 py-10">
      <div>
        <p className="eyebrow">{messages.contactPage.eyebrow}</p>
        <h1 className="mt-3 font-display text-5xl leading-[0.95]">{messages.contactPage.title}</h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">
          {messages.contactPage.description}
        </p>
      </div>

      <div className="grid gap-8 xl:grid-cols-[0.85fr_1.15fr]">
        <section className="space-y-4">
          {supportChannels.map((channel) => (
            <div key={channel.id} className="surface-panel rounded-[32px] p-6">
              <p className="font-display text-3xl">{channel.title[locale]}</p>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                {channel.description[locale]}
              </p>
              <p className="mt-4 text-sm font-semibold text-[var(--ink)]">{channel.value}</p>
            </div>
          ))}
        </section>

        <section className="surface-panel rounded-[32px] p-6">
          <ContactForm />
        </section>
      </div>
    </div>
  );
}
