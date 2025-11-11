export default function degToArah(deg) {
    const dirs = [
        "Utara", "Timur Laut", "Timur", "Tenggara",
        "Selatan", "Barat Daya", "Barat", "Barat Laut",
    ];
    const d = ((deg % 360) + 360) % 360;
    const idx = Math.round(d / 45) % 8;
    return dirs[idx];
}
