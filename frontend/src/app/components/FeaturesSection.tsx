import { FileText, Sparkles, GitCompareArrows, Search, LayoutDashboard, Clock, Scale, PenTool } from 'lucide-react';

interface FeaturesSectionProps {
  t: any;
}

export default function FeaturesSection({ t }: FeaturesSectionProps) {
  const features = [
    {
      icon: FileText,
      title: t.feat1Title,
      desc: t.feat1Desc,
      color: 'text-[#D92662]',
      bg: 'bg-[#D92662]/10',
    },
    {
      icon: Sparkles,
      title: t.feat2Title,
      desc: t.feat2Desc,
      color: 'text-[#D92662]',
      bg: 'bg-[#D92662]/10',
    },
    {
      icon: GitCompareArrows,
      title: t.feat3Title,
      desc: t.feat3Desc,
      color: 'text-[#D92662]',
      bg: 'bg-[#D92662]/10',
    },
    {
      icon: Search,
      title: t.feat4Title,
      desc: t.feat4Desc,
      color: 'text-[#D92662]',
      bg: 'bg-[#D92662]/10',
    },
    {
      icon: LayoutDashboard,
      title: t.feat5Title,
      desc: t.feat5Desc,
      color: 'text-[#D92662]',
      bg: 'bg-[#D92662]/10',
    },
    {
      icon: Clock,
      title: t.feat6Title,
      desc: t.feat6Desc,
      color: 'text-[#D92662]',
      bg: 'bg-[#D92662]/10',
    },
    {
      icon: Scale,
      title: t.feat7Title,
      desc: t.feat7Desc,
      color: 'text-[#D92662]',
      bg: 'bg-[#D92662]/10',
    },
    {
      icon: PenTool,
      title: t.feat8Title,
      desc: t.feat8Desc,
      color: 'text-[#D92662]',
      bg: 'bg-[#D92662]/10',
    },
  ];

  return (
    <section id="features" className="py-16 sm:py-24 bg-[#0e0617]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-[#D92662] font-bold text-xs tracking-[0.2em] uppercase mb-3">{t.featuresPill}</p>
          <h2 className="text-3xl sm:text-4xl font-serif font-black text-white tracking-tight">
            {t.featuresSub}
          </h2>
          <p className="mt-4 text-neutral-400 text-sm sm:text-base font-sans">
            {t.featuresLead}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-[#131118] border border-neutral-850 rounded-2xl p-6 hover:shadow-lg hover:border-[#D92662]/30 transition-all duration-300 group"
            >
              <div className={`w-10 h-10 rounded-xl ${f.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <f.icon className={`w-5 h-5 ${f.color}`} />
              </div>
              <h3 className="font-bold text-neutral-100 text-sm mb-2">{f.title}</h3>
              <p className="text-neutral-400 text-xs leading-relaxed font-sans">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
