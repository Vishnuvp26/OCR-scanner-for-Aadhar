export function cleanAddress(rawAddress: string): string {
    if (!rawAddress) return "";

    let addr = rawAddress;

    addr = addr
        .split('\n')
        .filter(line => line.trim().toLowerCase() !== 'goa')
        .join(' ');

    addr = addr.replace(/\b5\/0\b/g, "S/0");
    addr = addr.replace(/Bat ee :/gi, "");  
    addr = addr.replace(/5\.0/gi, "");       
    addr = addr.replace(/ww aE A/gi, "");
    addr = addr.replace(/8\s*-\s*67 El/gi, "");
    addr = addr.replace(/\s{2,}/g, " ");    

    addr = addr.replace(/\s*,\s*/g, ", ");
    addr = addr.replace(/\s*:\s*/g, ": ");

    addr = addr.replace(/\bDIST\b/gi, "Dist");
    addr = addr.replace(/\bS\/O\b/gi, "S/O");

    addr = addr.replace(/[\u0900-\u097F]/g, ''); 
    addr = addr.replace(/[^\x00-\x7F]/g, '');   

    addr = addr.replace(/\s{2,}/g, " ").trim();

    if (!addr.toLowerCase().includes("kerala")) {
        addr = addr.trim() + ", Kerala";
    }

    return addr.trim();
}