import ButtonPill from "../atoms/ButtonPill";

export default function PaginationSimple({ page, totalPages, onPrev, onNext, className = "" }) {
    return (
        <div className={`mt-4 flex items-center justify-between ${className}`}>
            <div className="text-white/90 text-sm">Halaman {page} / {totalPages}</div>
            <div className="flex items-center gap-2">
                <ButtonPill onClick={onPrev} disabled={page <= 1}>‹ Sebelumnya</ButtonPill>
                <ButtonPill onClick={onNext} disabled={page >= totalPages}>Berikutnya ›</ButtonPill>
            </div>
        </div>
    );
}
