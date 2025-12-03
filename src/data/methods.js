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
    name: "Government-issued ID Scan",
    icon: IdCard,
    color: "from-indigo-200 to-indigo-100",
    summary: "Verify your age by scanning your government-issued ID.",
    slides: [
      {
        kicker: "Step 1",
        title: "Scan Your Government-Issued ID",
        body: "The website or app asks you to scan the front and back of your government-issued ID.",
        image: idStep1,
        imageAlt: "Taking photo of ID illustration",
      },
      {
        kicker: "Step 2",
        title: "ID Validation",
        body: "A computer program on the website or app automatically verifies the date of birth on your government-issued ID.",
        image: idStep2,
        imageAlt: "Uploading ID photos illustration",
      },
      {
        kicker: "Step 3",
        title: "Age Verification",
        body: "The website or app only finds out if you meet their minimum age requirement. No other information is shared with the website or app.",
        image: idStep3,
        imageAlt: "Verified claim result illustration",
      },
    ],
    demo: DemoUploadID,
  },
  {
    key: "face-estimate",
    name: "Facial Age Estimation with a Selfie",
    icon: Camera,
    color: "from-indigo-200 to-indigo-100",
    summary: "Use your device's camera to estimate your age from a selfie.",
    slides: [
      {
        kicker: "Step 1",
        title: "Take a Selfie",
        body: "The website or app asks you to take a clear selfie with the camera of your device.",
        image: faceStep1,
        imageAlt: "Face capture preparation illustration",
      },
      {
        kicker: "Step 2",
        title: "Age Estimation",
        body: "A computer program on the website or app automatically estimates your age based on the selfie.",
        image: faceStep2,
        imageAlt: "Estimating age on device illustration",
      },
      {
        kicker: "Step 3",
        title: "Age Verification",
        body: "The website or app only finds out if you meet their minimum age requirement. No other information is shared with the website or app.",
        image: faceStep3,
        imageAlt: "Estimating age on device illustration",
      },
    ],
    demo: DemoFaceEstimate,
  },
  {
    key: "card-check",
    name: "Credit Card",
    icon: CreditCard,
    color: "from-indigo-200 to-indigo-100",
    summary: "Confirm your age by providing your credit card details.",
    slides: [
      {
        kicker: "Step 1",
        title: "Provide Credit Card Details",
        body: "The website or app asks you to enter your credit card number, expiration date, and CVV code.",
        image: creditStep1,
        imageAlt: "credit card details illustration",
      },
      {
        kicker: "Step 2",
        title: "Credit Card Validation",
        body: "The website or app makes a $0 charge to your credit card to validate that it exists. No other information is shared with the website or app.",
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
    summary: "Sign in with an existing account to confirm your age.",

    slides: [
      {
        kicker: "Step 1",
        title: "Choose Your Provider",
        body: "The website or app offers you a list of big online services where you may already have an account. Commonly, these are accounts at Google, Apple, X/Twitter, and Facebook.",
        image: loginAcc1,
        imageAlt: "Provider selection illustration",
      },
      {
        kicker: "Step 2",
        title: "Log in to Your Existing Account",
        body: "The website or app opens a new window where you log in to the existing account. Your password is never shared.",
        image: loginAcc2,
        imageAlt: "Account login and consent illustration",
      },
      {
        kicker: "Step 3",
        title: "Age Verification",
        body: "Your existing account provider simply confirms to the website or app whether you meet their minimum age requirement using your existing account. No other information is shared with the website or app.",
        image: loginAcc3,
        imageAlt: "Verified claim result illustration",
      },
    ],
    demo: DemoOIDC,
  },
  {
    key: "mdl",
    name: "Use a Digital ID App (e.g., Yoti, Mobile Driver's License)",
    icon: ShieldCheck,
    color: "from-indigo-200 to-indigo-100",
    summary:
      "Prove your age with a digital ID app such as Yoti, Mobile Driver's License.",
    slides: [
      {
        kicker: "Step 1",
        title: "Install a Digital ID App",
        body: "Install a digital ID app (e.g., ID.me) on your phone. A digital ID app lets you safely store your personal details and securely prove your identity or age to others.",
        image: digitalStep1,
        imageAlt: "Provider selection illustration",
      },
      {
        kicker: "Step 2",
        title: "Scan Your Government-Issued ID",
        body: "Use the digital ID app on your phone to scan your government-issued ID document.",
        image: digitalStep2,
        imageAlt: "Account login and consent illustration",
      },
      {
        kicker: "Step 3",
        title: "Add Your ID Documents",
        body: "The digital ID app verifies the ID document and stores it securely on your phone.",
        image: digitalStep3,
        imageAlt: "Verified claim result illustration",
      },
      {
        kicker: "Step 4",
        title: "Scan the QR code to Verify Your Age",
        body: "When asked by a website or app to verify your age, open your digital ID app and use it to scan the QR code.",
        image: digitalStep4,
        imageAlt: "Verified claim result illustration",
      },
      {
        kicker: "Step 5",
        title: "Age Verification",
        body: "The digital ID app simply confirms to the website or app whether you meet their minimum age requirement. No other information is shared with the website or app.",
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
