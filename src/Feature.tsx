import { useSharedHost } from "@baditaflorin/mesh-common";
import type { MeshConfig, YRoom } from "@baditaflorin/mesh-common";

type Props = { room: YRoom | null; config: MeshConfig };

export function Feature({ room, config }: Props) {
  const shared = useSharedHost(room);
  const mine = Boolean(room && shared.host?.peerId === room.peerId);
  const claimedAt = shared.host
    ? new Date(shared.host.claimedAt).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : null;
  const status = !room
    ? "Connecting to the room…"
    : mine
      ? "You are hosting the room."
      : shared.host
        ? "Another peer is hosting the room."
        : "The host role is open.";

  return (
    <main className="handoff-board">
      <p className="eyebrow">Shared facilitation</p>
      <h1>{config.appName}</h1>
      <p className="lede">
        Keep one lightweight host role visible to everyone in the room, then release it when it is
        time for someone else to lead.
      </p>
      <section className={mine ? "host-card is-mine" : "host-card"} aria-labelledby="host-title">
        <div className="host-icon" aria-hidden="true">
          {mine ? "★" : shared.host ? "●" : "○"}
        </div>
        <div className="host-copy">
          <h2 id="host-title">Current host</h2>
          <p aria-live="polite" className="host-status">
            {status}
          </p>
          {claimedAt ? <p className="timestamp">Claimed at {claimedAt}</p> : null}
        </div>
      </section>
      <div className="handoff-actions" aria-label="Host controls">
        {mine ? (
          <button type="button" className="primary" onClick={shared.release}>
            Release for handoff
          </button>
        ) : (
          <button
            type="button"
            className="primary"
            disabled={!room || Boolean(shared.host)}
            onClick={shared.claim}
          >
            Claim host role
          </button>
        )}
      </div>
      <aside className="handoff-tip">
        <h2>How a handoff works</h2>
        <ol>
          <li>The next facilitator is ready.</li>
          <li>
            The current host selects <strong>Release for handoff</strong>.
          </li>
          <li>
            The next facilitator selects <strong>Claim host role</strong>.
          </li>
        </ol>
      </aside>
    </main>
  );
}
