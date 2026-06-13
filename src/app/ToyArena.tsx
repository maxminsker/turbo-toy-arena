"use client";

import {
  CarFront,
  Flame,
  Gauge,
  Medal,
  Play,
  Swords,
  Trophy,
  Zap,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Vehicle, vehicles } from "./vehicles";

type GameMode = "race" | "battle";
type GamePhase = "idle" | "running" | "finished";

type RaceRun = {
  id: number;
  winnerId: string;
  finish: Record<string, number>;
  duration: Record<string, number>;
};

type BattleRun = {
  id: number;
  winnerId: string;
  health: Record<string, number>;
};

const statLabel: Record<keyof Pick<Vehicle, "speed" | "power" | "grip">, string> = {
  speed: "Speed",
  power: "Power",
  grip: "Grip",
};

function vehicleScore(vehicle: Vehicle, mode: GameMode) {
  if (mode === "race") {
    return vehicle.speed * 1.35 + vehicle.grip * 0.55 + vehicle.power * 0.15;
  }

  return vehicle.power * 1.45 + vehicle.grip * 0.3 + vehicle.speed * 0.15;
}

function pickWinner(pair: Vehicle[], mode: GameMode) {
  if (mode === "battle") {
    const graveDigger = pair.find((vehicle) => vehicle.id === "grave-digger");
    if (graveDigger) {
      return graveDigger;
    }
  }

  const [first, second] = pair;
  const firstScore = vehicleScore(first, mode) + Math.random() * 18;
  const secondScore = vehicleScore(second, mode) + Math.random() * 18;
  return firstScore >= secondScore ? first : second;
}

function ToyVehicle({
  vehicle,
  compact = false,
  facing = "right",
}: {
  vehicle: Vehicle;
  compact?: boolean;
  facing?: "left" | "right";
}) {
  const isMonster = vehicle.kind === "monster";

  return (
    <div
      className={[
        "toy-vehicle",
        isMonster ? "toy-vehicle-monster" : "",
        compact ? "toy-vehicle-compact" : "",
        facing === "left" ? "toy-vehicle-left" : "",
      ].join(" ")}
      style={
        {
          "--body": vehicle.colors.body,
          "--roof": vehicle.colors.roof,
          "--glass": vehicle.colors.glass,
          "--stripe": vehicle.colors.stripe,
          "--glow": vehicle.colors.glow,
        } as React.CSSProperties
      }
      aria-hidden="true"
    >
      <div className="toy-shadow" />
      <div className="toy-body">
        <div className="toy-roof" />
        <div className="toy-window toy-window-front" />
        <div className="toy-window toy-window-back" />
        <div className="toy-stripe" />
        <div className="toy-badge">{vehicle.shortName.slice(0, 1)}</div>
      </div>
      <div className="toy-wheel toy-wheel-left" />
      <div className="toy-wheel toy-wheel-right" />
      <div className="toy-spark toy-spark-one" />
      <div className="toy-spark toy-spark-two" />
    </div>
  );
}

function StatBars({ vehicle }: { vehicle: Vehicle }) {
  return (
    <div className="stat-bars" aria-label={`${vehicle.name} stats`}>
      {(["speed", "power", "grip"] as const).map((stat) => (
        <div className="stat-row" key={stat}>
          <span>{statLabel[stat]}</span>
          <div className="stat-track">
            <i style={{ width: `${vehicle[stat]}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function ToyArena() {
  const [mode, setMode] = useState<GameMode>("race");
  const [selectedIds, setSelectedIds] = useState<string[]>([
    "grave-digger",
    "neon-ninja",
  ]);
  const [phase, setPhase] = useState<GamePhase>("idle");
  const [raceRun, setRaceRun] = useState<RaceRun | null>(null);
  const [battleRun, setBattleRun] = useState<BattleRun | null>(null);

  const selectedVehicles = useMemo(
    () =>
      selectedIds
        .map((id) => vehicles.find((vehicle) => vehicle.id === id))
        .filter(Boolean) as Vehicle[],
    [selectedIds],
  );

  const winner =
    raceRun?.winnerId || battleRun?.winnerId
      ? vehicles.find(
          (vehicle) => vehicle.id === (raceRun?.winnerId || battleRun?.winnerId),
        )
      : null;

  function toggleVehicle(id: string) {
    setPhase("idle");
    setRaceRun(null);
    setBattleRun(null);
    setSelectedIds((current) => {
      if (current.includes(id)) {
        return current.length > 1 ? current.filter((item) => item !== id) : current;
      }

      return [...current.slice(-1), id];
    });
  }

  function startGame() {
    if (selectedVehicles.length !== 2 || phase === "running") {
      return;
    }

    const winnerVehicle = pickWinner(selectedVehicles, mode);
    setPhase("running");

    if (mode === "race") {
      const finish = Object.fromEntries(
        selectedVehicles.map((vehicle) => [
          vehicle.id,
          vehicle.id === winnerVehicle.id
            ? 94 + Math.random() * 3
            : 72 + Math.random() * 13,
        ]),
      ) as Record<string, number>;
      const duration = Object.fromEntries(
        selectedVehicles.map((vehicle) => [
          vehicle.id,
          vehicle.id === winnerVehicle.id ? 2.45 : 2.95 + Math.random() * 0.35,
        ]),
      ) as Record<string, number>;

      setBattleRun(null);
      setRaceRun({
        id: Date.now(),
        winnerId: winnerVehicle.id,
        finish,
        duration,
      });

      window.setTimeout(() => setPhase("finished"), 3050);
      return;
    }

    const loser = selectedVehicles.find((vehicle) => vehicle.id !== winnerVehicle.id);
    setRaceRun(null);
    setBattleRun({
      id: Date.now(),
      winnerId: winnerVehicle.id,
      health: {
        [winnerVehicle.id]: 54 + Math.round(Math.random() * 31),
        [loser?.id || ""]: 0,
      },
    });

    window.setTimeout(() => setPhase("finished"), 2500);
  }

  const canPlay = selectedVehicles.length === 2 && phase !== "running";

  return (
    <main className="arena-shell">
      <section className="arena-stage" aria-label="Turbo Toy Arena">
        <div className="city-grid" />
        <div className="scanlines" />
        <header className="arena-topbar">
          <div>
            <p className="eyebrow">Hank and Perry&apos;s</p>
            <h1>Turbo Toy Arena</h1>
          </div>
          <div className="mode-switch" role="tablist" aria-label="Game mode">
            <button
              className={mode === "race" ? "active" : ""}
              data-testid="mode-race"
              onClick={() => {
                setMode("race");
                setPhase("idle");
                setBattleRun(null);
              }}
              role="tab"
              aria-selected={mode === "race"}
            >
              <Gauge size={18} />
              Race
            </button>
            <button
              className={mode === "battle" ? "active" : ""}
              data-testid="mode-battle"
              onClick={() => {
                setMode("battle");
                setPhase("idle");
                setRaceRun(null);
              }}
              role="tab"
              aria-selected={mode === "battle"}
            >
              <Swords size={18} />
              Battle
            </button>
          </div>
        </header>

        <section className="play-zone" aria-live="polite">
          {mode === "race" ? (
            <div className="race-track">
              <div className="finish-line">Finish</div>
              {selectedVehicles.map((vehicle, index) => (
                <div className="race-lane" key={`${raceRun?.id || "idle"}-${vehicle.id}`}>
                  <div className="lane-label">
                    <span>{vehicle.name}</span>
                    <small>Lane {index + 1}</small>
                  </div>
                  <div
                    className={[
                      "lane-runner",
                      phase === "running" ? "is-racing" : "",
                      phase === "finished" && raceRun?.winnerId === vehicle.id
                        ? "winner"
                        : "",
                    ].join(" ")}
                    style={
                      {
                        "--finish": `${raceRun?.finish[vehicle.id] || 4}%`,
                        "--duration": `${raceRun?.duration[vehicle.id] || 0}s`,
                      } as React.CSSProperties
                    }
                  >
                    <ToyVehicle vehicle={vehicle} />
                    <div className="nitro-trail" />
                  </div>
                </div>
              ))}
              <div className="track-sparks" />
            </div>
          ) : (
            <div className="battle-stage">
              {selectedVehicles.map((vehicle, index) => {
                const isWinner = battleRun?.winnerId === vehicle.id;
                const health =
                  phase === "idle" ? 100 : battleRun?.health[vehicle.id] ?? 100;

                return (
                  <div
                    className={[
                      "battle-fighter",
                      index === 0 ? "fighter-left" : "fighter-right",
                      phase === "running" ? "is-battling" : "",
                      phase === "finished" && isWinner ? "winner" : "",
                    ].join(" ")}
                    key={`${battleRun?.id || "idle"}-${vehicle.id}`}
                  >
                    <div className="health-shell">
                      <span>{vehicle.name}</span>
                      <div className="health-bar">
                        <i style={{ width: `${health}%` }} />
                      </div>
                    </div>
                    <ToyVehicle vehicle={vehicle} facing={index === 0 ? "right" : "left"} />
                  </div>
                );
              })}
              <div className={phase === "running" ? "impact-burst active" : "impact-burst"}>
                <span />
                <span />
                <span />
              </div>
            </div>
          )}

          <div className="result-panel" data-testid="result-panel">
            {phase === "finished" && winner ? (
              <>
                <Trophy size={20} />
                <span>{winner.name} wins!</span>
              </>
            ) : phase === "running" ? (
              <>
                <Zap size={20} />
                <span>{mode === "race" ? "Full throttle!" : "Smash time!"}</span>
              </>
            ) : (
              <>
                <Medal size={20} />
                <span>Pick two rides, then hit play.</span>
              </>
            )}
          </div>
        </section>

        <section className="control-deck" aria-label="Vehicle controls">
          <div className="selected-strip">
            {selectedVehicles.map((vehicle) => (
              <div className="selected-card" key={vehicle.id}>
                <ToyVehicle vehicle={vehicle} compact />
                <div>
                  <strong>{vehicle.name}</strong>
                  <span>{vehicle.kind === "monster" ? "Monster truck" : "Toy racer"}</span>
                </div>
              </div>
            ))}
            <button
              className="play-button"
              data-testid="play-button"
              disabled={!canPlay}
              onClick={startGame}
            >
              {mode === "race" ? <Flame size={22} /> : <Play size={22} />}
              Go
            </button>
          </div>

          <div className="garage-grid">
            {vehicles.map((vehicle) => {
              const selected = selectedIds.includes(vehicle.id);
              return (
                <button
                  className={selected ? "garage-card selected" : "garage-card"}
                  data-testid={`vehicle-${vehicle.id}`}
                  key={vehicle.id}
                  onClick={() => toggleVehicle(vehicle.id)}
                  aria-pressed={selected}
                >
                  <div className="garage-art">
                    <ToyVehicle vehicle={vehicle} compact />
                  </div>
                  <div className="garage-copy">
                    <span className="garage-name">{vehicle.name}</span>
                    <span className="garage-badge">
                      <CarFront size={14} />
                      {vehicle.badge}
                    </span>
                  </div>
                  <StatBars vehicle={vehicle} />
                </button>
              );
            })}
          </div>
        </section>
      </section>
    </main>
  );
}
