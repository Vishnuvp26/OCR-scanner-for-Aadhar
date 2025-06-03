import { VALID } from "../validation/regex";
import { cleanAddress } from "./cleaner";

function extractName(text: string): string {
    const lines = text.split('\n').map(l => l.trim()).filter(Boolean);

    const namePattern = /([A-Z][a-z]*\s+[A-Z](?:[a-z]*|\.)?(?:\s+[A-Z](?:[a-z]*|\.)?)*)/g;

    let candidates: string[] = [];

    for (const line of lines) {
        const matches = line.match(namePattern);
        if (matches) {
            matches.forEach(m => {
                if (m.trim().split(/\s+/).length >= 2) {
                    candidates.push(m.trim());
                }
            });
        }
    }

    if (candidates.length === 0) return '';

    candidates.sort((a, b) => b.length - a.length);

    return candidates[0];
}


export function extractDetails(text: string) {
    const name = extractName(text);
    const dobMatch = text.match(VALID.DOB);
    const genderMatch = text.match(VALID.GENDER);
    const aadhaarMatch = text.match(VALID.AADHAAR_NUMBER);
    const addressMatch = text.match(VALID.ADDRESS);

    return {
        name: name || "",
        dob: dobMatch?.[1] || "",
        gender: genderMatch?.[0] || "",
        aadhaarNumber: aadhaarMatch?.[0] || "",
        address: addressMatch ? cleanAddress(addressMatch[1]) : "",
    };
}