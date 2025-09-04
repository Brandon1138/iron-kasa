import Image from 'next/image';
import Link from 'next/link';
import styles from '../../../styles';
import { getAllSlugs, getProductBySlug } from '../../../lib/products';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return getAllSlugs('ipad').map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const product = getProductBySlug('ipad', params.slug);
  if (!product) return { title: 'iPad - Not found' };
  return {
    title: `Service ${product.title} | iPhone Doctor`,
    description: `Servicii pentru ${product.title}: ecran, baterie și altele.`,
  };
}

export default function IpadDetailPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug('ipad', params.slug);
  if (!product) return notFound();

  const { title, imgUrl, sizes, services } = product;
  const expandedImageSize = sizes?.expanded ?? sizes?.lg ?? sizes?.md ?? sizes.sm;

  return (
    <section className={`${styles.paddings} px-6 py-12 relative`}>
      <div className="absolute inset-0 z-0 bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#121212_2px)] bg-[size:20px_20px]" />
      <div className={`${styles.innerWidth} mx-auto flex flex-col items-center relative z-10`}>
        <div className="w-full flex items-center justify-between mb-6">
          <Link href="/ipads" className="text-white hover:underline">← Înapoi la iPad</Link>
        </div>

        <div className="flex flex-col py-4 items-center w-full space-y-6 relative z-10">
          <div
            style={{
              width: expandedImageSize.width,
              height: expandedImageSize.height,
              maxWidth: '100%',
              maxHeight: '35vh',
              position: 'relative',
            }}
            className="flex justify-center items-center"
          >
            <Image
              src={imgUrl}
              alt={title}
              fill
              sizes="(max-width: 640px) 80vw, (max-width: 768px) 70vw, (max-width: 1024px) 60vw, (max-width: 1280px) 60vw, 60vw"
              className="object-contain"
              priority={false}
            />
          </div>

          <h1 className="text-center text-2xl md:text-3xl lg:text-4xl font-bold text-white">Service {title}</h1>

          <div className="w-full px-6">
            <div className="grid grid-cols-[65%_15%_20%] gap-4 mr-6">
              <div className="font-semibold text-white text-left">Serviciu</div>
              <div className="font-semibold text-white text-right">Durată</div>
              <div className="font-semibold text-white text-right">Preț</div>

              {services && services.map((serviceItem, index) => (
                <>
                  <div key={`name-${index}`} className="text-white text-left">{serviceItem.name}</div>
                  <div key={`dur-${index}`} className="text-right text-white">{serviceItem.duration}</div>
                  <div key={`price-${index}`} className="text-right text-white">{serviceItem.price}</div>
                </>
              ))}
            </div>
          </div>

          <Link
            href="/contact"
            className="flex items-center justify-center w-[225px] h-[66px] bg-[#d97706] rounded-[32px] text-white text-lg font-semibold hover:bg-[#a95c04] transition-colors duration-300"
          >
            <Image src="/chat.svg" alt="Chat Icon" width={24} height={24} className="mr-3" />
            Trimite un mesaj
          </Link>
        </div>
      </div>
    </section>
  );
}

