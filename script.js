
window.addEventListener("load", () => {
    setTimeout(() => {
        const loader = document.getElementById("loader");
        if (loader) loader.style.display = "none";
    }, 2000);
});

const bookButtons = document.querySelectorAll(".nav-btn, #heroBookBtn");
bookButtons.forEach(button => {
    button.addEventListener("click", () => {
        document.getElementById("booking").scrollIntoView({ behavior: "smooth" });
    });
});


const watchTrailerButton = document.getElementById("watchTrailerBtn");
if (watchTrailerButton) {
    watchTrailerButton.addEventListener("click", () => {
        const trailerSec = document.getElementById("trailer");
        trailerSec.scrollIntoView({ behavior: "smooth" });
        
        const trailerVideo = document.getElementById("officialTrailerVideo");
        if (trailerVideo) {
            trailerVideo.muted = false; // Sound chalu kar dega
            trailerVideo.play().catch(e => console.log("Playback error:", e));
        }
    });
}


const showButtons = document.querySelectorAll(".showtimes button");
let selectedTime = "2:00 PM";

showButtons.forEach(button => {
    button.addEventListener("click", () => {
        selectedTime = button.innerText.trim();
        showButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");
    });
});
function toggleDropdown(id) {
    const el = document.getElementById(id);
    el.classList.toggle("hidden");
}

function selectVal(inputId, val, textId, optionsId) {
    document.getElementById(inputId).value = val;
    document.getElementById(textId).innerHTML = '<span>' + val + '</span><span style="color: #f29f05; font-size: 11px;">▼</span>';
    document.getElementById(optionsId).classList.add("hidden");
}
const continueBtn = document.getElementById("continueBtn");
const step1 = document.getElementById("step1");
const step2 = document.getElementById("step2");

const cinemaSelect = document.getElementById("cinema");
const dateSelect = document.getElementById("date");
const ticketsInput = document.getElementById("tickets");

if (continueBtn) {
    continueBtn.addEventListener("click", () => {
        let count = Number(ticketsInput.value);
        if (count < 1) count = 1;
        if (count > 10) count = 10;
        ticketsInput.value = count;

        let total = count * 1000;

        document.getElementById("selectedCinema").innerText = cinemaSelect.value;
        document.getElementById("selectedDate").innerText = dateSelect.value;
        document.getElementById("selectedTime").innerText = selectedTime;
        document.getElementById("selectedTickets").innerText = count;
        document.getElementById("totalPrice").innerText = `PKR ${total}`;

        step1.classList.add("hidden");
        step2.classList.remove("hidden");
    });
}

const completeBookingBtn = document.getElementById("completeBooking");

if (completeBookingBtn) {
    completeBookingBtn.addEventListener("click", () => {
        const cardNumber = document.getElementById("cardNumber").value.trim();
        const cardName = document.getElementById("cardName").value.trim();
        const paymentMessage = document.getElementById("paymentMessage");

        const namePattern = /^[A-Za-z\s]+$/;
         if (cardNumber.length < 16) {
            paymentMessage.innerText = "Please enter a valid 16-digit card number.";
            paymentMessage.style.color = "#ff6b6b";
            return;
         } else if (!namePattern.test(cardName)) {
            paymentMessage.innerText = "Please enter a valid name (letters only).";
            paymentMessage.style.color = "#ff6b6b";
            return;
         }

        if (cardName === "") {
            paymentMessage.innerText = "Please enter card holder name.";
            paymentMessage.style.color = "#ff6b6b";
            return;
        }

        paymentMessage.innerText = "Processing Booking...";
        paymentMessage.style.color = "#f29f05";

        const confirmationSec = document.getElementById("confirmation");
        const ticketAnim = document.getElementById("ticketAnimation");
        const ticketVideo = document.getElementById("ticketVideoAnim");
        const confirmedCard = document.getElementById("confirmedCard");

        confirmationSec.classList.remove("hidden");
        ticketAnim.classList.remove("hidden");
        confirmedCard.classList.add("hidden");

        confirmationSec.scrollIntoView({ behavior: "smooth" });

        if (ticketVideo) {
            ticketVideo.currentTime = 0;
            ticketVideo.play().catch(e => console.log("Video autoplay prevented:", e))
            ticketVideo.onended = () => {
                ticketAnim.classList.add("hidden");
                confirmedCard.classList.remove("hidden");

                const bookingId = "CB" + Math.floor(1000 + Math.random() * 9000);
                document.getElementById("bookingId").innerText = bookingId;
                document.getElementById("ticketDetails").innerText = 
                    `${dateSelect.value} • ${selectedTime} • ${ticketsInput.value} Ticket(s) • ${cinemaSelect.value}`;
            };
        }
    });
}

let isBookingCompleted = false;

if (completeBookingBtn) {
    completeBookingBtn.addEventListener("click", () => {
        if (ticketVideo) {
            ticketVideo.onended = () => {
                ticketAnim.classList.add("hidden");
                confirmedCard.classList.remove("hidden");

                const bookingId = "CB" + Math.floor(1000 + Math.random() * 9000);
                document.getElementById("bookingId").innerText = bookingId;
                document.getElementById("ticketDetails").innerText = 
                    `${dateSelect.value} • ${selectedTime} • ${ticketsInput.value} Ticket(s) • ${cinemaSelect.value}`;
                isBookingCompleted = true;
            };
        }
    });
}


document.querySelectorAll("nav ul li a, .logo, .hero-buttons button").forEach(element => {
    element.addEventListener("click", () => {
        if (isBookingCompleted) {
            window.location.reload();
        }
    });
});