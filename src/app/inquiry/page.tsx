import type { Metadata } from "next";
import InquiryClient from "@/components/inquiry/InquiryClient";

export const metadata: Metadata = {
  title: "Your Inquiry — Stillness Bee Honey",
  description:
    "Complete your product inquiry. No payment required — our team will contact you directly to discuss your order.",
};

export default function InquiryPage() {
  return <InquiryClient />;
}
