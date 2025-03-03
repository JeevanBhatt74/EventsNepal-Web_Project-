import { HeroParallax } from "@/components/blocks/hero-parallax";

export function HeroParallaxDemo() {
  return (
    <div className="relative h-[235vh] w-full">
      <div className="absolute top-0 left-0 w-full">
        <HeroParallax products={products} />
      </div>
    </div>
  );
}
export const products = [
  {
    title: "Moonbeam",
    link: "https://gomoonbeam.com",
    thumbnail:
      "https://nepalievents.co.uk/storage/events_images/nepalievents_co_uk_Kandara-1920x1080-6b5db1f260.webp",
  },
  {
    title: "Cursor",
    link: "https://cursor.so",
    thumbnail:
      "https://media.thuprai.com/__sized__/event/featured_image/IMG_20220402_083137_521-crop-c0-5__0-5-1200x630-70.jpg",
  },
  {
    title: "Rogue",
    link: "https://userogue.com",
    thumbnail:
      "https://republicaimg.nagariknewscdn.com/shared/web/uploads/media/tuborg_musicfund.jpg",
  },

  {
    title: "Editorially",
    link: "https://editorially.org",
    thumbnail:
      "https://eventmx.com/media/event_image/2HoeKytFCfwGYFqFCQdCVZ.jpg",
  },
  {
    title: "Editrix AI",
    link: "https://editrix.ai",
    thumbnail:
      "https://eventmx.com/media/event_image/PnEpbsEhABzPSJ5E2JTHSh.jpg",
  },
  {
    title: "Pixel Perfect",
    link: "https://app.pixelperfect.quest",
    thumbnail:
      "https://eventmx.com/media/ck_uploads/Summit7303e8ab2b/2024/07/10/f0d55ba8-7906-46fe-9804-c1212d75ed35.jpg",
  },

  {
    title: "Algochurn",
    link: "https://algochurn.com",
    thumbnail:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRr9sClxEyCNsWWWwm3osQkbaxy_wwHc5Rdow&s",
  },
  {
    title: "Aceternity UI",
    link: "https://ui.aceternity.com",
    thumbnail:
      "https://www.arkoevent.com/wp-content/uploads/2024/09/458982516_848453577375794_3127506768301683404_n-600x600.jpg",
  },
  {
    title: "Tailwind Master Kit",
    link: "https://tailwindmasterkit.com",
    thumbnail:
      "https://assets-cdn.kathmandupost.com/uploads/source/news/2022/third-party/04NepathyaMusicforHumanityNepalTourPosterImagewithEnglishDates-1669908025.jpg",
  },
  {
    title: "SmartBridge",
    link: "https://smartbridgetech.com",
    thumbnail:
      "https://eventmx.com/media/ck_uploads/Summit7303e8ab2b/2024/06/04/sat08june-2-1-min.jpg",
  },
  {
    title: "Renderwork Studio",
    link: "https://renderwork.studio",
    thumbnail:
      "https://media.thuprai.com/__sized__/event/Karma-Nepal_Tour-thumbnail-960x480-70.jpg",
  },

  {
    title: "Creme Digital",
    link: "https://cremedigital.com",
    thumbnail:
      "https://lexlimbu.com/wp-content/uploads/The-Edge-Night-UK-1.jpg",
  },
  {
    title: "Golden Bells Academy",
    link: "https://goldenbellsacademy.com",
    thumbnail:
      "https://eventanything.com/storage/events/165980095062ee8d76831b2.webp",
  },
  {
    title: "Invoker Labs",
    link: "https://invoker.lol",
    thumbnail:
      "https://www.arkoevent.com/wp-content/uploads/2023/10/18TH-KALRATRI-MUSIC-FESTIVAL.png",
  },
  {
    title: "E Free Invoice",
    link: "https://efreeinvoice.com",
    thumbnail:
      "https://blog.khalti.com/wp-content/uploads/2022/12/Prateek-Kuhad.png",
  },
];
