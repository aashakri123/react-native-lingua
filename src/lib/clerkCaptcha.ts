import { Platform } from "react-native";

export function ensureClerkCaptchaElement() {
  if (Platform.OS !== "web" || typeof document === "undefined") {
    return;
  }

  const existing = document.getElementById("clerk-captcha");
  if (existing) {
    existing.remove();
  }

  const captchaElement = document.createElement("div");
  captchaElement.id = "clerk-captcha";
  captchaElement.style.position = "absolute";
  captchaElement.style.width = "1px";
  captchaElement.style.height = "1px";
  captchaElement.style.opacity = "0";
  captchaElement.style.pointerEvents = "none";
  captchaElement.style.overflow = "hidden";
  document.body.appendChild(captchaElement);
}
