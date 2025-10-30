export default function degToArah(deg) {
    const dirs = [
        "Utara",       // 0°
        "Timur Laut",  // 45°
        "Timur",       // 90°
        "Tenggara",    // 135°
        "Selatan",     // 180°
        "Barat Daya",  // 225°
        "Barat",       // 270°
        "Barat Laut",  // 315°
    ];
    const d = ((deg % 360) + 360) % 360;
    const idx = Math.round(d / 45) % 8;
    return dirs[idx];
}
