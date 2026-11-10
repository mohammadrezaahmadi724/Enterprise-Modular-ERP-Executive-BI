import { HomeSections } from '@/components/marketing/HomeSections';

const productLd = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'ERP ماژولار ابری',
  description: 'پلتفرم SaaS ERP',
};

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productLd) }} />
      <div className="home-page home-v3 flex-1">
        <HomeSections />
      </div>
    </>
  );
}
