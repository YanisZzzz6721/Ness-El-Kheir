import SectionTitle from "@/components/ui/SectionTitle";
import Accordion from "@/components/ui/Accordion";

const FAQ = [
  {
    question: "Où êtes-vous implantées ?",
    answer: "Nous sommes implantées en Île-de-France, principalement dans le 92 (Hauts-de-Seine).",
  },
  {
    question: "Où distribuez-vous ?",
    answer: "Nous distribuons sur Paris et ses alentours (Île-de-France).",
  },
  {
    question: "À qui distribuez-vous ?",
    answer: "Nous distribuons aux personnes en situation de précarité : sans-abri, familles en difficulté, étudiants en situation précaire.",
  },
  {
    question: "Est-ce que vous acceptez les mineurs ?",
    answer: "Actuellement, nous n'acceptons que des bénévoles majeures, pour des raisons de sécurité.",
  },
  {
    question: "Quelles sont les conditions pour devenir bénévole ?",
    answer: "Pour devenir bénévole, il faut être majeure, être une femme, et habiter en Île-de-France.",
  },
  {
    question: "Comment devenir bénévole ?",
    answer: "Il vous suffit de remplir notre formulaire d'inscription accessible depuis le bouton « Je deviens bénévole » sur cette page.",
  },
  {
    question: "Est-ce que vous récupérez les dons matériels ?",
    answer: "Oui ! Vêtements, nourriture non périssable, produits d'hygiène… Contactez-nous via le formulaire pour organiser un dépôt.",
  },
  {
    question: "Quand ont lieu vos maraudes ?",
    answer: "Les maraudes ont lieu une fois par mois le samedi. Les dates sont annoncées sur notre Instagram.",
  },
  {
    question: "Y a-t-il d'autres actions à côté des maraudes ?",
    answer: "Oui ! Collectes alimentaires et vestimentaires, distribution de colis familles, visites aux malades, soutien aux étudiants et événements solidaires.",
  },
  {
    question: "Pourquoi une association 100% femmes ?",
    answer: "Nous avons créé une association exclusivement féminine pour offrir un environnement sans mixité, répondant au besoin de nombreuses femmes cherchant des espaces où elles se sentent particulièrement à l'aise et en confiance.",
  },
];

export default function FaqSection() {
  return (
    <section id="faq" className="section bg-white">
      <div className="container-site">
        <div className="max-w-3xl mx-auto flex flex-col gap-10">

          <SectionTitle
            label="FAQ"
            title="Les questions fréquentes"
            subtitle="Vous avez une question ? Nous avons sûrement la réponse ici."
          />

          <Accordion items={FAQ} />

          <p className="text-center text-sm text-[#8a8a8a]">
            Vous ne trouvez pas votre réponse ?{" "}
            <a href="#contact" className="text-[#839678] font-semibold hover:underline">
              Écrivez-nous directement
            </a>
          </p>

        </div>
      </div>
    </section>
  );
}
