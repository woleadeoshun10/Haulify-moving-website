/*
 Basic JAVASCRIPT for Bootstrap Haulify Website
 Author: Adewole Adeoshun
*/

// Save quote to firestore
async function addQuoteToFirestore(from, to, size) {
  return await addDoc(collection(window.db, "quotes"), {
    from,
    to,
    size,
    timestamp: serverTimestamp()
  });
}

// Save contact to firestore
async function addContactToFirestore(name, email, message) {
  return await addDoc(collection(window.db, "contacts"), {
    name,
    email,
    message,
    timestamp: serverTimestamp()
  });
}


// POSTCODE CHECKER
const postcodeForm = document.querySelector('form[role="search"]');
const postcodeInput = document.querySelector('form[role="search"] input[type="search"]');

if (postcodeForm) {
  postcodeForm.addEventListener("submit", function(e) {
    e.preventDefault();

    let postcode = postcodeInput.value.trim();

    if (postcode === "") {
      alert("Please enter a postcode.");
      return;
    }
    else if(postcode.length != 5) {
      alert("Please enter a valid 5-digit postcode.");
      return;
    }

    // NY service area postcodes
    let areas = [
      "10001","10002","10003","10004","10005","10006","10007","10009","10010","10011","10012","10013","10014",
      "10016","10017","10018","10019","10020","10021","10022","10023","10024","10025","10026","10027","10028",
      "10029","10030","10031","10032","10033","10034","10035","10036","10037","10038","10039","10040","10041",
      "10044","10045","10055","10060","10065","10069","10075","10080","10081","10087","10090","10094","10095",
      "10098","10099","10103","10104","10105","10106","10107","10110","10111","10112","10115","10118","10119",
      "10120","10121","10122","10123","10128","10151","10152","10153","10154","10155","10158","10159","10160",
      "10162","10165","10166","10167","10168","10169","10170","10171","10172","10173","10174","10175","10176",
      "10177","10178","10179","10185","10199",
      // The Bronx
      "10451","10452","10453","10454","10455","10456","10457","10458","10459","10460","10461","10462","10463",
      "10464","10465","10466","10467","10468","10469","10470","10471","10472","10473","10474","10475",
      // Brooklyn
      "11201","11203","11204","11205","11206","11207","11208","11209","11210","11211","11212","11213","11214",
      "11215","11216","11217","11218","11219","11220","11221","11222","11223","11224","11225","11226","11228",
      "11229","11230","11231","11232","11233","11234","11235","11236","11237","11238","11239",
      // Queens
      "11004","11005","11101","11102","11103","11104","11105","11106","11109","11351","11354","11355","11356",
      "11357","11358","11359","11360","11361","11362","11363","11364","11365","11366","11367","11368","11369",
      "11370","11371","11372","11373","11374","11375","11377","11378","11379","11385","11411","11412","11413",
      "11414","11415","11416","11417","11418","11419","11420","11421","11422","11423","11426","11427","11428",
      "11429","11430","11432","11433","11434","11435","11436","11691","11692","11693","11694","11697",
      // Staten Island
      "10301","10302","10303","10304","10305","10306","10307","10308","10309","10310","10312","10314"
    ];

    if (areas.includes(postcode)) {
      alert("We offer moving services in your area!");
    } else {
      alert("Sorry, we do not service that area yet.");
    }
  });
}


// GET A QUOTE MODAL
const submitQuoteBtn = document.getElementById("submitQuote");

if (submitQuoteBtn) {
  submitQuoteBtn.addEventListener("click", async () => {
    let from = document.getElementById("from").value.trim();
    let to = document.getElementById("to").value.trim();
    let size = document.getElementById("size").value.trim();

    if (!from || !to || !size) {
      alert("Please fill all fields.");
      return;
    }

    try {
      await addQuoteToFirestore(from, to, size);
      alert("Quote submitted successfully!, Well get back to you soon.");
      
      // Clear form
      document.getElementById("from").value = "";
      document.getElementById("to").value = "";
      document.getElementById("size").value = "";
      
      // Close modal
      let modal = bootstrap.Modal.getInstance(document.getElementById("quoteModal"));
      modal.hide();
    } catch (err) {
      console.error("Error submitting quote:", err);
      alert("Error submitting quote. Please try again.");
    }
  });
}


// GET A QUOTE LINKS (all icon-link buttons)
let quoteLinks = document.querySelectorAll(".icon-link");

quoteLinks.forEach(function(link) {
  link.addEventListener("click", function(e) {
    e.preventDefault();
    let modal = new bootstrap.Modal(document.getElementById("quoteModal"));
    modal.show();
  });
});


// CONTACT US BUTTON - Opens modal
const contactUsBtn = document.getElementById("contactUsBtn");

if (contactUsBtn) {
  contactUsBtn.addEventListener("click", function() {
    let modal = new bootstrap.Modal(document.getElementById("contactModal"));
    modal.show();
  });
}


// SUBMIT CONTACT FORM
const submitContact = document.getElementById("submitContact");

if (submitContact) {
  submitContact.addEventListener("click", async () => {
    let name = document.getElementById("contactName").value.trim();
    let email = document.getElementById("contactEmail").value.trim();
    let message = document.getElementById("contactMessage").value.trim();

    if (!name || !email || !message) {
      alert("Please fill all fields.");
      return;
    }

    // Basic email validation
    if (!email.includes("@")) {
      alert("Please enter a valid email address.");
      return;
    }

    try {
      await addContactToFirestore(name, email, message);
      alert("Message sent successfully!");

      // Clear form
      document.getElementById("contactName").value = "";
      document.getElementById("contactEmail").value = "";
      document.getElementById("contactMessage").value = "";

      // Close modal
      let modal = bootstrap.Modal.getInstance(document.getElementById("contactModal"));
      modal.hide();
    } catch (err) {
      console.error("Error sending message:", err);
      alert("Error sending message. Please try again.");
    }
  });
}


// CAROUSEL AUTOPLAY
let carouselEl = document.getElementById("carouselExampleIndicators");

if (carouselEl) {
  new bootstrap.Carousel(carouselEl, {
    interval: 3000,
    ride: "carousel"
  });
}
