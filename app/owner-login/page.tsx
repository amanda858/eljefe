import Link from "next/link";
import { getOwnerLoginHint } from "@/lib/auth";
import { loginOwner } from "./actions";

type OwnerLoginPageProps = {
    searchParams: Promise<{
        error?: string;
        redirectTo?: string;
    }>;
};

export default async function OwnerLoginPage({ searchParams }: OwnerLoginPageProps) {
    const params = await searchParams;
    const redirectTo = params.redirectTo?.startsWith("/") ? params.redirectTo : "/dashboard";
    const showError = params.error === "invalid";

    return (
        <main className="page-shell auth-shell">
            <section className="content-section auth-panel">
                <div className="section-heading">
                    <p className="eyebrow">Owner access</p>
                    <h1 className="page-title">Owner login unlocks the full betting board with a user and password.</h1>
                    <p className="hero-text">
                        Enter the owner credentials to open the full board, market screens, season feed, moneyline engine,
                        and reviewed game information. This is a direct login gate for the complete platform.
                    </p>
                </div>

                <form action={loginOwner} className="auth-form">
                    <input type="hidden" name="redirectTo" value={redirectTo} />
                    <label className="auth-field">
                        <span>Email</span>
                        <input autoComplete="username" defaultValue={getOwnerLoginHint()} name="email" type="email" />
                    </label>
                    <label className="auth-field">
                        <span>Password</span>
                        <input autoComplete="current-password" name="password" type="password" />
                    </label>
                    {showError ? <p className="auth-error">Credentials were not accepted. Check the owner login values.</p> : null}
                    <button className="button button-primary" type="submit">
                        Sign in as owner
                    </button>
                </form>

                <div className="auth-footer">
                    <p>
                        Recommended setup: define `OWNER_EMAIL`, `OWNER_PASSWORD`, and `AUTH_SECRET` in your environment.
                    </p>
                    <Link className="button button-secondary" href="/dashboard">
                        Go to dashboard
                    </Link>
                </div>
            </section>
        </main>
    );
}