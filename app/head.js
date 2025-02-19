const Head = () => (
  <>
    <title>iPhone Doctor</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta
      name="description"
      content="iPhoneDoctor oferă reparații rapide și profesionale pentru iPhone, iPad, MacBook și iMac în București. Servicii hardware și software cu garanție, realizate de specialiști Apple. Contactează-ne acum pentru o diagnosticare gratuită!"
    />
    <link rel="icon" href="/favicon.ico" />

    <link
      rel="preload"
      as="image"
      href="/texture-new-large.webp"
      type="image/webp"
      media="(min-width: 1024px)"
    />
    <link
      rel="preload"
      as="image"
      href="/texture-new-medium.webp"
      type="image/webp"
      media="(min-width: 640px) and (max-width: 1023px)"
    />
    <link
      rel="preload"
      as="image"
      href="/texture-new-small.webp"
      type="image/webp"
      media="(max-width: 639px)"
    />
  </>
);

export default Head;
