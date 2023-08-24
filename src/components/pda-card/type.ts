import { CredentialStatus } from "@/services/protocol/types";

export type PdaCardProps = {
    dashed?: boolean;
    href: string;
    issuerName: string;
    issuerImage?: string | null;
    name: string;
    status: CredentialStatus;
};
