// version6
import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [bookings, setBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [roomId, setRoomId] = useState("");
  const [title, setTitle] = useState("");
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = () => {
    axios
      .get("https://jan-softa-hotel-server.glitch.me/bookings")
      .then((response) => setBookings(response.data))
      .catch((error) => console.error("Error fetching bookings:", error));
  };

  const handleSearchByDate = (event) => {
    event.preventDefault();
    axios
      .get(
        `https://jan-softa-hotel-server.glitch.me/bookings/search?date=${searchDate}`
      )
      .then((response) => setBookings(response.data))
      .catch((error) => console.error("Error searching by date:", error));
  };

  const handleFreeTextSearch = (event) => {
    event.preventDefault();
    axios
      .get(
        `https://jan-softa-hotel-server.glitch.me/bookings/search?term=${searchTerm}`
      )
      .then((response) => setBookings(response.data))
      .catch((error) => console.error("Error free text search:", error));
  };

  const handleCreateBooking = (event) => {
    event.preventDefault();
    const newBooking = {
      roomId,
      title,
      firstName,
      surname,
      email,
      checkInDate,
      checkOutDate,
    };

    axios
      .post("https://jan-softa-hotel-server.glitch.me/bookings", newBooking)
      .then((response) => {
        console.log("New booking created:", response.data);
        fetchBookings();
      })
      .catch((error) => console.error("Error creating booking:", error));
  };

  const handleDeleteBooking = (event) => {
    event.preventDefault();
    const bookingId = event.target.value;

    axios
      .delete(`https://jan-softa-hotel-server.glitch.me/bookings/${bookingId}`)
      .then(() => {
        console.log("Booking deleted successfully.");
        fetchBookings();
      })
      .catch((error) => console.error("Error deleting booking:", error));
  };

  return (
    <div className="App">
      <header className="header">
        <h1 className="header-title">Welcome to Softa Hotels</h1>
      </header>

      <div>
        <h2>Create Booking</h2>
        <form onSubmit={handleCreateBooking}>
          <label htmlFor="roomId">Room ID:</label>
          <input
            type="number"
            id="roomId"
            required
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
          />
          <br />

          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <br />

          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <br />

          <label htmlFor="surname">Surname:</label>
          <input
            type="text"
            id="surname"
            required
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
          />
          <br />

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />

          <label htmlFor="checkInDate">Check-in Date:</label>
          <input
            type="date"
            id="checkInDate"
            required
            value={checkInDate}
            onChange={(e) => setCheckInDate(e.target.value)}
          />
          <br />

          <label htmlFor="checkOutDate">Check-out Date:</label>
          <input
            type="date"
            id="checkOutDate"
            required
            value={checkOutDate}
            onChange={(e) => setCheckOutDate(e.target.value)}
          />
          <br />

          <button type="submit">Create Booking</button>
        </form>
      </div>

      <div>
        <h2>Delete Booking</h2>
        <form>
          <label htmlFor="bookingId">Select Booking to Delete:</label>
          <select id="bookingId" onChange={handleDeleteBooking} required>
            <option value="" disabled selected>
              Select a booking...
            </option>
            {bookings.map((booking) => (
              <option key={booking.id} value={booking.id}>
                Booking ID: {booking.id}, Room ID: {booking.roomId}, Name:{" "}
                {booking.title} {booking.firstName} {booking.surname}
              </option>
            ))}
          </select>
        </form>
      </div>

      <div>
        <h2>Search by Date</h2>
        <form onSubmit={handleSearchByDate}>
          <label htmlFor="searchDate">Search Date:</label>
          <input
            type="date"
            id="searchDate"
            required
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </div>

      <div>
        <h2>Free Text Search</h2>
        <form onSubmit={handleFreeTextSearch}>
          <label htmlFor="searchTerm">Search Term:</label>
          <input
            type="text"
            id="searchTerm"
            required
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </div>

      <h2>Search Results</h2>
      <div>
        {bookings.length === 0 ? (
          <p>No bookings found.</p>
        ) : (
          bookings.map((booking) => (
            <div key={booking.id}>
              <p>
                Booking ID: {booking.id}, Room ID: {booking.roomId}, Name:{" "}
                {booking.title} {booking.firstName} {booking.surname}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;

// version5
// import React, { useState, useEffect } from "react";
// import "./App.css";
// import axios from "axios";

// function App() {
//   const [bookings, setBookings] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [searchDate, setSearchDate] = useState("");
//   const [roomId, setRoomId] = useState("");
//   const [title, setTitle] = useState("");
//   const [firstName, setFirstName] = useState("");
//   const [surname, setSurname] = useState("");
//   const [email, setEmail] = useState("");
//   const [checkInDate, setCheckInDate] = useState("");
//   const [checkOutDate, setCheckOutDate] = useState("");

//   useEffect(() => {
//     fetchBookings();
//   }, []);

//   const fetchBookings = () => {
//     axios
//       .get("https://jan-softa-hotel-server.glitch.me/bookings")
//       .then((response) => setBookings(response.data))
//       .catch((error) => console.error("Error fetching bookings:", error));
//   };

//   const handleSearchByDate = (event) => {
//     event.preventDefault();
//     axios
//       .get(
//         `https://jan-softa-hotel-server.glitch.me/bookings/search?date=${searchDate}`
//       )
//       .then((response) => setBookings(response.data))
//       .catch((error) => console.error("Error searching by date:", error));
//   };

//   const handleFreeTextSearch = (event) => {
//     event.preventDefault();
//     axios
//       .get(
//         `https://jan-softa-hotel-server.glitch.me/bookings/search?term=${searchTerm}`
//       )
//       .then((response) => setBookings(response.data))
//       .catch((error) => console.error("Error free text search:", error));
//   };

//   const handleCreateBooking = (event) => {
//     event.preventDefault();
//     const newBooking = {
//       roomId,
//       title,
//       firstName,
//       surname,
//       email,
//       checkInDate,
//       checkOutDate,
//     };

//     axios
//       .post("https://jan-softa-hotel-server.glitch.me/bookings", newBooking)
//       .then((response) => {
//         console.log("New booking created:", response.data);
//         fetchBookings();
//       })
//       .catch((error) => console.error("Error creating booking:", error));
//   };

//   const handleDeleteBooking = (event) => {
//     event.preventDefault();
//     const bookingId = event.target.value;

//     axios
//       .delete(`https://jan-softa-hotel-server.glitch.me/bookings/${bookingId}`)
//       .then(() => {
//         console.log("Booking deleted successfully.");
//         fetchBookings();
//       })
//       .catch((error) => console.error("Error deleting booking:", error));
//   };

//   return (
//     <div className="App">
//       <div>
//         <h2>Create Booking</h2>
//         <form onSubmit={handleCreateBooking}>
//           <label htmlFor="roomId">Room ID:</label>
//           <input
//             type="number"
//             id="roomId"
//             required
//             value={roomId}
//             onChange={(e) => setRoomId(e.target.value)}
//           />
//           <br />

//           <label htmlFor="title">Title:</label>
//           <input
//             type="text"
//             id="title"
//             required
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//           />
//           <br />

//           <label htmlFor="firstName">First Name:</label>
//           <input
//             type="text"
//             id="firstName"
//             required
//             value={firstName}
//             onChange={(e) => setFirstName(e.target.value)}
//           />
//           <br />

//           <label htmlFor="surname">Surname:</label>
//           <input
//             type="text"
//             id="surname"
//             required
//             value={surname}
//             onChange={(e) => setSurname(e.target.value)}
//           />
//           <br />

//           <label htmlFor="email">Email:</label>
//           <input
//             type="email"
//             id="email"
//             required
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <br />

//           <label htmlFor="checkInDate">Check-in Date:</label>
//           <input
//             type="date"
//             id="checkInDate"
//             required
//             value={checkInDate}
//             onChange={(e) => setCheckInDate(e.target.value)}
//           />
//           <br />

//           <label htmlFor="checkOutDate">Check-out Date:</label>
//           <input
//             type="date"
//             id="checkOutDate"
//             required
//             value={checkOutDate}
//             onChange={(e) => setCheckOutDate(e.target.value)}
//           />
//           <br />

//           <button type="submit">Create Booking</button>
//         </form>
//       </div>

//       <div>
//         <h2>Delete Booking</h2>
//         <form>
//           <label htmlFor="bookingId">Select Booking to Delete:</label>
//           <select id="bookingId" onChange={handleDeleteBooking} required>
//             <option value="" disabled selected>
//               Select a booking...
//             </option>
//             {bookings.map((booking) => (
//               <option key={booking.id} value={booking.id}>
//                 Booking ID: {booking.id}, Room ID: {booking.roomId}, Name:{" "}
//                 {booking.title} {booking.firstName} {booking.surname}
//               </option>
//             ))}
//           </select>
//         </form>
//       </div>

//       <div>
//         <h2>Search by Date</h2>
//         <form onSubmit={handleSearchByDate}>
//           <label htmlFor="searchDate">Search Date:</label>
//           <input
//             type="date"
//             id="searchDate"
//             required
//             value={searchDate}
//             onChange={(e) => setSearchDate(e.target.value)}
//           />
//           <button type="submit">Search</button>
//         </form>
//       </div>

//       <div>
//         <h2>Free Text Search</h2>
//         <form onSubmit={handleFreeTextSearch}>
//           <label htmlFor="searchTerm">Search Term:</label>
//           <input
//             type="text"
//             id="searchTerm"
//             required
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//           <button type="submit">Search</button>
//         </form>
//       </div>

//       <h2>Search Results</h2>
//       <div>
//         {bookings.length === 0 ? (
//           <p>No bookings found.</p>
//         ) : (
//           bookings.map((booking) => (
//             <div key={booking.id}>
//               <p>
//                 Booking ID: {booking.id}, Room ID: {booking.roomId}, Name:{" "}
//                 {booking.title} {booking.firstName} {booking.surname}
//               </p>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// }

// export default App;

// version4
// import React, { useState, useEffect } from "react";
// import "./App.css";
// import axios from "axios";

// function App() {
//   const [bookings, setBookings] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [searchDate, setSearchDate] = useState("");

//   useEffect(() => {
//     fetchBookings();
//   }, []);

//   const fetchBookings = () => {
//     axios
//       .get("https://jan-softa-hotel-server.glitch.me/bookings")
//       .then((response) => setBookings(response.data))
//       .catch((error) => console.error("Error fetching bookings:", error));
//   };

//   const handleSearchByDate = (event) => {
//     event.preventDefault();
//     axios
//       .get(
//         `https://jan-softa-hotel-server.glitch.me/bookings/search?date=${searchDate}`
//       )
//       .then((response) => setBookings(response.data))
//       .catch((error) => console.error("Error searching by date:", error));
//   };

//   const handleFreeTextSearch = (event) => {
//     event.preventDefault();
//     axios
//       .get(
//         `https://jan-softa-hotel-server.glitch.me/bookings/search?term=${searchTerm}`
//       )
//       .then((response) => setBookings(response.data))
//       .catch((error) => console.error("Error free text search:", error));
//   };

//   return (
//     <div className="App">
//       <div>
//         { }
//         <h2>Search by Date</h2>
//         <form onSubmit={handleSearchByDate}>
//           <label htmlFor="searchDate">Search Date:</label>
//           <input
//             type="date"
//             id="searchDate"
//             required
//             value={searchDate}
//             onChange={(e) => setSearchDate(e.target.value)}
//           />
//           <button type="submit">Search</button>
//         </form>
//       </div>

//       <div>
//         { }
//         <h2>Free Text Search</h2>
//         <form onSubmit={handleFreeTextSearch}>
//           <label htmlFor="searchTerm">Search Term:</label>
//           <input
//             type="text"
//             id="searchTerm"
//             required
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//           <button type="submit">Search</button>
//         </form>
//       </div>

//       { }
//       <h2>Search Results</h2>
//       <div>
//         {bookings.length === 0 ? (
//           <p>No bookings found.</p>
//         ) : (
//           bookings.map((booking) => (
//             <div key={booking.id}>
//               <p>
//                 Booking ID: {booking.id}, Room ID: {booking.roomId}, Name:{" "}
//                 {booking.title} {booking.firstName} {booking.surname}
//               </p>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// }

// export default App;

// version3
// import React, { useState, useEffect } from "react";
// import "./App.css";
// import axios from "axios";

// function App() {
//   const [bookings, setBookings] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [searchDate, setSearchDate] = useState("");

//   useEffect(() => {
//     fetchBookings();
//   }, []);

//   const fetchBookings = () => {
//     axios
//       .get("https://jan-softa-hotel-server.glitch.me/bookings")
//       .then((response) => setBookings(response.data))
//       .catch((error) => console.error("Error fetching bookings:", error));
//   };

//   const handleSearchByDate = (event) => {
//     event.preventDefault();
//     axios
//       .get(
//         `https://jan-softa-hotel-server.glitch.me/bookings/search?date=${searchDate}`
//       )
//       .then((response) => setBookings(response.data))
//       .catch((error) => console.error("Error searching by date:", error));
//   };

//   const handleFreeTextSearch = (event) => {
//     event.preventDefault();
//     axios
//       .get(
//         `https://jan-softa-hotel-server.glitch.me/bookings/search?term=${searchTerm}`
//       )
//       .then((response) => setBookings(response.data))
//       .catch((error) => console.error("Error free text search:", error));
//   };

//   return (
//     <div className="App">
//       <header className="App-header">
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//       <div>
//         { }
//         <h2>Search by Date</h2>
//         <form onSubmit={handleSearchByDate}>
//           <label htmlFor="searchDate">Search Date:</label>
//           <input
//             type="date"
//             id="searchDate"
//             required
//             value={searchDate}
//             onChange={(e) => setSearchDate(e.target.value)}
//           />
//           <button type="submit">Search</button>
//         </form>
//       </div>

//       <div>
//         { }
//         <h2>Free Text Search</h2>
//         <form onSubmit={handleFreeTextSearch}>
//           <label htmlFor="searchTerm">Search Term:</label>
//           <input
//             type="text"
//             id="searchTerm"
//             required
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//           <button type="submit">Search</button>
//         </form>
//       </div>

//       {}
//       <h2>Search Results</h2>
//       <div>
//         {bookings.length === 0 ? (
//           <p>No bookings found.</p>
//         ) : (
//           bookings.map((booking) => (
//             <div key={booking.id}>
//               <p>
//                 Booking ID: {booking.id}, Room ID: {booking.roomId}, Name:{" "}
//                 {booking.title} {booking.firstName} {booking.surname}
//               </p>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// }

// export default App;

// version2
// import React, { useState, useEffect } from "react";
// // import logo from "./logo.svg";
// import "./App.css";
// import axios from "axios";

// function App() {
//   const [bookings, setBookings] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [searchDate, setSearchDate] = useState("");

//   useEffect(() => {
//     fetchBookings();
//   }, []);

//   // Function to fetch bookings from the server
//   const fetchBookings = () => {
//     axios
//       .get("https://jan-softa-hotel-server.glitch.me/bookings")
//       .then((response) => setBookings(response.data))
//       .catch((error) => console.error("Error fetching bookings:", error));
//   };

//   // Function to handle search by date form submission
//   const handleSearchByDate = (event) => {
//     event.preventDefault();
//     axios
//       .get(
//         `https://jan-softa-hotel-server.glitch.me/bookings/search?date=${searchDate}`
//       )
//       .then((response) => setBookings(response.data))
//       .catch((error) => console.error("Error searching by date:", error));
//   };

//   // Function to handle free text search form submission
//   const handleFreeTextSearch = (event) => {
//     event.preventDefault();
//     axios
//       .get(
//         `https://jan-softa-hotel-server.glitch.me/bookings/search?term=${searchTerm}`
//       )
//       .then((response) => setBookings(response.data))
//       .catch((error) => console.error("Error free text search:", error));
//   };

//   return (
//     <div className="App">
//       <header className="App-header">
//         {/* <img src={logo} className="App-logo" alt="logo" /> */}
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//       <div>
//         {/* Search by Date Form */}
//         <h2>Search by Date</h2>
//         <form onSubmit={handleSearchByDate}>
//           <label htmlFor="searchDate">Search Date:</label>
//           <input
//             type="date"
//             id="searchDate"
//             required
//             value={searchDate}
//             onChange={(e) => setSearchDate(e.target.value)}
//           />
//           <button type="submit">Search</button>
//         </form>
//       </div>

//       <div>
//         {/* Free Text Search Form */}
//         <h2>Free Text Search</h2>
//         <form onSubmit={handleFreeTextSearch}>
//           <label htmlFor="searchTerm">Search Term:</label>
//           <input
//             type="text"
//             id="searchTerm"
//             required
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//           <button type="submit">Search</button>
//         </form>
//       </div>

//       {/* Display Results */}
//       <h2>Search Results</h2>
//       <div>
//         {bookings.length === 0 ? (
//           <p>No bookings found.</p>
//         ) : (
//           bookings.map((booking) => (
//             <div key={booking.id}>
//               <p>
//                 Booking ID: {booking.id}, Room ID: {booking.roomId}, Name:{" "}
//                 {booking.title} {booking.firstName} {booking.surname}
//               </p>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// }

// export default App;

// version1
// import React, { useState, useEffect } from "react";
// import logo from "./logo.svg";
// import "./App.css";

// function App() {
//   const [bookings, setBookings] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [searchDate, setSearchDate] = useState("");

//   useEffect(() => {
//     fetchBookings();
//   }, []);

//   // Function to fetch bookings from the server
//   const fetchBookings = () => {
//     fetch("https://jan-softa-hotel-server.glitch.me/bookings")
//       .then((response) => response.json())
//       .then((data) => setBookings(data))
//       .catch((error) => console.error("Error fetching bookings:", error));
//   };

//   // Function to handle search by date form submission
//   const handleSearchByDate = (event) => {
//     event.preventDefault();
//     fetch(
//       `https://jan-softa-hotel-server.glitch.me/bookings/search?date=${searchDate}`
//     )
//       .then((response) => response.json())
//       .then((data) => setBookings(data))
//       .catch((error) => console.error("Error searching by date:", error));
//   };

//   // Function to handle free text search form submission
//   const handleFreeTextSearch = (event) => {
//     event.preventDefault();
//     fetch(
//       `https://jan-softa-hotel-server.glitch.me/bookings/search?term=${searchTerm}`
//     )
//       .then((response) => response.json())
//       .then((data) => setBookings(data))
//       .catch((error) => console.error("Error free text search:", error));
//   };

//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//       <div>
//         {/* Search by Date Form */}
//         <h2>Search by Date</h2>
//         <form onSubmit={handleSearchByDate}>
//           <label htmlFor="searchDate">Search Date:</label>
//           <input
//             type="date"
//             id="searchDate"
//             required
//             value={searchDate}
//             onChange={(e) => setSearchDate(e.target.value)}
//           />
//           <button type="submit">Search</button>
//         </form>
//       </div>

//       <div>
//         {/* Free Text Search Form */}
//         <h2>Free Text Search</h2>
//         <form onSubmit={handleFreeTextSearch}>
//           <label htmlFor="searchTerm">Search Term:</label>
//           <input
//             type="text"
//             id="searchTerm"
//             required
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//           <button type="submit">Search</button>
//         </form>
//       </div>

//       {/* Display Results */}
//       <h2>Search Results</h2>
//       <div>
//         {bookings.length === 0 ? (
//           <p>No bookings found.</p>
//         ) : (
//           bookings.map((booking) => (
//             <div key={booking.id}>
//               <p>
//                 Booking ID: {booking.id}, Room ID: {booking.roomId}, Name:{" "}
//                 {booking.title} {booking.firstName} {booking.surname}
//               </p>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// }

// export default App;

// original version
// import logo from "./logo.svg";
// import "./App.css";

// // test

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
