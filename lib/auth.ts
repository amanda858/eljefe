import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const SESSION_COOKIE = "eljefe_owner_session";
const SESSION_DURATION_SECONDS = 60 * 60 * 12;

type OwnerCredentialPair = {
    email: string;
    password: string;
};

function getOwnerCredentials() {
    return {
        email: process.env.OWNER_EMAIL ?? "jefe@eljefe.app",
        password: process.env.OWNER_PASSWORD ?? "ElJefeOwner2026!",
    };
}

function getAcceptedOwnerCredentials(): OwnerCredentialPair[] {
    const configured = getOwnerCredentials();
    const accepted: OwnerCredentialPair[] = [configured];

    if (!process.env.OWNER_EMAIL && !process.env.OWNER_PASSWORD) {
        accepted.push({
            email: "owner@eljefe.app",
            password: "eljefe-owner-pass",
        });
    }

    return accepted;
}

function getAuthSecret() {
    return process.env.AUTH_SECRET ?? "eljefe-dev-secret-change-me";
}

function signPayload(payload: string) {
    return createHmac("sha256", getAuthSecret()).update(payload).digest("hex");
}

export function validateOwnerCredentials(email: string, password: string) {
    return getAcceptedOwnerCredentials().some((owner) => email === owner.email.toLowerCase() && password === owner.password);
}

export function createOwnerSessionToken(email: string) {
    const expiresAt = Math.floor(Date.now() / 1000) + SESSION_DURATION_SECONDS;
    const payload = `${email}:${expiresAt}`;
    const signature = signPayload(payload);
    return `${payload}:${signature}`;
}

export function readOwnerSessionToken(token: string | undefined) {
    if (!token) {
        return null;
    }

    const [email, expiresAtValue, signature] = token.split(":");

    if (!email || !expiresAtValue || !signature) {
        return null;
    }

    const payload = `${email}:${expiresAtValue}`;
    const expectedSignature = signPayload(payload);

    const providedBuffer = Buffer.from(signature);
    const expectedBuffer = Buffer.from(expectedSignature);

    if (providedBuffer.length !== expectedBuffer.length) {
        return null;
    }

    if (!timingSafeEqual(providedBuffer, expectedBuffer)) {
        return null;
    }

    const expiresAt = Number(expiresAtValue);

    if (!Number.isFinite(expiresAt) || expiresAt <= Math.floor(Date.now() / 1000)) {
        return null;
    }

    return { email, expiresAt };
}

export async function getOwnerSession() {
    const cookieStore = await cookies();
    return readOwnerSessionToken(cookieStore.get(SESSION_COOKIE)?.value);
}

export async function setOwnerSession(email: string) {
    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE, createOwnerSessionToken(email), {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: SESSION_DURATION_SECONDS,
    });
}

export async function clearOwnerSession() {
    const cookieStore = await cookies();
    cookieStore.delete(SESSION_COOKIE);
}

export function getOwnerLoginHint() {
    return getOwnerCredentials().email;
}

export function getOwnerLoginDevCredentials() {
    if (process.env.OWNER_EMAIL || process.env.OWNER_PASSWORD) {
        return [] as OwnerCredentialPair[];
    }

    return getAcceptedOwnerCredentials();
}