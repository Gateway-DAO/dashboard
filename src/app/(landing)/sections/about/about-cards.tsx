"use client";

import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "./styles.css";

import { Card, Typography } from "@mui/material";

import EncryptedDataVaults from "./icons/encrypted-data-vaults";
import OnChainCoordination from "./icons/on-chain-coordination";
import ProgrammaticAccessControl from "./icons/programmatic-access-control";
import VerifiablePrivateCompute from "./icons/verifiable-private-compute";

const cards = [
  {
    icon: EncryptedDataVaults,
    title: "Encrypted Data Vaults",
    text: "Gateway's secure, decentralized, and privacy preserving storage network.",
  },
  {
    icon: ProgrammaticAccessControl,
    title: "Programmatic Access Control",
    text: "We are enabling secure off-chain data requesting and sharing by leveraging proxy re-encryption tied to our",
  },
  {
    icon: VerifiablePrivateCompute,
    title: "Verifiable Private Compute",
    text: "Gateway is the first FHE based computation network for enabling private data building blocks.",
  },
  {
    icon: OnChainCoordination,
    title: "On-Chain Coordination",
    text: "A global data audit trail which verifies data interactions like storage, requests, shares, and compute.",
  },
];

function AboutCard({
  icon: Icon,
  title,
  text,
}: (typeof cards)[0] & { isFirst?: boolean; isLast?: boolean }) {
  return (
    <Card
      variant="outlined"
      sx={{
        p: {
          xs: 2,
          md: 3,
          lg: 4,
        },
        minHeight: 316,
        height: "100%",
        width: {
          xs: "calc(100% - (5 * 16px))",
          md: "calc(100% - (9 * 16px))",
          lg: "unset",
        },
      }}
    >
      <Icon
        sx={{
          mb: 8,
          width: 56,
          height: 56,
        }}
      />
      <Typography variant="subtitle1">{title}</Typography>
      <Typography variant="body1">{text}</Typography>
    </Card>
  );
}

export default function AboutCards() {
  return (
    <>
      <Swiper
        pagination={{
          enabled: true,
        }}
        slidesPerView={1}
        spaceBetween={18}
        slidesOffsetBefore={24}
        slidesOffsetAfter={-24}
        modules={[Pagination]}
        breakpoints={{
          900: {
            slidesPerView: 2,
            spaceBetween: -76,
            slidesOffsetBefore: 48,
            slidesOffsetAfter: -48,
            pagination: {
              enabled: true,
            },
          },
          1200: {
            slidesPerView: 4,
            spaceBetween: 16,
            slidesOffsetBefore: 0,
            slidesOffsetAfter: 0,
            pagination: {
              enabled: false,
            },
          },
        }}
      >
        {cards.map((card, index) => (
          <SwiperSlide key={index}>
            <AboutCard
              {...card}
              isFirst={index === 0}
              isLast={index === cards.length - 1}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
