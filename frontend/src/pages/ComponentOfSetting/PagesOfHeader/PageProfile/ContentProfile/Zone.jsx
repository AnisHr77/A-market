import { useState } from 'react';
import './Zone.css';
import Map from './Map.jsx';

function Zone() {
    const countryCityMap = {
        Algeria: ["Ouled Yaich", "Bouinan", "Bougara", "Soumaa", "Khazrouna","Ben achour","Annex Mustapha Tchaker"],
        Morocco: ["Casablanca", "Rabat", "Marrakesh", "Fes"],
        Tunis: ["Tunis", "Sfax", "Sousse"],
        France: ["Paris", "Lyon", "Marseille"],
        UnitedState: ["New York", "Los Angeles", "San Francisco"]
    };

    // State initialization with values from localStorage, if available
    const savedCountry = localStorage.getItem('country');
    const savedCity = localStorage.getItem('city');
    const savedStreet = localStorage.getItem('street');
    const savedName = localStorage.getItem('name');
    const savedPostalCode = localStorage.getItem('postalCode');

    const [country, setCountry] = useState(savedCountry || "");
    const [city, setCity] = useState(savedCity || "");
    const [street, setStreet] = useState(savedStreet || "");
    const [name, setName] = useState(savedName || "");
    const [postalCode, setPostalCode] = useState(savedPostalCode || "");
    const [cities, setCities] = useState(countryCityMap[country] || []);
    const [location, setLocation] = useState(savedCity ? `${savedCity}, ${savedCountry}` : ""); // Default location if city and country are saved

    const handleCountryChange = (e) => {
        const selectedCountry = e.target.value;
        setCountry(selectedCountry);
        setCities(countryCityMap[selectedCountry] || []);
        setCity(""); // Reset city when country changes
        setLocation(selectedCountry); // Update location to country when it changes
    };

    const handleCityChange = (e) => {
        const selectedCity = e.target.value;
        setCity(selectedCity);
        setLocation(`${selectedCity}, ${country}`); // Update location with both city and country
    };

    const handleSave = () => {
        // Save the data to localStorage
        localStorage.setItem('country', country);
        localStorage.setItem('city', city);
        localStorage.setItem('street', street);
        localStorage.setItem('name', name);
        localStorage.setItem('postalCode', postalCode);

        alert("Address saved successfully!");
    };

    return (
        <div className="ZoneContent">
            <h1 className={"my-H1-ofZone"}>Select your zone</h1>

            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Street"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
            />
            <input
                id="CodePostal"
                type="text"
                placeholder="ZIP or postal code (optional)"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
            />

            <select onChange={handleCountryChange} value={country}>
                <option value="">Select your country</option>
                {Object.keys(countryCityMap).map((country) => (
                    <option value={country} key={country}>
                        {country}
                    </option>
                ))}
            </select>

            <select onChange={handleCityChange} value={city} disabled={!country}>
                <option value="">Select your city</option>
                {cities.map((city) => (
                    <option value={city} key={city}>
                        {city}
                    </option>
                ))}
            </select>

            <button id="BtnZone" onClick={handleSave}>
                Save
            </button>

            {/* Add Map Component */}
            <Map location={location} />{/* Show map only if location is selected */}
        </div>
    );
}

export default Zone;
