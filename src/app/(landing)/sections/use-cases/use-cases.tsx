import Link from "next/link";

import documentationRoutes from "@/constants/documentationRoutes";

import { Box, Button, Container, Stack, Typography } from "@mui/material";

import ArtificialInteligence from "./icons/artificial-inteligence";
import Education from "./icons/education";
import FinancialServices from "./icons/financial-services";
import Gaming from "./icons/gaming";
import LoyaltyProgram from "./icons/loyalty-program";
import SocialNetworks from "./icons/social-networks";

const useCases = [
  {
    icon: ArtificialInteligence,
    title: "Artificial Inteligence",
    description: "Enable ownership over inferences, generations, and usage.",
  },
  {
    icon: LoyaltyProgram,
    title: "Loyalty Program",
    description: "Prove your knowledge and education across hiring platforms.",
  },
  {
    icon: FinancialServices,
    title: "Financial Services",
    description:
      "Control access to your data for custom loans or product access.",
  },
  {
    icon: Gaming,
    title: "Gaming",
    description:
      "Build and share your gaming reputation to unlock experiences. ",
  },
  {
    icon: SocialNetworks,
    title: "Social Networks",
    description: "Own your social reputation and experiences across the web.",
  },
  {
    icon: Education,
    title: "Education",
    description:
      "Prove your skills and references across professional networks.",
  },
];

export default function UseCases() {
  return (
    <Box
      component={Container}
      sx={{
        pt: 15,
        pb: 15,
      }}
    >
      <Stack
        gap={2}
        sx={{
          mb: 3,
          maxWidth: {
            sm: 540,
          },
        }}
      >
        <Typography component="h2" variant="subtitle1" color="secondary.dark">
          Use Cases
        </Typography>
        <Typography variant="h3">Tooling for any use case</Typography>
        <Typography paragraph>
          Gateway is designed to seamlessly integrate with your existing data
          stack enabling use-cases across user sensitive industries.
        </Typography>
      </Stack>
      <Button
        component={Link}
        href={documentationRoutes.useCases}
        target="_blank"
        size="large"
        variant="outlined"
        color="secondary"
      >
        Learn more
      </Button>
      <Box
        sx={{
          mt: {
            xs: 8,
            md: 6,
          },
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(1, 1fr)",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(4, 1fr)",
          },
          gap: 3,
        }}
      >
        {useCases.map((useCase, index) => (
          <Stack key={index}>
            <useCase.icon
              sx={{
                width: { xs: 48, md: 56 },
                height: { xs: 48, md: 56 },
                mb: 2,
              }}
            />
            <Typography variant="subtitle1">{useCase.title}</Typography>
            <Typography variant="body1">{useCase.description}</Typography>
          </Stack>
        ))}
      </Box>
    </Box>
  );
}
