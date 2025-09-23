import { Camera, IdCard, CreditCard, LogIn, ShieldCheck } from "lucide-react";
import DemoUploadID from "../components/age-verification/demos/DemoUploadID";
import DemoFaceEstimate from "../components/age-verification/demos/DemoFaceEstimate";
import DemoCardCheck from "../components/age-verification/demos/DemoCardCheck";
import DemoOIDC from "../components/age-verification/demos/DemoOIDC";
import DemoMDL from "../components/age-verification/demos/DemoMDL";

export const METHODS = [
  {
    key: "upload-id",
    name: "Upload Your ID",
    icon: IdCard,
    color: "from-indigo-200 to-indigo-100",
    summary:
      "Verify your age by uploading a photo of your government-issued ID.",
    how: [
      "Take clear photos of the front and back of your ID.",
      "The system scans the ID to verify its authenticity and checks for tampering.",
      "Your date of birth is extracted to confirm if you are over 18.",
    ],
    demo: DemoUploadID,
  },
  {
    key: "face-estimate",
    name: "Scan Your Face",
    icon: Camera,
    color: "from-indigo-200 to-indigo-100",
    summary: "Use your device's camera to estimate your age from a selfie.",
    how: [
      "Give your consent and take a selfie.",
      "An on-device model analyzes your face to estimate your age range.",
      "If the estimated age meets the threshold, you are verified as over 18.",
    ],
    demo: DemoFaceEstimate,
  },
  {
    key: "card-check",
    name: "Verify with Your Credit Card",
    icon: CreditCard,
    color: "from-indigo-200 to-indigo-100",
    summary:
      "Confirm your age using a $0 authorization check with your card issuer.",
    how: [
      "Perform a $0 authorization (no charges will be made).",
      "The card issuer confirms your date of birth or verifies you are over 18.",
    ],
    demo: DemoCardCheck,
  },
  {
    key: "oidc",
    name: "Log in With an Existing Account (Google, Apple, X/Twitter, Facebook)",
    icon: LogIn,
    color: "from-indigo-200 to-indigo-100",
    summary:
      "Sign in with an existing account (Google, Apple, Facebook, or X/Twitter) to confirm your age.",
    how: [
      "Redirect to your identity provider (e.g., Google, Microsoft).",
      "Log in and give consent to share your age information.",
      "The system retrieves your date of birth or an over-18 confirmation.",
    ],
    demo: DemoOIDC,
  },
  {
    key: "mdl",
    name: "Use your Digital ID App (e.g., Yoti, ID.me, Mobile Driver's License)",
    icon: ShieldCheck,
    color: "from-indigo-200 to-indigo-100",
    summary:
      "Prove your age with a digital ID app on your mobile device such as Yoti, ID.me, or a Mobile Driver's License (mDL).",
    how: [
      "Open your digital ID app or wallet on your mobile device.",
      "Select the appropriate credential (e.g., age verification).",
      "Share the required attributes (e.g., over-18 proof) via QR code, NFC, or other supported methods.",
    ],
    demo: DemoMDL,
  },
];
