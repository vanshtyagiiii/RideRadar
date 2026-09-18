import { useEffect, useState } from "react";

function App() {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [searched, setSearched] = useState(false);
  const [selectedRide, setSelectedRide] = useState(null);
  const [bookingStarted, setBookingStarted] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);

  // --------------------------------
  // SMOOTH SCROLL HELPER
  // --------------------------------

  const scrollToSection = (id) => {
    setTimeout(() => {
      const section = document.getElementById(id);

      if (section) {
        section.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 100);
  };

  // --------------------------------
  // LOWEST PRICE FIRST
  // --------------------------------

  const sortedRides = [...rides].sort(
    (a, b) => a.price - b.price
  );

  const cheapestRide =
    sortedRides.length > 0
      ? sortedRides[0]
      : null;

  // --------------------------------
  // SAVINGS CALCULATION
  // --------------------------------

  const savings =
    rides.length > 0 && cheapestRide
      ? Math.max(
          ...rides.map((ride) => ride.price)
        ) - cheapestRide.price
      : 0;

  // --------------------------------
  // SEARCH RIDES
  // --------------------------------

  const handleSearch = () => {
    if (
      !pickup.trim() ||
      !destination.trim()
    ) {
      alert(
        "Please enter pickup and destination"
      );
      return;
    }

    setLoading(true);
    setSearched(true);

    // Reset previous booking state
    setSelectedRide(null);
    setBookingStarted(false);
    setBookingConfirmed(false);

    fetch(
      `http://localhost:8080/api/rides?pickup=${encodeURIComponent(
        pickup
      )}&destination=${encodeURIComponent(
        destination
      )}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            "Failed to fetch rides"
          );
        }

        return response.json();
      })
      .then((data) => {
        setRides(data);
        setLoading(false);

        // Scroll to ride options
        scrollToSection("ride-results");
      })
      .catch((error) => {
        console.error(
          "Error fetching rides:",
          error
        );

        setRides([]);
        setLoading(false);

        scrollToSection("ride-results");
      });
  };

  // --------------------------------
  // SELECT RIDE
  // --------------------------------

  const chooseRide = (ride) => {
    setSelectedRide(ride);
    setBookingStarted(false);
    setBookingConfirmed(false);

    // Scroll to booking summary
    scrollToSection("booking-summary");
  };

  // --------------------------------
  // CONTINUE TO PROVIDER
  // --------------------------------

  const continueToProvider = () => {
    setBookingStarted(true);
    setBookingConfirmed(false);

    // Scroll to confirmation
    scrollToSection("booking-section");
  };

  // --------------------------------
  // BOOK RIDE
  // --------------------------------

  const bookRide = () => {
    setBookingConfirmed(true);

    // Scroll to success message
    scrollToSection("booking-success");
  };

  return (
    <div className="app">

      {/* NAVBAR */}

      <nav className="navbar">

        <div className="logo">
          <div className="logoMark">
            R
          </div>

          <span>Ride</span>
          <strong>Radar</strong>
        </div>

        <div className="navLinks">

          <span
            className={
              activeSection === "home"
                ? "active"
                : ""
            }
            onClick={() => {
              setActiveSection("home");

              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
          >
            Home
          </span>

          <span
            className={
              activeSection === "how"
                ? "active"
                : ""
            }
            onClick={() => {
              setActiveSection("how");

              document
                .getElementById(
                  "how-it-works"
                )
                ?.scrollIntoView({
                  behavior: "smooth",
                });
            }}
          >
            How It Works
          </span>

          <span
            className={
              activeSection === "about"
                ? "active"
                : ""
            }
            onClick={() => {
              setActiveSection("about");

              document
                .getElementById("about")
                ?.scrollIntoView({
                  behavior: "smooth",
                });
            }}
          >
            About
          </span>

        </div>

        <button className="loginBtn">
          Sign in
        </button>

      </nav>


      {/* HERO */}

      <section className="hero">

        <div className="heroContent">

          <div className="badge">
            <span className="badgeDot"></span>
            Smart ride comparison
          </div>

          <h1>
            Find the{" "}
            <span>cheapest ride</span>
            <br />
            in one place.
          </h1>

          <p className="heroText">
            Compare fares, travel time and
            ride options from multiple
            providers before you book.
          </p>


          {/* SEARCH CARD */}

          <div className="searchCard">

            {/* PICKUP */}

            <div className="locationBox">

              <div className="locationIcon pickupIcon">
                <span></span>
              </div>

              <div className="locationInput">

                <label>FROM</label>

                <input
                  type="text"
                  placeholder="Pickup location"
                  value={pickup}
                  onChange={(e) =>
                    setPickup(e.target.value)
                  }
                />

              </div>

            </div>


            <div className="routeLine"></div>


            {/* DESTINATION */}

            <div className="locationBox">

              <div className="locationIcon destinationIcon">
                <span></span>
              </div>

              <div className="locationInput">

                <label>TO</label>

                <input
                  type="text"
                  placeholder="Where are you going?"
                  value={destination}
                  onChange={(e) =>
                    setDestination(
                      e.target.value
                    )
                  }
                />

              </div>

            </div>


            {/* SEARCH */}

            <button
              className="searchBtn"
              onClick={handleSearch}
            >
              Search rides
              <span className="arrow">
                →
              </span>
            </button>

          </div>


          <div className="trusted">

            <span>
              Compare prices from
            </span>

            <b>Uber</b>
            <b>Ola</b>
            <b>Rapido</b>

          </div>

        </div>

      </section>


      {/* FEATURES */}

      <section className="features">

        <div className="feature">

          <div className="featureIcon">
            $
          </div>

          <h3>
            Compare fares
          </h3>

          <p>
            See prices from different ride
            providers before making your
            choice.
          </p>

        </div>


        <div className="feature">

          <div className="featureIcon">
            T
          </div>

          <h3>
            Check travel time
          </h3>

          <p>
            Compare estimated pickup and
            journey times in one place.
          </p>

        </div>


        <div className="feature">

          <div className="featureIcon">
            ✓
          </div>

          <h3>
            Choose with confidence
          </h3>

          <p>
            Select the ride that works best
            for your budget and time.
          </p>

        </div>

      </section>


      {/* RESULTS */}

      {searched && (

        <section
          className="results"
          id="ride-results"
        >

          <div className="resultsHeader">

            <div>

              <span className="resultTag">
                RIDE OPTIONS
              </span>

              <h2>
                Available rides
              </h2>

              <p>
                {pickup} → {destination}
              </p>

            </div>


            <div className="sortBox">

              <span>Sort:</span>

              <strong>
                Lowest price
              </strong>

            </div>

          </div>


          {/* LOADING */}

          {loading && (

            <p
              style={{
                textAlign: "center",
                padding: "40px",
                color: "#777",
              }}
            >
              Finding available rides...
            </p>

          )}


          {/* RIDE GRID */}

          {!loading &&
            rides.length > 0 && (

              <div className="rideGrid">

                {sortedRides.map((ride) => {

                  const isCheapest =
                    cheapestRide &&
                    ride.name ===
                      cheapestRide.name;

                  return (

                    <div
                      className={`rideCard ${
                        isCheapest
                          ? "cheapest"
                          : ""
                      }`}
                      key={ride.name}
                    >

                      {isCheapest && (

                        <div className="cheapestBadge">
                          Lowest fare
                        </div>

                      )}


                      <div className="rideTop">

                        <div className="provider">

                          <div className="providerIcon">
                            {ride.letter}
                          </div>

                          <div>

                            <h3>
                              {ride.name}
                            </h3>

                            <p>
                              {ride.type} ·{" "}
                              {ride.time}
                            </p>

                          </div>

                        </div>


                        <div className="rating">
                          ★ {ride.rating}
                        </div>

                      </div>


                      <div className="rideInfo">

                        <div>

                          <span>
                            ESTIMATED FARE
                          </span>

                          <strong>
                            ₹{ride.price}
                          </strong>

                        </div>


                        <div>

                          <span>
                            TRAVEL TIME
                          </span>

                          <strong>
                            {ride.time}
                          </strong>

                        </div>

                      </div>


                      <div className="rideBottom">

                        <span className="saveText">

                          {isCheapest
                            ? `Save ₹${savings}`
                            : "Estimated fare"}

                        </span>


                        <button
                          onClick={() =>
                            chooseRide(ride)
                          }
                        >
                          Choose
                          <span>→</span>
                        </button>

                      </div>

                    </div>

                  );

                })}

              </div>

            )}


          {/* NO RIDES */}

          {!loading &&
            rides.length === 0 && (

              <p
                style={{
                  textAlign: "center",
                  padding: "40px",
                  color: "#777",
                }}
              >
                No rides available right now.
              </p>

            )}


          <p className="demoNote">
            Demo fares shown for prototype
            purposes. Actual fares may vary.
          </p>

        </section>

      )}


      {/* BOOKING SUMMARY */}

      {selectedRide && (

        <section
          className="bookingSummary"
          id="booking-summary"
        >

          <div className="bookingCard">

            <div className="bookingHeader">

              <div>

                <span className="resultTag">
                  SELECTED RIDE
                </span>

                <h2>
                  Booking summary
                </h2>

              </div>


              <button
                className="closeBooking"
                onClick={() => {
                  setSelectedRide(null);
                  setBookingStarted(false);
                  setBookingConfirmed(false);
                }}
              >
                ×
              </button>

            </div>


            <div className="bookingRoute">

              <div className="bookingLocation">

                <span>
                  FROM
                </span>

                <strong>
                  {pickup}
                </strong>

              </div>


              <div className="bookingArrow">
                →
              </div>


              <div className="bookingLocation">

                <span>
                  TO
                </span>

                <strong>
                  {destination}
                </strong>

              </div>

            </div>


            <div className="bookingRide">

              <div className="provider">

                <div className="providerIcon">
                  {selectedRide.letter}
                </div>

                <div>

                  <h3>
                    {selectedRide.name}
                  </h3>

                  <p>
                    {selectedRide.type} ·{" "}
                    {selectedRide.time}
                  </p>

                </div>

              </div>


              <div className="bookingPrice">

                <span>
                  ESTIMATED FARE
                </span>

                <strong>
                  ₹{selectedRide.price}
                </strong>

              </div>

            </div>


            <button
              className="continueBtn"
              onClick={
                continueToProvider
              }
            >
              Continue to{" "}
              {selectedRide.name}

              <span>→</span>

            </button>

          </div>

        </section>

      )}


      {/* BOOKING CONFIRMATION */}

      {bookingStarted &&
        selectedRide && (

          <section
            id="booking-section"
            className="bookingConfirmation"
          >

            <div className="confirmationCard">

              <div className="confirmationIcon">
                ✓
              </div>

              <span className="resultTag">
                RIDE SELECTED
              </span>

              <h2>
                You're ready to book
              </h2>

              <p>
                Continue with{" "}
                {selectedRide.name}{" "}
                for an estimated fare of{" "}
                ₹{selectedRide.price}.
              </p>


              <div className="confirmationDetails">

                <div>

                  <span>
                    PROVIDER
                  </span>

                  <strong>
                    {selectedRide.name}
                  </strong>

                </div>


                <div>

                  <span>
                    FARE
                  </span>

                  <strong>
                    ₹{selectedRide.price}
                  </strong>

                </div>


                <div>

                  <span>
                    TIME
                  </span>

                  <strong>
                    {selectedRide.time}
                  </strong>

                </div>

              </div>


              <button
                className="bookRideBtn"
                onClick={bookRide}
              >
                Book with{" "}
                {selectedRide.name}
              </button>


              <button
                className="backToRidesBtn"
                onClick={() => {
                  setBookingStarted(false);
                  setBookingConfirmed(false);

                  scrollToSection(
                    "ride-results"
                  );
                }}
              >
                Back to ride options
              </button>


              {/* BOOKING SUCCESS */}

              {bookingConfirmed && (

                <div
                  className="bookingSuccess"
                  id="booking-success"
                >

                  <h3>
                    Booking request confirmed
                  </h3>

                  <p>
                    Your{" "}
                    {selectedRide.name}{" "}
                    ride has been selected
                    successfully.
                  </p>


                  <div className="bookingSuccessDetails">

                    <div>

                      <span>
                        FARE
                      </span>

                      <strong>
                        ₹{selectedRide.price}
                      </strong>

                    </div>


                    <div>

                      <span>
                        ESTIMATED TIME
                      </span>

                      <strong>
                        {selectedRide.time}
                      </strong>

                    </div>

                  </div>


                  <p className="demoNotice">
                    This is a prototype
                    confirmation. Actual booking
                    will require integration with
                    the ride provider.
                  </p>

                </div>

              )}

            </div>

          </section>

        )}


      {/* HOW IT WORKS */}

      <section
        className="howItWorks"
        id="how-it-works"
      >

        <div className="sectionHeading">

          <span className="resultTag">
            HOW IT WORKS
          </span>

          <h2>
            Compare rides in three simple
            steps
          </h2>

          <p>
            RideRadar helps you compare your
            options before you decide where
            to book.
          </p>

        </div>


        <div className="steps">

          <div className="step">

            <div className="stepNumber">
              01
            </div>

            <h3>
              Enter your route
            </h3>

            <p>
              Add your pickup location and
              destination to start comparing
              available rides.
            </p>

          </div>


          <div className="step">

            <div className="stepNumber">
              02
            </div>

            <h3>
              Compare options
            </h3>

            <p>
              Check estimated fares, travel
              time and ratings from different
              ride providers.
            </p>

          </div>


          <div className="step">

            <div className="stepNumber">
              03
            </div>

            <h3>
              Choose your ride
            </h3>

            <p>
              Select the option that fits your
              budget and travel requirements.
            </p>

          </div>

        </div>

      </section>


      {/* ABOUT */}

      <section
        className="aboutSection"
        id="about"
      >

        <div className="aboutContent">

          <div>

            <span className="resultTag">
              ABOUT RIDERADAR
            </span>

            <h2>
              One place to compare your ride
              options.
            </h2>

          </div>


          <div className="aboutText">

            <p>
              RideRadar is designed to make
              ride comparison simpler. Instead
              of checking multiple ride
              providers separately, users can
              view their options together.
            </p>

            <p>
              The platform focuses on comparing
              estimated fares, travel time and
              ride details so users can make an
              informed booking choice.
            </p>

          </div>

        </div>

      </section>


      {/* FOOTER */}

      <footer>

        <span>
          © 2026 RideRadar
        </span>

        <span>
          Compare rides.{" "}
          <b>Save money.</b>
        </span>

      </footer>

    </div>
  );
}

export default App;