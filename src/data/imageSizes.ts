// Generated from public/assets by a build-time sweep. Declaring intrinsic
// dimensions on every <img> lets the browser reserve space, which is the CLS
// half of Core Web Vitals — without them every image on the page reflows as
// it arrives. Regenerate whenever an asset is replaced.
export const imageSize: Record<string, [number, number]> = {
  "/assets/byahero-prev-sc.webp": [
    1600,
    1611
  ],
  "/assets/byahero-sc-1.webp": [
    1600,
    1603
  ],
  "/assets/byahero-sc-2.webp": [
    1600,
    1613
  ],
  "/assets/byahero-sc-3.webp": [
    1600,
    1593
  ],
  "/assets/byahero-sc-4.webp": [
    1600,
    1584
  ],
  "/assets/cs09_lead_route_cover.webp": [
    1366,
    820
  ],
  "/assets/cs1_portfolio_cover.webp": [
    1366,
    820
  ],
  "/assets/cs3_solar_roi_cover.webp": [
    1366,
    820
  ],
  "/assets/cs5_prop_connect.webp": [
    1366,
    820
  ],
  "/assets/cs_8_voice_appointment_setter.webp": [
    1600,
    962
  ],
  "/assets/cyclistance-sc-1.webp": [
    850,
    1850
  ],
  "/assets/cyclistance-sc-2.webp": [
    862,
    1824
  ],
  "/assets/cyclistance-sc-3.webp": [
    960,
    1638
  ],
  "/assets/cyclistance-sc-4.webp": [
    862,
    1824
  ],
  "/assets/liquidity-hq-cover.webp": [
    1400,
    755
  ],
  "/assets/liquidity-hq-sc-1.webp": [
    1600,
    862
  ],
  "/assets/liquidity-hq-sc-2.webp": [
    1600,
    801
  ],
  "/assets/liquidity-hq-sc-3.webp": [
    1600,
    868
  ],
  "/assets/liquidity-hq-sc-4.webp": [
    1600,
    853
  ],
  "/assets/og-cover.png": [
    1200,
    630
  ],
  "/assets/profile-picture.webp": [
    96,
    96
  ],
  "/assets/reconciliation-pipeline.webp": [
    1536,
    1024
  ]
};

export const sizeOf = (src: string): { width?: number; height?: number } => {
  const d = imageSize[src];
  return d ? { width: d[0], height: d[1] } : {};
};
