import { useEffect, useState } from "react";

type Review = { id: number; name: string; daysAgo: number; text: string };

const REVIEWS: Review[] = [
  { id: 1, name: "Michael R.", daysAgo: 2, text: "Schnelle Lieferung, fairer Preis. Bestellung war in 2 Minuten erledigt. Gerne wieder!" },
  { id: 2, name: "Sabine K.", daysAgo: 4, text: "Super Service! Der Fahrer hat vorher angerufen und war pünktlich." },
  { id: 3, name: "Thomas W.", daysAgo: 1, text: "Preis-Leistung stimmt. Übersichtliche Seite und unkomplizierte Abwicklung." },
  { id: 4, name: "Petra S.", daysAgo: 3, text: "Zum ersten Mal online bestellt — ging super einfach. Lieferung kam wie versprochen." },
  { id: 5, name: "Andreas B.", daysAgo: 5, text: "Guter Preis, freundlicher Fahrer. Werde auch nächstes Jahr wieder bestellen." },
  { id: 6, name: "Julia M.", daysAgo: 2, text: "Alles transparent, keine versteckten Kosten. Das gefällt mir sehr." },
  { id: 7, name: "Stefan H.", daysAgo: 6, text: "Heizöl kam einen Tag früher als angekündigt. Top organisiert!" },
  { id: 8, name: "Claudia F.", daysAgo: 4, text: "Heizöl Austria hatte den besten Preis in meiner Region. Empfehlung!" },
  { id: 9, name: "Markus L.", daysAgo: 7, text: "Unkompliziert, schnell, zuverlässig. Genau so muss es sein." },
  { id: 10, name: "Nicole G.", daysAgo: 1, text: "Sehr gute Beratung am Telefon. Die Lieferung verlief reibungslos." },
  { id: 11, name: "Frank D.", daysAgo: 3, text: "Ich bin begeistert. Preis berechnet, bestellt, geliefert — ohne Stress." },
  { id: 12, name: "Ute P.", daysAgo: 5, text: "Der Tankwagen passte perfekt in unsere Einfahrt. Gerne wieder!" },
  { id: 13, name: "Klaus N.", daysAgo: 6, text: "Fairer Direktpreis, keine Überraschungen. Bestellung lief reibungslos." },
  { id: 14, name: "Sandra O.", daysAgo: 2, text: "Schnelle Reaktionszeit und pünktliche Lieferung. Absolut empfehlenswert." },
  { id: 15, name: "Jürgen T.", daysAgo: 4, text: "Meine zweite Bestellung bei Heizöl Austria. Beide Male alles bestens." },
  { id: 16, name: "Monika E.", daysAgo: 7, text: "Günstiger als beim lokalen Händler und trotzdem persönlicher Service." },
  { id: 17, name: "Robert Z.", daysAgo: 1, text: "Alles digital, alles klar. So soll Online-Bestellung heute funktionieren." },
  { id: 18, name: "Elke K.", daysAgo: 3, text: "Lieferung am gewünschten Tag, Fahrer sehr freundlich. Danke!" },
  { id: 19, name: "Wolfgang S.", daysAgo: 5, text: "Preisvergleich war einfach, Bestellung noch einfacher. Gerne wieder." },
  { id: 20, name: "Anna H.", daysAgo: 6, text: "Heizöl Austria ist mein neuer Standard für Heizöl. Schnell, günstig, zuverlässig." },
];

export function ReviewStars() {
  return <span className="inline-flex gap-0.5 text-rating" aria-label="5 von 5 Sternen" role="img">{"★★★★★"}</span>;
}

const ITEM_HEIGHT = 88;

export function ReviewCarousel() {
  const [index, setIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const interval = window.setInterval(() => setIndex((i) => (i + 1) % REVIEWS.length), 5000);
    return () => window.clearInterval(interval);
  }, [reducedMotion]);

  return (
    <div className="mt-3 h-[176px] overflow-hidden" aria-label="Kundenstimmen">
      {[REVIEWS[index], REVIEWS[(index + 1) % REVIEWS.length]].map((review) => review ? (
        <div key={review.id} className="flex h-[88px] flex-col justify-center border-t border-line py-2 first:border-t-0">
          <p className="flex flex-wrap items-center gap-x-2 text-[13px] leading-tight">
            <ReviewStars />
            <span className="font-bold text-conditions">{review.name}</span>
            <span className="text-muted-custom">· vor {review.daysAgo} Tag{review.daysAgo === 1 ? "" : "en"}</span>
          </p>
          <p className="mt-1 line-clamp-2 text-[13px] leading-[1.5] text-hero-text">{review.text}</p>
        </div>
      ) : null)}
    </div>
  );
}