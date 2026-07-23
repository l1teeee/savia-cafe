import { ImageResponse } from "next/og";
import { site } from "@/config/site";

export const socialImageSize = {
  width: 1200,
  height: 630,
};

export const socialImageContentType = "image/png";

export function createSocialImage(): ImageResponse {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#432724",
          color: "#F4EFE9",
          padding: "56px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            borderRadius: "28px",
            background: "#FEF9F2",
            color: "#3D2923",
            padding: "64px 72px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
            <div
              style={{
                width: "18px",
                height: "18px",
                borderRadius: "999px",
                background: "#82B84B",
              }}
            />
            <span style={{ fontSize: "24px", letterSpacing: "0.14em" }}>
              {site.descriptor.toUpperCase()}
            </span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
            <div style={{ fontSize: "76px", fontWeight: 300, lineHeight: 1.05 }}>
              {site.tagline}
            </div>
            <div style={{ fontSize: "34px", color: "#63463B" }}>{site.name}</div>
          </div>
        </div>
      </div>
    ),
    socialImageSize
  );
}
