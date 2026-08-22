import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { createMockRoom } from "@baditaflorin/mesh-common/testing";
import { Feature } from "../../src/Feature";
import { config } from "../../src/config";

describe("Feature", () => {
  it("lets a connected peer claim and release the host role", () => {
    const room = createMockRoom({ peerId: "facilitator" });
    render(<Feature room={room} config={config} />);

    expect(screen.getByText("The host role is open.")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Claim host role" }));
    expect(screen.getByText("You are hosting the room.")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Release for handoff" }));
    expect(screen.getByText("The host role is open.")).toBeInTheDocument();
  });

  it("waits for a room before allowing a claim", () => {
    render(<Feature room={null} config={config} />);
    expect(screen.getByRole("button", { name: "Claim host role" })).toBeDisabled();
    expect(screen.getByText("Connecting to the room…")).toBeInTheDocument();
  });
});
