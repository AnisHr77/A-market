import React from "react";

function Map({ location }) {
    const encodedLocation = encodeURIComponent(location || "Algeria");

    return (
        <div style={{ width: "100%", height: "450px" }}>
            <iframe
                className="mapZone-css"
                title="GoogleMap"
                src={`https://www.google.com/maps?q=${encodedLocation}&output=embed`}
                width="530px"
                height="410px"
                style={{
                    position: "absolute",
                    top: "-50px",
                    left: "24rem",
                    borderRadius: "10px",
                    border: "none",
                    outline:"none",
                    boxShadow:"0 0 8px 6px #F6F5F5"
                }}
            ></iframe>
        </div>
    );
}

export default Map;
