import Link from "next/link";
import { sportHubContent } from "@/lib/site-data";

export default function SportsIndexPage() {
    return (
        <main className="page-shell sports-shell">
            <section className="content-section">
                <div className="section-heading">
                    <p className="eyebrow">Sport hubs</p>
                    <h1 className="page-title">Choose the market where you want the sharpest information first.</h1>
                </div>
                <div className="sports-hub-grid">
                    {sportHubContent.map((hub) => (
                        <Link className="sports-hub-card" href={`/sports/${hub.sport.toLowerCase()}`} key={hub.sport}>
                            <p className="card-kicker">{hub.sport}</p>
                            <h3>{hub.title}</h3>
                            <p>{hub.lead}</p>
                        </Link>
                    ))}
                </div>
            </section>
        </main>
    );
}