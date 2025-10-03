// src/data/methods.js
import { Camera, IdCard, CreditCard, LogIn, ShieldCheck } from "lucide-react";
import DemoUploadID from "../components/age-verification/demos/DemoUploadID";
import DemoFaceEstimate from "../components/age-verification/demos/DemoFaceEstimate";
import DemoCardCheck from "../components/age-verification/demos/DemoCardCheck";
import DemoOIDC from "../components/age-verification/demos/DemoOIDC";
import DemoMDL from "../components/age-verification/demos/DemoMDL";

import faceStep1 from "../assets/face_step1.png";
import faceStep2 from "../assets/face_step2.png";
import faceStep3 from "../assets/face_step3.png";
import loginAcc1 from "../assets/login_account_step1.png";
import loginAcc2 from "../assets/login_account_step2.png";
import loginAcc3 from "../assets/login_account_step3.png";
import digitalStep1 from "../assets/digitalID_step1.png";
import digitalStep2 from "../assets/digitalID_step2.png";
import digitalStep3 from "../assets/digitalID_step3.png";
import digitalStep4 from "../assets/digitalID_step4.png";
import digitalStep5 from "../assets/digitalID_step5.png";
import creditStep1 from "../assets/credit_step1.png";
import creditStep2 from "../assets/credit_step2.png";
import idStep1 from "../assets/ID_step1.png";
import idStep2 from "../assets/ID_step2.png";
import idStep3 from "../assets/ID_step3.png";

export const METHODS = [
  {
    key: "upload-id",
    name: "Upload Your ID",
    icon: IdCard,
    color: "from-indigo-200 to-indigo-100",
    summary:
      "Verify your age by uploading a photo of your government-issued ID.",
    slides: [
      {
        kicker: "Step 1",
        title: "Take photos of your ID",
        body: "Take clear photos of the front and back of your ID and upload them.",
        image: idStep1,
        imageAlt: "Taking photo of ID illustration",
      },
      {
        kicker: "Step 2",
        title: "Upload photos",
        body: "The system scans the ID to verify its authenticity.",
        image: idStep2,
        imageAlt: "Uploading ID photos illustration",
      },
      {
        kicker: "Step 3",
        title: "Age verified!",
        body: "The system verifies the authenticity of your ID and confirms you are over 18.",
        image: idStep3,
        imageAlt: "Verified claim result illustration",
      },
    ],
    demo: DemoUploadID,
  },
  {
    key: "face-estimate",
    name: "Scan Your Face",
    icon: Camera,
    color: "from-indigo-200 to-indigo-100",
    summary: "Use your device's camera to estimate your age from a selfie.",
    slides: [
      {
        kicker: "Step 1",
        title: "Capture selfie",
        body: "You allow the camera and take a clear selfie.",
        image: faceStep1,
        imageAlt: "Face capture preparation illustration",
      },
      {
        kicker: "Step 2",
        title: "Local age estimation",
        body: "An on-device model estimates an age range. Only an over-18/under-18 result is returned.",
        image: faceStep2,
        imageAlt: "Estimating age on device illustration",
      },
      {
        kicker: "Step 3",
        title: "Age verified!",
        body: "An on-device model estimates an age range. Only an over-18/under-18 result is returned.",
        image: faceStep3,
        imageAlt: "Estimating age on device illustration",
      },
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
    slides: [
      {
        kicker: "Step 1",
        title: "Provide credit card details",
        body: "Enter your credit card number, expiration date, and CVV code.",
        image: creditStep1,
        imageAlt: "credit card details illustration",
      },
      {
        kicker: "Step 2",
        title: "Age verified!",
        body: "The site receives pre-verified information confirming you are over 18.",
        image: creditStep2,
        imageAlt: "Verified claim result illustration",
      },
    ],
    demo: DemoCardCheck,
  },
  {
    key: "oidc",
    name: "Log in With an Existing Account (Google, Apple, X/Twitter, Facebook)",
    icon: LogIn,
    color: "from-indigo-200 to-indigo-100",
    summary:
      "Sign in with an existing account to confirm your age via OpenID Connect.",

    slides: [
      {
        kicker: "Step 1",
        title: "Choose your provider",
        body: "Sign in with an existing account to confirm your age",
        image: loginAcc1,
        imageAlt: "Provider selection illustration",
      },
      {
        kicker: "Step 2",
        title: "Log in to your account",
        body: "The site redirects you to the account provider login page.",
        image: loginAcc2,
        imageAlt: "Account login and consent illustration",
      },
      {
        kicker: "Step 3",
        title: "Age verified!",
        body: "The site receives pre-verified information confirming you are over 18.",
        image: loginAcc3,
        imageAlt: "Verified claim result illustration",
      },
    ],
    demo: DemoOIDC,
  },
  {
    key: "mdl",
    name: "Use your Digital ID App (e.g., Yoti, ID.me, Mobile Driver's License)",
    icon: ShieldCheck,
    color: "from-indigo-200 to-indigo-100",
    summary:
      "Prove your age with a digital ID app such as Yoti, ID.me, or a Mobile Driver's License (mDL).",
    slides: [
      {
        kicker: "Step 1",
        title: "Download a digital ID app",
        body: "Install a digital ID app that supports age verification from your app store.",
        image: digitalStep1,
        imageAlt: "Provider selection illustration",
      },
      {
        kicker: "Step 2",
        title: "Scan your ID",
        body: "Use the app to scan your ID document.",
        image: digitalStep2,
        imageAlt: "Account login and consent illustration",
      },
      {
        kicker: "Step 3",
        title: "Add scanned document to your digital wallet",
        body: "The app verifies the document and adds it to your digital ID app.",
        image: digitalStep3,
        imageAlt: "Verified claim result illustration",
      },
      {
        kicker: "Step 4",
        title: "Scan QR code to verify age",
        body: "When prompted, open your digital ID app and scan the QR code to verify your age.",
        image: digitalStep4,
        imageAlt: "Verified claim result illustration",
      },
      {
        kicker: "Step 5",
        title: "Age verified!",
        body: "The app verifies your age and provides confirmation.",
        image: digitalStep5,
        imageAlt: "Verified claim result illustration",
      },
    ],
    how: [
      "Open your digital ID app or wallet on your mobile device.",
      "Select the appropriate credential (e.g., age verification).",
      "Share the required attributes (e.g., over-18 proof) via QR code, NFC, or other supported methods.",
    ],
    demo: DemoMDL,
  },
];
