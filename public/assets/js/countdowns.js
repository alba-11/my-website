document.addEventListener('DOMContentLoaded', function() {
    function calculateCountdown(targetDate) {
        const now = new Date();
        const target = new Date(targetDate);
        const timeDifference = target - now;
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        return days;
    }

    const countdownTillSee = calculateCountdown('June 24, 2025');
    document.getElementById('countdown-till-see').textContent = `${countdownTillSee} days`;

    const countdownAnniversary = calculateCountdown('February 18, 2026');
    document.getElementById('countdown-anniversary').textContent = `${countdownAnniversary} days`;
});