import { createMeshConfig } from "@baditaflorin/mesh-common";

export const config = createMeshConfig({
  appName: "Mesh Host Handoff",
  description: "Claim and release a lightweight host role as a group moves through a session.",
  accentHex: "#ef7d4d",
  version: __APP_VERSION__,
  commit: __GIT_COMMIT__,
});
