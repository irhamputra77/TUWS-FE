export function degToArah(deg = 0) {
    // 8-arah (Indonesia): U, TL, T, TG, S, BD, B, BL
    const arah = ["U", "TL", "T", "TG", "S", "BD", "B", "BL"];
    const idx = Math.round(((deg % 360) + 360) % 360 / 45) % 8;
    return arah[idx];
}
