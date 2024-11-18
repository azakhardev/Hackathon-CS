import H1 from "@/components/ui/typography/H1";

export default function MetricsPage() {
  return (
    <>
      <H1>Metrics</H1>
      <ul>
        <li>Stránka s grafy </li>
        <li>Kolik jobů běží pro devy, kolik pro opsy a jaký je jejich state</li>
        <li>
          Kolik runnerů je v jakém stavu + Např. u kterých runnerů dochází
          uložiště (jen alert) a když tak to dělat nemusíme
        </li>
        <li>
          Zobrazovat počet logů automatizací v určitém intervalu, tak by se
          mohla poznat jejich zatíženost
        </li>
        <li>
          Rozdělit automatizace dle typu (počet) a stavy všech automatizací
          (kolik INITIAL, FINISHED atd...)
        </li>
      </ul>
    </>
  );
}
