import { NextResponse } from "next/server";
import { SisterSyncState, TradeOffer } from "@/app/rpg/rpgTypes";

// In-memory player states (synchronized across tablets connected to the server)
const activePlayers: Record<string, SisterSyncState> = {};
let activeTradeSession: {
  biancaSlot: TradeOffer | null;
  ceciliaSlot: TradeOffer | null;
  completedAt?: number;
} = {
  biancaSlot: null,
  ceciliaSlot: null,
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (body.resetAll) {
      delete activePlayers["Bianca"];
      delete activePlayers["Cecília"];
      activeTradeSession = { biancaSlot: null, ceciliaSlot: null };
      return NextResponse.json({ success: true, reset: true });
    }
    const {
      sisterName,
      x,
      y,
      drawX,
      drawY,
      facing = "down",
      isMoving = false,
      isSurfing = false,
      interiorId = null,
      interiorFloor = null,
      currentZone = "Pallet Town",
      customization,
      activePokemonName,
      tradeOffer,
      tradeAction,
    } = body;

    if (!sisterName || (sisterName !== "Bianca" && sisterName !== "Cecília")) {
      return NextResponse.json({ error: "Invalid sister name" }, { status: 400 });
    }

    const now = Date.now();

    // Update current player's state
    activePlayers[sisterName] = {
      sisterName,
      x: typeof x === "number" ? x : 32,
      y: typeof y === "number" ? y : 154,
      drawX: typeof drawX === "number" ? drawX : typeof x === "number" ? x : 32,
      drawY: typeof drawY === "number" ? drawY : typeof y === "number" ? y : 154,
      facing,
      isMoving: Boolean(isMoving),
      isSurfing: Boolean(isSurfing),
      interiorId: interiorId || null,
      interiorFloor: typeof interiorFloor === "number" ? interiorFloor : null,
      currentZone: currentZone || "Pallet Town",
      customization,
      activePokemonName,
      lastSeen: now,
      tradeOffer: tradeOffer || null,
    };

    // Handle Trade Actions
    if (tradeAction === "offer" && tradeOffer) {
      if (sisterName === "Bianca") {
        activeTradeSession.biancaSlot = tradeOffer;
      } else {
        activeTradeSession.ceciliaSlot = tradeOffer;
      }
    } else if (tradeAction === "cancel") {
      activeTradeSession = { biancaSlot: null, ceciliaSlot: null };
    } else if (tradeAction === "complete") {
      activeTradeSession.completedAt = now;
    }

    // Determine other sister's presence
    const otherSisterName = sisterName === "Bianca" ? "Cecília" : "Bianca";
    const otherPlayer = activePlayers[otherSisterName];
    const isOtherOnline = otherPlayer && now - otherPlayer.lastSeen < 15000;

    return NextResponse.json({
      success: true,
      otherPlayer: isOtherOnline ? otherPlayer : null,
      tradeSession: activeTradeSession,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Sync failed" }, { status: 500 });
  }
}

export async function GET() {
  const now = Date.now();
  const online = Object.values(activePlayers).filter((p) => now - p.lastSeen < 15000);
  return NextResponse.json({
    onlinePlayers: online,
    activeTrade: activeTradeSession,
  });
}
